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
    self.calculateRoute = function(aPatients, anUslugi) {
        routeData = treatCalculator.calculateRoute4Group(aPatients, anUslugi);
        return routeData;
    };
    
    self.calculatePrices = function(aPricesSource, calculateAllRoute) {
        treatCostCalculator.calculateRoute(routeData, aPricesSource, calculateAllRoute);
        return routeData;
    };
    
    self.updateRoute = function(aNewRouteData) {
//        TODO
    };
    
    self.createTreatment = function(aPatientId, aContractId, aTreatGroup) {
        if (!aContractId || !aTreatGroup) model.revert();
        model.qTreatById.params.treat_id = null;
        model.qTreatById.push({
            patient: aPatientId ? aPatientId : null,
            treat_date: new Date(),
            treat_status: 100,
            group_treat: aTreatGroup,
            contract_id: aContractId ? aContractId : null,
            contract_data: !aPatientId && aContractId
        });
        P.Logger.info('Новое назначение id ' + model.qTreatById.cursor.obr_treatment_id);
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
                route: aRoute[j].route,
                selected: aRoute[j].selected
            });
            aRoute[j].hazards.forEach(function(hazard) {
                P.Logger.info('New hazard: ' + hazard);
                model.qTreatRouteSources.push({
                    route_usl: model.qTreatRoute.cursor.obr_uslugi_id,
                    hazard: hazard.hazard_id
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
    
    self.applyTreatment = function(aTreat, anUslugi, aContract) {
        var treatGroup = null;
        if (!aTreat || aTreat == model.qTreatById.cursor.obr_treatment_id) {
            P.Logger.info('Добавляем назначение');
            if (routeData.patients.length > 1) {
                P.Logger.info('Групповое назначение');
                treatGroup = self.createTreatment(null, aContract, null);
                addUslugi4Contract(anUslugi, aTreat);//Добавление услуг к групповому маршруту
            } else
                P.Logger.info('Single treatment');
            
            routeData.patients.forEach(function(patient) {
                P.Logger.info('Добавляем назначения по пациенту ' + patient.surname);
                var cTreat = self.createTreatment(patient.man_patient_id, aContract, treatGroup);
                addRoute(patient.route, cTreat);
            });
            
            P.Logger.info('Завершено, сохранение');
            model.save();
            return true;
        } else {
            P.Logger.info('Назначение на сервере отличается от значения на клиенте! На сервере '
                    + model.qTreatById.cursor.obr_treatment_id + ', на клиенте ' + aTreat);
            model.revert();
            return false;
        }
    };
}
