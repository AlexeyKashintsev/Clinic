/**
 * @public
 * @stateless
 * @author Alexey
 * @constructor
 */ 
function ContractConstructor() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.createContract = function(aCompanyId) {
        
    };
    
    self.updateContractPrices = function(aContractId, aPriceData) {
        P.Logger.info('Updating contract costs for contract ' + aContractId);
        var res = true;
        model.qPricesByContract.params.contract_id = aContractId;
        model.qPricesByContract.requery();
        P.Logger.info(model.qPricesByContract.length + ' records found');
        aPriceData.forEach(function(priceData) {
            P.Logger.info('Updating price for service ' + priceData.usluga_id + ', pd ' + !!priceData);
            if (priceData) {
                var cPrice = model.qPricesByContract.filter(function(contrPrice) {
                    P.Logger.info('1: ' + contrPrice.usluga_id + ', 2: ' + priceData.usluga_id +
                            '\n1: ' + contrPrice.sex  + ', 2: ' +  priceData.sex +
                            '\n1: ' + contrPrice.periodic_type  + ', 2: ' +  priceData.periodic_type +
                            '\n1: ' + contrPrice.limitation_age_type  + ', 2: ' +  priceData.limitation_age_type +
                            '\n1: ' + contrPrice.limitation_age  + ', 2: ' +  priceData.limitation_age);
                    if (contrPrice.usluga_id == priceData.usluga_id
                            && (contrPrice.sex == priceData.sex || !contrPrice.sex === !priceData.sex)
                            && (contrPrice.periodic_type == priceData.periodic_type || !contrPrice.periodic_type === !priceData.periodic_type)
                            && (contrPrice.limitation_age_type == priceData.limitation_age_type || !contrPrice.limitation_age_type === !priceData.limitation_age_type)
                            && (contrPrice.limitation_age == priceData.limitation_age || !contrPrice.limitation_age === !priceData.limitation_age)) {
                        P.Logger.info('Ok');
                        return true;
                    } else {
                        P.Logger.info('NeOK');
                        return false;
                    }
                });
                if (cPrice.length > 0) {
                    if (cPrice.length === 1) {
                        P.Logger.info('Price found, updating value. Old value: ' + cPrice[0].cost + ', new value: ' + priceData.cost);
                        cPrice[0].cost = priceData.cost;
                    } else {
                        P.Logger.warning('Ошибка. В договоре указаны ' + cPrice.length + ' цены!');
                        cPrice.forEach(function(pr) {
                            P.Logger.warning('Запись: ' + pr.usluga_id);
                        });
                        res = false;
                    }
                } else {
                    P.Logger.info('Price not found, creating new');
                    model.qPricesByContract.push({
                            usluga_id: priceData.usluga_id,
                            contract_id: aContractId,
                            sex: priceData.sex,
                            periodic_type: priceData.periodic_type,
                            limitation_age_type: priceData.limitation_age_type,
                            limitation_age: priceData.limitation_age,
                            cost: priceData.cost
                        });
                }
            } else {
                P.Logger.warning('No price data present!');
            }
        });
        if (res) {
            P.Logger.info('All done! Saving...');
            model.save(function() {
                P.Logger.info('Saved!');
            });
            return true;
        } else {
            P.Logger.info('Ошибка!');
            model.revert();
            return false;
        }
    };
    
    self.updateContract = function(aContract) {
        
    };
    
    self.getContract = function(aContractId) {
        
    };
}
