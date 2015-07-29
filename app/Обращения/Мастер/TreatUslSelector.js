/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatUslSelector() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    model.qUslById.requery();
    
    var rObj = {}, patientsLoaded;
    self.setData = function(aRObj) {
        self.controller.nextBtn = false;
        self.controller.data = {};
        self.controller.qUslById = model.qUslById;
        
        if (!aRObj.forEach) {
            rObj = aRObj;
            var patients = rObj.patients;
        } else {
            rObj = {};
            rObj.patientsAr = aRObj;
        }
        patientsLoaded = true;
        
        if (patients && typeof patients[0] === 'object') {
            rObj.patients = patients;
            rObj.patientsAr = [];
            patients.forEach(function(patient) {
                rObj.patientsAr.push(patient.man_patient_id);
            });
        }
            
        if (rObj.uslugi) {
            rObj.uslugi.forEach(function(uslugaId) {
                model.qUslInTreat.push({
                        treat_id: 0,
                        usluga_id: uslugaId
                    });
                    self.controller.nextBtn = true;
            });
        }
        
//        if (!rObj.priceSource)
//            rObj.priceSource = null;
        if (!rObj.price)
            rObj.price = null;
        if (!rObj.contract)
            rObj.contract = null;
        if (!rObj.allRoute)
            rObj.allRoute = null;
        if (!rObj.noContract)
            rObj.noContract = null;
        if (!rObj.ignoreMissedPrices)
            rObj.ignoreMissedPrices = null;
    };
    
    var treatCreator = new P.ServerModule('TreatCalculator');
    Object.defineProperty(self, 'nextData', {
        get: function() {
            return rObj;
        }
    });
    
    self.onBeforeNext = function(callback) {
        rObj.uslugi = [];
            model.qUslInTreat.forEach(function(anUsluga) {
                rObj.uslugi.push(anUsluga.usluga_id);
            });
            treatCreator.calculateRoute4Group(rObj.patientsAr, rObj.uslugi, function(res) {
                for (var j in res)
                    rObj[j] = res[j];
                callback();
            });
    };
    
    self.show = function (aPanel) {
        var cont = aPanel ? aPanel : self.container;
        if (cont) {
            cont.add(form.view, new P.Anchors(1, null, 1, 1, null, 1));
        } else 
            form.show();
    };
    
    var fmUslugiSelect = new Uslugi4SelectView();
    form.btnAdd.onActionPerformed = function(event) {
        fmUslugiSelect.showModal(function (anUsluga) {
                if (anUsluga) {
                    model.qUslInTreat.push({
                        treat_id: 0,
                        usluga_id: anUsluga
                    });
                    self.controller.nextBtn = true;
                }
            });
    };
    
    form.btnDel.onActionPerformed = function(event) {
        model.qUslInTreat.remove(form.mgUsl.selected);
        if (model.qUslInTreat.length === 0)
            self.controller.nextBtn = false;
    };
    
    function getPatientsData(patientsArray, curIndex) {
        model.qPatientById.params.patient_id = patientsArray[curIndex];
        model.qPatientById.requery(function () {
            rObj.patients.push(model.qPatientById.cursor);
            curIndex++;
            if (patientsArray.length !== curIndex)
                getPatientsData(patientsArray, curIndex);
            else {
                patientsLoaded = true;
                if (model.qUslInTreat.length > 0)
                    self.controller.nextBtn = true;
            }
        });
    }
}
