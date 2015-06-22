/**
 * 
 * @author Alexey
 */
function AppointmentForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var treatCreator = new P.ServerModule('TreatCreator');
    model.qContracts.params.c_act = true;
//    model.qUslugaById.requery();
//    model.qContracts.requery();
//    model.qAllFirms.requery();
//    model.qPriceLists.requery();
    model.requery();

    var patients = [];
    var curTreat, priceSource, contract;
    var errorsLog = [];
    var canApply = false;
    var contractConstructor = new P.ServerModule('ContractConstructor');

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
        model.revert();
        form.cbAllRoute.value = false;
        form.cbIgnoreMissedPrices.value = false;
        form.cbNoContract.value = false;
        uslStat = [];
        naznacheniya = [];
        fullData = {};
        
        if (typeof aPatients[0] === 'object') {
            patients = aPatients;
            form.mtPatientsCount.text = patients.length;
            setCurTreat(null, aCallback);
        } else {
            patients = [];
            getPatientsData(aPatients, 0, function () {
                form.mtPatientsCount.text = patients.length;
                setCurTreat(null, aCallback);
            });
        }
    };

    var fmUslugiSelect = new Uslugi4SelectView();
    form.btnAdd.onActionPerformed = function (event) {
//        if (curTreat)
            fmUslugiSelect.showModal(function (anUsluga) {
                if (anUsluga) {
                    model.qUslInTreat.push({
                        treat_id: curTreat,
                        usluga_id: anUsluga
                    });
                }
            });
    };

    var uslStat = [],
            naznacheniya = [],
            fullData = {},
            gridAppliance = false;

    function applyDataToGrids() {
        form.mgUslugiStat.data = uslStat;
        form.mgUslugiStat.colUslName.field = "usl_name";
        form.mgUslugiStat.colCount.field = "treatments";
        form.mgUslugiStat.colCountByRoute.field = "usl_content";
        form.mgUslugiStat.colCountByHazard.field = "hazard";

        form.mgRoutes.data = naznacheniya;
        form.mgRoutes.childrenField = "n_children";
        form.mgRoutes.parentField = "n_parent";
        form.mgRoutes.colName.field = "n_name";
        form.mgRoutes.colSelected.field = "selected";
        form.mgRoutes.colRoute.field = "route";
        form.mgRoutes.colPrice.field = "cost";

        form.mgWarnings.data = errorsLog;
        form.mgWarnings.colDescription.field = "text";
        form.mgWarnings.childrenField = "e_children";
        form.mgWarnings.parentField = "e_parent";


        form.mgCosts.data = fullData.priceData;
        form.mgCosts.colUsl_name.field = "usluga";
        form.mgCosts.colSex.field = "sex_t";
        form.mgCosts.colPer_type.field = "periodic_type";
        form.mgCosts.colVozrastType.field = "age_type";
        form.mgCosts.colVozrast.field = "limitation_age";

        form.mgCosts.onRender = function (event) {
            if (event.object.missed)
                event.cell.background = new P.Color('#FFCCCC');
        };
//        gridAppliance = true;
    }

    function prepareStatData(aStatData) {
        for (var j in aStatData) {
            uslStat.push(aStatData[j]);
            uslStat[uslStat.length - 1].usl_name = model.qUslugaById.findByKey(j).usl_name;
        }
    }

    function preaprePatientData(patient) {
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
    }
    ;

    function preparePriceData(price) {
        price.usluga = model.qUslugaById.findByKey(price.usluga_id);
        price.periodic_type = model.qUslPeriodicType.findByKey(price.per_type);
        price.sex_t = model.qSex.findByKey(price.sex);
        price.age_type = model.qSex.findByKey(price.limitation_age_type);
    }

    function prepareErrorData(error) {
        switch (error.errorType) {
            case 'missedPrices':
            {
                canApply = false;
                var erLog = {
                    e_parent: null,
                    text: 'Не указана цена',
                    e_children: []
                };
                error.data.forEach(function (missedPrice) {
                    erLog.e_children.push({
                        e_parent: erLog,
                        text: model.qUslugaById.findByKey(missedPrice).usl_name,
                        e_children: null,
                        data: missedPrice
                    });
                });
                errorsLog.push(erLog);
            }
        }
        ;
    }

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

        priceSource = form.mcPriceSource.value ? form.mcPriceSource.value.buh_contracts_id :
                (form.mcContract.value ? form.mcContract.value.buh_contracts_id : null);

        treatCreator.calculateRoute(pcs, uslugi
                , function (res) {
                    canApply = true;
                    fullData = res;
                    uslStat = [];
                    errorsLog = [];

                    prepareStatData(fullData.uslugi);
                    fullData.patients.forEach(preaprePatientData);

                    res.errors.forEach(prepareErrorData);

                    if (priceSource)
                        treatCreator.calculatePrices(priceSource, form.cbAllRoute.value
                                , function (res) {
                                    fullData.priceData = res.priceData;
                                    fullData.priceData.forEach(preparePriceData);
                                    res.errors.forEach(prepareErrorData);
                                    if (!gridAppliance)
                                        applyDataToGrids();
                                });
                    else {
                        if (!gridAppliance)
                            applyDataToGrids();
                    }
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
                }()
                , form.mcContract.value ? form.mcContract.value.buh_contracts_id : null);
    }

    function getCosts() {
        var costs = [];
        form.mgCosts.data.forEach(function (s) {
            costs.push({
                limitation_age_type: s.age_type ? s.age_type.usl_lim_age_type_id : null,
                cost: s.cost,
                per_type: s.periodic_type ? s.periodic_type.usl_periodic_type_id : null,
                sex: s.sex_t ? s.sex_t.man_sex_id : null,
                usluga_id: s.usluga ? s.usluga.usl_uslugi_id : null
            });
        });
        return costs;
    }

    function updatePrice() {
        var contract_id;
        if (form.mcPriceSource.value && confirm('Обновить прайс лист?'))
            contract_id = form.mcPriceSource.value.buh_contracts_id;
        if (contract_id)
            contractConstructor.updateContractPrices(contract_id, getCosts());
        return !!contract_id;
    }

    function updateContract(aCallback) {
        var contract_id;
        if (form.mcContract.value) {
            contract_id = form.mcContract.value.buh_contracts_id;
            form.mcPriceSource.value = null;
        }
        if (contract_id)
            contractConstructor.updateContractPrices(contract_id, getCosts(), aCallback);
        return !!contract_id;
    }

    function checkAppliance(onSuccess, onFailure) {
        if (form.mcContract.value) {
            updateContract(function (aRes) {
                if (aRes) {
                    treatCreator.calculatePrices(form.mcContract.value.buh_contracts_id
                            , form.cbAllRoute.value
                            , function (res) {
                                if (res.errors.length > 0) {
                                    fullData.priceData = res.priceData;
                                    fullData.priceData.forEach(preparePriceData);
                                    res.errors.forEach(prepareErrorData);
                                    if (!gridAppliance)
                                        applyDataToGrids();
                                    onFailure();
                                } else {
                                    onSuccess();
                                }
                            });
                } else {
                    onFailure();
                }
            });
        } else {
            if (canApply) {
                    onSuccess();
            } else {
                onFailure();
            }
        }
    }

    form.btnApply.onActionPerformed = function (event) {
        checkAppliance(function () {
            applyTreatment();
            form.close();
        }, function () {
            alert('Невозможно применить, сначала исправьте все ошибки');
        });
    };

    form.button.onActionPerformed = calculate;

    form.mcPriceSource.onSelect = function (evt) {
        var selectPriceListView = new SelectPriceListView();
        selectPriceListView.showModal(function (row) {
            form.mcPriceSource.value = row;
        });
    };

    form.mcContract.onSelect = function (evt) {
        var allContractsView = new AllContractsView();
        allContractsView.setSelect(true);
        allContractsView.showModal(function (row) {
            form.mcContract.value = row;
            model.qAllFirms.params.company_id = row.company_id;
            model.qAllFirms.requery(function () {
                form.mcCompany.value = model.qAllFirms.cursor;
            });
        });
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
//    testData();

    form.btnCreateContract.onActionPerformed = function (event) {
        if (form.mcCompany.value) {
            var contractDetailsView = new ContractDetailsView();
            contractDetailsView.setContractID(null, form.mcCompany.value.buh_companies_id);
            contractDetailsView.setCompany(form.mcCompany.value.buh_companies_id);
            contractDetailsView.showModal(function (row) {
                //form.mcCompany.onValueChange();
                form.mcContract.value = row;
            });
        } else {
            alert("Выберите компанию!");
        }
    };

    form.mcCompany.onValueChange = function (event) {
        model.qContracts.params.comp_id = form.mcCompany.value.buh_companies_id;
        model.qContracts.execute();
    };

    form.btnDoublePrice.onActionPerformed = function (event) {
        if (form.mgCosts.selected[0]) {
            var s = form.mgCosts.selected[0];
            form.mgCosts.data.push({
                limitation_age_type: s.limitation_age_type,
                cost: s.cost,
                missed: s.missed,
                per_type: s.per_type,
                sex: s.sex,
                usluga_id: s.usluga_id,
                usluga: s.usluga,
                age_type: s.age_type,
                sex_t: s.sex_t,
                periodic_type: s.periodic_type
            });
        }
    };

    form.btnSaveToPrice.onActionPerformed = function (event) {
        if (!updatePrice())
            alert('Не выбран прайс-лист');
    };
    form.btnSaveToContract.onActionPerformed = function (event) {
        if (!updateContract())
            alert('Не выбран договор!');
    };
    form.btnCancel.onActionPerformed = function(event) {
        model.revert();
        form.close(false);
    };
}