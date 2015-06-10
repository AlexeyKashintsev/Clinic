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
        model.qPricesByContract.params.contract_id = aContractId;
        model.qPricesByContract.requery();
        aPriceData.forEach(function(priceData) {
            if (priceData) {
                var cPrice = model.qPricesByContract.find(function(contrPrice) {
                    if (contrPrice.usluga_id === priceData.usluga_id
                            && (contrPrice.sex === priceData.sex || !priceData.sex)
                            && (contrPrice.periodic_type === priceData.periodic_type || !priceData.periodic_type)
                            && (contrPrice.limitation_age_type === priceData.limitation_age_type || !priceData.limitation_age_type)
                            && (contrPrice.limitation_age === priceData.limitation_age || !priceData.limitation_age))
                        return true;
                });
                if (cPrice) {
                    cPrice.cost = priceData.cost;
                } else {
                    model.qPricesByContract.push({
                            usluga_id: priceData.usluga_id,
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
        model.save();
        return true;
    };
    
    self.updateContract = function(aContract) {
        
    };
    
    self.getContract = function(aContractId) {
        
    };
}
