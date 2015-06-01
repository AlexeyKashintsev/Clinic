/**
 * 
 * @author Алексей
 * @constructor
 * @public
 */ 
function TreatCreator() {
    var self = this, model = P.loadModel(this.constructor.name);
    var treatCalculator = new TreatCalculator();
    var treatCostCalculator = new TreatCostCalculator();
    
    var routeData;
    self.calculateRoute = function(aPatients, anUslugi, aPricesSource, calculateAllRoute) {
        routeData = treatCalculator.calculateRoute4Group(aPatients, anUslugi)
        routeData = treatCostCalculator.calculateRoute(routeData, aPricesSource, calculateAllRoute);
        return routeData;
    };
    
    self.createTreatment = function(aPatientId, aContractId) {
        if (!aContractId) model.revert();
        model.qTreatById.params.treat_id = null;
        model.qTreatById.push({
            patient: aPatientId ? aPatientId : null,
            treat_date: new Date(),
            treat_status: 100,
            contract_id: aContractId ? aContractId : null,
            contract_data: !aPatientId && aContractId
        });
//        model.save();
        return model.qTreatById.cursor.obr_treatment_id;
    };
    
    function addUslugi4Contract(anUslugi, aTreatment) {
        P.Logger.info('Добавление услуг to contract');
        anUslugi.forEach(function(usluga) {
            model.qUslInTreat.push({
                treat_id: aTreatment,
                usluga_id: usluga,
                selected: true
            });
        });
    }
    
    function addRoute(aRoute, aTreatment) {
        P.Logger.info('Добавление маршрута');
        for (var j in aRoute) {
            model.qTreatRoute.push({
                treat_id: aTreatment,
                usluga_id: j,
                route: true,
                selected: aRoute[j].selected
            });
            aRoute[j].hazards.forEach(function(hazard_id) {
                model.qTreatRouteSources.push({
                    route_usl: model.qTreatRoute.cursor.obr_uslugi_id,
                    hazard: hazard_id
                });
            });
            aRoute[j].usl_contents.forEach(function(usl_id) {
                model.qTreatRouteSources.push({
                    route_usl: model.qTreatRoute.cursor.obr_uslugi_id,
                    appointment_usl: usl_id
                });
            });
        }
    }
    
    self.applyTreatment = function(aTreat, anUslugi) {
        if (aTreat === model.qTreatById.cursor.obr_treatment_id) {
            P.Logger.info('Добавляем назначение');
            if (model.qTreatById.cursor.contract_data) {
                P.Logger.info('Групповое назначение');
                addUslugi4Contract(anUslugi, aTreat);//Добавление услуг к групповому маршруту
            } else
                P.Logger.info('Single treatment');
            
            routeData.patients.forEach(function(patient) {
                P.Logger.info('Добавляем назначения по пациенту ' + patient.surname);
                var cTreat = self.createSingleTreatment(patient.man_patient_id, model.qTreatGroup.cursor.obr_group_id);
                addRoute(patient.route, cTreat);
            });
            
            P.Logger.info('Завершено, сохранение');
            model.save();
            return true;
        } else {
            model.revert();
            return false;
        }
    };
}
