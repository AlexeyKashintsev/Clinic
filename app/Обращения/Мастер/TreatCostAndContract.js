/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatCostAndContract() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    model.qAllFirms.requery();
    model.qContracts.requery();
    model.qPriceLists.requery();
    
    var treatCostCalculator = new P.ServerModule('TreatCostCalculator');
    var rObj = {};
    self.setData = function(aRObj) {
        rObj = aRObj;
    };
    
    Object.defineProperty(self, 'nextData', {
        get: function() {
            return rObj;
        }
    });
    
    self.show = function (aPanel) {
        var cont = aPanel ? aPanel : self.container;
        if (cont) {
            cont.add(form.view, new P.Anchors(1, null, 1, 1, null, 1));
        } else 
            form.show();
    };
    
    self.onBeforeNext = function(callback) {
        rObj.priceSource = form.mcPriceSource.value ? form.mcPriceSource.value.buh_contracts_id :
                    (form.mcContract.value ? form.mcContract.value.buh_contracts_id : null);
        rObj.price = form.mcPriceSource.value ? form.mcPriceSource.value.buh_contracts_id : false;
        rObj.contract = form.mcContract.value ? form.mcContract.value.buh_contracts_id : false;
        rObj.allRoute = form.cbAllRoute.value;
        rObj.ignoreMissedPrices = form.cbIgnoreMissedPrices.value;    

        var sRObj = {
            patients:   rObj.patients,
            uslugi: rObj.uslugi,
            errors: rObj.errors
        };
        treatCostCalculator.calculateRoute(sRObj, rObj.priceSource, form.cbAllRoute.value, form.cbIgnoreMissedPrices.value,
            function(res) {
                rObj.patients = res.patients;
                rObj.uslugi = res.uslugi;
                rObj.errors = res.errors;
                rObj.priceData = res.priceData;
                callback();
            });
    };
    
    function checkNextStep() {
        var ready = form.mcPriceSource.value && form.cbNoContract.value || form.mcContract.value;
        self.controller.nextBtn = ready;
        return ready;
    }
    
    form.mcCompany.onValueChange = function (event) {
        model.qContracts.params.comp_id = form.mcCompany.value.buh_companies_id;
        model.qContracts.execute();
    };
    
    form.mcContract.onActionPerformed = form.mcPriceSource.onActionPerformed =
            form.cbNoContract.onActionPerformed = form.mcContract.onValueChange = checkNextStep;

};
