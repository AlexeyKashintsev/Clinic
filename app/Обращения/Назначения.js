/**
 * 
 * @author Alexey
 */
function AppointmentForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var treatCreator = new P.ServerModule('TreatCreator');
    model.qUslugaById.requery();
    model.qContracts.params.c_act = true;
    model.qContracts.requery();
    model.qAllFirms.requery();
    model.qPriceLists.requery();

    var patients = [];
    var curTreat;
    var errorsLog = [];
    var canApply = false;
    
    self.show = function () {
        form.show();
    };
    self.showModal = function (callback) {
        form.showModal(callback);
    };

    function setCurTreat(aTreatmentId, callback) {
        model.revert();
        console.log('Curtreat = ' + aTreatmentId);
        curTreat = aTreatmentId;
        model.qUslInTreat.params.treat_id = curTreat;
        model.qUslInTreat.requery();
        if (callback)
            callback();
    }

    function createTreat(aContract, callback) {
        form.mtPatientsCount.text = patients.length;
        treatCreator.createTreatment(patients.length > 1 ? null : patients[0].man_patient_id
                , aContract, null, function (res) {
                    setCurTreat(res, callback);
                });
    }

    function getPatientsData(patientsArray, curIndex, callback) {
        model.qPatientById.params.patient_id = patientsArray[curIndex];
        model.qPatientById.requery(function () {
            patients.push(model.qPatientById.cursor);
            curIndex++;
            if (patientsArray.length !== curIndex)
                getPatientsData(patientsArray, curIndex, callback);
            else
                callback();
        });
    }

    self.setPatients = function (aPatients, aContract, aCallback) {
        form.mcAllRoute.value = false;
        if (typeof aPatients[0] === 'object') {
            patients = aPatients;
            createTreat(aContract, aCallback);
        } else {
            patients = [];
            getPatientsData(aPatients, 0, function () {
                createTreat(aContract, aCallback);
            });
        }
        uslStat = [];
        naznacheniya = [];
        fullData = [];
    };

    var fmUslugiSelect = new Uslugi4SelectView();
    form.btnAdd.onActionPerformed = function (event) {
        if (curTreat)
            fmUslugiSelect.showModal(function (anUsluga) {
                if (anUsluga) {
                    model.qUslInTreat.push({
                        treat_id: curTreat,
                        usluga_id: anUsluga
                    });
                }
            });
    };

    form.mgUsl.colContract.onSelect = function () {

    };

    var uslStat = [],
            naznacheniya = [],
            fullData = [];
    function calculate() {
        var uslugi = [];
        naznacheniya = [];
        model.qUslInTreat.forEach(function (usl) {
            uslugi.push(usl.usluga_id);
        });
        var pcs = [];
        patients.forEach(function (patient) {
            pcs.push(patient.man_patient_id);
        });

        treatCreator.calculateRoute(pcs, uslugi, form.mcPriceSource.value ? form.mcPriceSource.value.buh_contracts_id : null
            , form.mcAllRoute.value
            , function (res) {
                canApply = true;
                fullData = res;
                uslStat = [];
                for (var j in res.uslugi) {
                    uslStat.push(res.uslugi[j]);
                    uslStat[uslStat.length - 1].usl_name = model.qUslugaById.findByKey(j).usl_name;
                }
                form.mgUslugiStat.data = uslStat;
                form.mgUslugiStat.colUslName.field = "usl_name";
                form.mgUslugiStat.colCount.field = "treatments";
                form.mgUslugiStat.colCountByRoute.field = "usl_content";
                form.mgUslugiStat.colCountByHazard.field = "hazard";

                res.patients.forEach(function (patient) {
                    var rec = {
                        n_name: patient.surname + ' ' + patient.firstname + ' ' + patient.patronymic,
                        n_parent: null,
                        n_children: [],
                        n_by_hazard: null,
                        n_by_content: null,
                        cost: null,
                        selected: null,
                        route: null
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
                        }
                        ;
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
                            n_children: [],
                            cost: patient.route[j].usl_cost,
                            selected: patient.route[j].selected,
                            route: patient.route[j].route
                        });
                    }
                    rec.n_children.push(route);

                    naznacheniya.push(rec);
                });

                form.mgRoutes.data = naznacheniya;
                form.mgRoutes.childrenField = "n_children";
                form.mgRoutes.parentField = "n_parent";
                form.mgRoutes.colName.field = "n_name";
                form.mgRoutes.colSelected.field = "selected";
                form.mgRoutes.colRoute.field = "route";
                form.mgRoutes.colPrice.field = "cost";
                
                errorsLog = [];
                res.errors.forEach(function(error) {
                    switch (error.errorType) {
                        case 'missedPrices': {
                                canApply = false;
                                var erLog = {
                                    e_parent: null,
                                    text: 'Не указана цена',
                                    e_children: []
                                };
                                error.data.forEach(function(missedPrice) {
                                    erLog.e_children.push({
                                        e_parent: erLog,
                                        text: model.qUslugaById.findByKey(missedPrice).usl_name,
                                        e_children: null,
                                        data: missedPrice
                                    });
                                });
                                errorsLog.push(erLog);
                        }
                    };
                });
                form.mgWarnings.data = errorsLog;
                form.mgWarnings.colDescription.field = "text";
                form.mgWarnings.childrenField = "e_children";
                form.mgWarnings.parentField = "e_parent";
                
                fullData.priceData.forEach(function(price) {
                    price.usluga = model.qUslugaById.findByKey(price.usluga_id);
                    price.periodic_type = model.qUslPeriodicType.findByKey(price.per_type);
                    price.sex_t = model.qSex.findByKey(price.sex);
                    price.age_type = model.qSex.findByKey(price.limitation_age_type);
                });
                
                form.mgCosts.data = fullData.priceData;
                form.mgCosts.colUsl_name.field = "usluga";
                form.mgCosts.colSex.field = "sex_t";
                form.mgCosts.colPer_type.field = "periodic_type";
                form.mgCosts.colVozrastType.field = "age_type";
                form.mgCosts.colVozrast.field = "limitation_age";
                form.mgCosts.onRender = function(event) {
                    if (event.object.missed)
                        event.cell.background = new P.Color('#FFCCCC');
                };

            });
    }

    function applyTreatment() {
        
        treatCreator.applyTreatment(curTreat
            , function () {
                var res = [];
                model.qUslInTreat.forEach(function (usl) {
                    res.push(usl.usluga_id);
                });
                return res;
            }());
    }

    form.btnApply.onActionPerformed = function (event) {
        if (canApply) {
            applyTreatment();
            form.close();
        } else 
        alert('Невозможно применить, сначала исправьте все ошибки');
    };

    form.button.onActionPerformed = calculate;
    
    form.mcPriceSource.onSelect = function(evt) {
        alert('Select!');
    };
    
    form.mcContract.onSelect = function(evt) {
        alert('Select!');
    };
    
    function testData() {
        self.setPatients([143186739536219, 142808473476141, 142808237417447], null, function () {
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
    testData();
    form.btnCreateContract.onActionPerformed = function(event) {
        if(form.mcCompany.value){
            var contractDetailsView = new ContractDetailsView();
            contractDetailsView.setContractID(null, form.mcCompany.value.buh_companies_id);
            contractDetailsView.setCompany(form.mcCompany.value.buh_companies_id);
            contractDetailsView.showModal(function(a){
                form.mcCompany.onValueChange();
            });
        } else {
            alert("Выберите компанию!");
        }
    };
    
    form.mcCompany.onValueChange = function(event) {
        model.qContracts.params.comp_id = form.mcCompany.value.buh_companies_id;
        model.qContracts.execute();
    };

    form.btnCreatePriceList.onActionPerformed = function(event) {
        var selectPriceListView = new SelectPriceListView();
        selectPriceListView.showModal(function(a){
           model.qPriceLists.requery(); 
        });
//        
//        TODO! Непонятно почему этот код не работает? rolled back
//        var aName = prompt("Введите название:");
//        if(aName) {
//            model.qContracts.push({
//                contr_name: aName,
//                с_active: true,
//                price: true
//            });
//            model.save();
//        }
    };
}