/**
 * 
 * @author Алексей
 * @constructor
 * @public
 */ 
function TreatCreator() {
    var self = this, model = P.loadModel(this.constructor.name);
    var treatCalculator = new TreatCalculator();
    
    var routeData;
    self.calculateRoute4Group = function(aPatients, anUslugi) {
        routeData = treatCalculator.calculateRoute4Group(aPatients, anUslugi);
        return routeData;
    };
    
    self.calculateRoute4Person = function(aPatient, anUslugi) {
        routeData = treatCalculator.calculateRoute4Person(aPatient, anUslugi);
        return routeData;
    };
    
    self.createGroupTreatment = function(aContractId) {
        model.revert();
        model.qTreatGroup.params.contract_id = 
            model.qTreatGroup.params.group_id = null;
        model.qTreatGroup.push({
            contract_id: aContractId ? aContractId : null
        });
        model.qTreatById.params.treat_id = null;
        model.qTreatById.push({
            treatment_group_id: model.qTreatGroup.cursor.obr_group_id,
            treat_date: new Date(),
            treat_status: 0,
            group_data: true
        });
//        model.save();
        return model.qTreatById.cursor.obr_treatment_id;
    };
    
    self.createSingleTreatment = function(aPatientId, aTreatGroup) {
        if (!aTreatGroup) model.revert();
        model.qTreatById.params.treat_id = null;
        model.qTreatById.push({
            patient: aPatientId,
            treat_date: new Date(),
            treat_status: 0,
            treatment_group_id: aTreatGroup
        });
//        model.save();
        return model.qTreatById.cursor.obr_treatment_id;
    };
    
    function addUslugi(anUslugi, aTreatment) {
        P.Logger.info('Добавление услуг');
        anUslugi.forEach(function(usluga) {
            model.qUslInTreat.push({
                treat_id: aTreatment,
                usluga_id: usluga
//                contract_id: aContract
            });
        });
    }
    
    function addRoute(aRoute, aTreatment) {
        P.Logger.info('Добавление маршрута');
        for (var j in aRoute) {
            model.qTreatRoute.push({
                treat_id: aTreatment,
                usluga_id: j
//                TODO: Здесь добавить какуие услуги и вредности
            });
        }
    }
    
    self.applyTreatment = function(aTreat, anUslugi) {
        if (aTreat === model.qTreatById.cursor.obr_treatment_id) {
            P.Logger.info('Добавляем назначение');
            if (model.qTreatById.cursor.group_data) {
                P.Logger.info('Групповое назначение');
                addUslugi(anUslugi, aTreat);//Добавление услуг к групповому маршруту
                routeData.patients.forEach(function(patient) {
                    P.Logger.info('Добавляем назначения по пациенту ' + patient.surname);
                    var cTreat = self.createSingleTreatment(patient, model.qTreatGroup.cursor.obr_group_id);
                    addUslugi(anUslugi, cTreat);
                    addRoute(patient.route, cTreat);
                });
            } else {
//                Добавление единичного маршрута (только один человек)
                P.Logger.info('Одиночное назначение');
                addUslugi(anUslugi, aTreat);
                addRoute(routeData.patients[0].route, aTreat);
            }
            P.Logger.info('Завершено, сохранение');
            model.save();
            return true;
        } else {
            model.revert();
            return false;
        }
    };
}
