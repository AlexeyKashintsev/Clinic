/**
 * 
 * @author root
 * @constructor
 */ 
function TreatCostCalculator() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    function findMissedPrices(aPricesSource, anUslugi, calculateAllRoute) {
        P.Logger.info('Looking for missed prices');
        model.qUslugiByContract.params.contract_id = aPricesSource;
        model.qUslugiByContract.requery();
        
        var ok = true;
        var missed = [];
        for (var j in anUslugi) {
            P.Logger.info('Service ' + j + ((anUslugi[j].selected || calculateAllRoute) ? ' processing' : ' skipping'));
            if ((anUslugi[j].selected || calculateAllRoute) &&
                    !model.qUslugiByContract.find({usluga_id: j}).length) {
                ok = false;
                P.Logger.warning('Missed price for service: ' + j);
                missed.push(j);
            }
        }
        return ok ? false : missed;
    }
    
    function getUslPrice(aPatient, aRouteUsl) {
        var prices = model.qPriceSource.find({usluga_id: aRouteUsl});
        var maxIndex = -1;
        var res;
        prices.forEach(function(price) {
            var index = 0;
            if (price.sex && price.sex === aPatient.sex)
                index++;
            else
                index = price.sex ? -1 : 0;
            if (price.per_type)
                index = -1;
            
            if (aPatient.date_oft_birth) {
                var patientAgeYears = (new Date).getFullYear() - aPatient.date_oft_birth.getFullYear();
                if (index !== -1)
                    switch (price.limitation_age_type) {
                        case 1: {
                                break
                        }
                        case 2: {//Older
                                if (price.limitation_age <= patientAgeYears)
                                    index = -1;
                                else
                                    index += 3;
                                break;
                        }
                        case 3: {//Younger
                                if (price.limitation_age > patientAgeYears)
                                    index = -1;
                                else
                                    index += 3;
                                break;
                        }
                    }
                }
            
            if (index > maxIndex)
                res = price;
        });
        return res;
    }
    
    function calculatePrices(aPatientsData, aPricesSource, calculateRoute) {
        P.Logger.info('Calculating cost for services');
        model.qPriceSource.params.contract_id = aPricesSource;
        model.qPriceSource.requery();
        var pricesData = {};
        
        aPatientsData.forEach(function(patient) {
            for (var j in patient.route) {
                if (patient.route[j].selected && !calculateRoute || calculateRoute && patient.route[j].route) {
                    patient.route[j].payable = true;
                    var usl_cost = getUslPrice(patient, patient.route[j].usl_id);
                    if (usl_cost) {
                        if (!pricesData[usl_cost.usl_cost_id]) {
                            pricesData[usl_cost.usl_cost_id] = usl_cost;
                            pricesData[usl_cost.usl_cost_id].patients_count++;
                        }
                        patient.route[j].usl_cost = usl_cost.cost;
                    } else
                        patient.route[j].usl_cost = null;
                }
            };
        });
        var pData = [];
        for (var j in pricesData)
            pData.push(pricesData[j]);
        return pData;
    }
    
    self.calculateRoute = function(aRouteData, aPricesSource, calculateAllRoute, ignoreMissedPrices) {
        var missedPrices = !ignoreMissedPrices ? findMissedPrices(aPricesSource, aRouteData.uslugi, calculateAllRoute) : false;
        var priceData = calculatePrices(aRouteData.patients, aPricesSource, calculateAllRoute);
        if (missedPrices) {
            missedPrices.forEach(function(missedPrice) {
                priceData.push({
                    usluga_id: missedPrice,
                    missed: true,
                    cost: null
                });
            });
            P.Logger.info(aRouteData.errors);
            if (!aRouteData.errors)
                aRouteData.errors = [];
            aRouteData.errors.push({
                errorType: 'missedPrices',
                data: missedPrices
            });
        }
        aRouteData.priceData = priceData;
        return aRouteData;
    };
}
