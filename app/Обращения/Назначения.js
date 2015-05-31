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
    
    var uslStat  = [];
    var naznacheniya = [];
    function calculate() {
        var uslugi = [];
        naznacheniya = [];
        model.qUslInTreat.forEach(function(usl) {
            uslugi.push(usl.usluga_id);
        });
        var pcs = [];
        patients.forEach(function(patient) {
            pcs.push(patient.man_patient_id);
        });
            
        treatCalculator.calculateRoute4Group(pcs, uslugi, function(res) {
            uslStat = [];
            for (var j in res.uslugi) {
                uslStat.push(res.uslugi[j]);
                uslStat[uslStat.length-1].usl_name = model.qUslugaById.findById(j).usl_name;
            }
            form.mgUslugiStat.data = uslStat;
            form.mgUslugiStat.colUslName.field = "usl_name";
            form.mgUslugiStat.colCount.field = "people";
            form.mgUslugiStat.colCountByRoute.field = "usl_content";
            form.mgUslugiStat.colCountByHazard.field = "hazard";
            
            res.patients.forEach(function(patient) {
                var rec = {
                    n_name: patient.surname + ' ' + patient.firstname + ' ' + patient.patronymic,
                    n_parent: null,
                    n_children: [],
                    n_by_hazard: null,
                    n_by_content: null
                };
                if (patient.hazards !== {}) { 
                var hazards = {
                    n_name: "Вредности",
                    n_parent: rec,
                    n_children: []
                };
                for (var j in patient.hazards) {
                        if (j !== 'length') {
                            var hazard = patient.hazards[j];
                            hazards.n_children.push({
                                n_name: hazard.haz_code + " " + hazard.haz_name,
                                n_parent: hazards,
                                n_children: []
                            });
                        }
                    };
                    rec.n_children.push(hazards);
                }
                var route = {
                    n_name: "Назначения",
                    n_parent: rec,
                    n_children: []
                };
                for (var j in patient.route) {
                    route.n_children.push({
                        n_name: model.qUslugaById.findByKey(j).usl_name,
                        n_by_hazard: patient.route[j].hazard,
                        n_by_content: patient.route[j].usl_content,
                        n_parent: hazards,
                        n_children: []
                    });
                }
                rec.n_children.push(route);
                
                naznacheniya.push(rec);
            });
            
            form.mgRoutes.data = naznacheniya;
            form.mgRoutes.childrenField = "n_children";
            form.mgRoutes.parentField = "n_parent";
            form.mgRoutes.colName.field = "n_name";
            form.mgRoutes.colByRoute.field = "n_by_content";
            form.mgRoutes.colByHazard.field = "n_by_hazard";
            
        });
    }
    
    form.button.onActionPerformed = calculate;
    
    function testData() {
        self.setPatients([143186739536219, 142808473476141, 142808237417447], function() {
                model.qUslInTreat.push({
                                        treat_id: curTreat,
                                        usluga_id: 39
                                    });
                model.qUslInTreat.push({
                                        treat_id: curTreat,
                                        usluga_id: 42
                                    });
                model.qUslInTreat.push({
                                        treat_id: curTreat,
                                        usluga_id: 143048593295042
                                    });
            });
    }
    //testData();
}