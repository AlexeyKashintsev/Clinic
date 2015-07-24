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
    
    model.qUslugaById.requery();
    
    var rObj = {}, patientsLoaded;
    self.setData = function(aPatients) {
        patientsLoaded = true;
        self.controller.nextBtn = false;
        
        if (typeof aPatients[0] === 'object') {
            rObj.patients = aPatients;
            rObj.patientsAr = [];
            aPatients.forEach(function(patient) {
                rObj.patientsAr.push(patient.man_patient_id);
            });
        } else {
//            rObj.patients = [];
            rObj.patientsAr = aPatients;
//            getPatientsData(aPatients, 0);
        }
    };
    
    var treatCreator = new P.ServerModule('TreatCreator');
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
            treatCreator.calculateRoute(rObj.patientsAr, rObj.uslugi, function(res) {
                for (var j in res)
                    rObj[j] = res[j];
//                rObj.fullData = res;
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
