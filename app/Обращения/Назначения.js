/**
 * 
 * @author Alexey
 */
function AppointmentForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var treatCreator = new P.ServerModule('TreatCreator');
    var treatCalculator = new P.ServerModule('TreatCalculator');
    model.qUslugaById.requery();
    model.qContracts.params.c_act = true;
    model.qContracts.requery();
    
    var patients = [];
    var curTreat;
    
    self.show = function () {
        form.show();
    };
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    function setCurTreat(aTreatmentId, callback) {
        model.revert();
        curTreat = aTreatmentId;
        model.qUslInTreat.params.treat_id = curTreat;
        model.qUslInTreat.requery();
        if (callback) callback();
    }
    
    function createTreat(callback) {
        form.mtPatientsCount.text = patients.length;
        if (patients.length > 1) 
            treatCreator.createGroupTreatment(null, function(res) {
                setCurTreat(res, callback);
            });
        else
            treatCreator.createSingleTreatment(patients[0].man_patient_id, function(res) {
                setCurTreat(res, callback);
            });
    }
    
    function getPatientsData(patientsArray, curIndex, callback) {
        model.qPatientById.params.patient_id = patientsArray[curIndex];
        model.qPatientById.requery(function() {
            patients.push(model.qPatientById.cursor);
            curIndex++;
            if (patientsArray.length !== curIndex)
                getPatientsData(patientsArray, curIndex, callback)
            else
                callback();
        });
    }
    
    self.setPatients = function(aPatients, callback) {
        if (typeof aPatients[0] === 'object') {
            patients = aPatients;
            createTreat(callback);
        } else {
            patients = [];
            getPatientsData(aPatients, 0, function() {
                createTreat(callback);
            });
        }
        
    };
    
    var fmUslugiSelect = new Uslugi4SelectView();
    form.btnAdd.onActionPerformed = function(event) {
        if (curTreat)
            fmUslugiSelect.showModal(function(anUsluga) {
                if (anUsluga) {
                    model.qUslInTreat.push({
                        treat_id: curTreat,
                        usluga_id: anUsluga
                    });
                }
            });
    };
    
    form.mgUsl.colContract.onSelect = function() {
        
    };
    
    form.button.onActionPerformed = function(event) {
        var uslugi = [];
        model.qUslInTreat.forEach(function(usl) {
            uslugi.push(usl.usluga_id);
        });
        var pcs = [];
        patients.forEach(function(patient) {
            pcs.push(patient.man_patient_id);
        });
            
        treatCalculator.calculateRoute4Group(pcs, uslugi, function(res) {
            console.log(res);
        });
    };
    
    function testData() {
        self.setPatients([143186739536219, 142808473476141, 142808237417447], function() {
                model.qUslInTreat.push({
                                        treat_id: curTreat,
                                        usluga_id: 39
                                    });
            });
    }
    testData();
}

//    var rue = {
//        usluga: "usluga_id",
//        people_count: "people_count",
//        usl_route_count: "---",
//        hazards_count: "---"
//    };
//    var routeUsl = [];
//    
//    var sue = {
//        usluga: "usluga_id",
//        usl_cost: "usl_cost",
//        contract: "contract_id"
//    };
//    var selectedUsl = [];
//    form.mgUsl.data = selectedUsl;