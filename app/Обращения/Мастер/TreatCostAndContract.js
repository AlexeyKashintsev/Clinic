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
        treatCostCalculator.calculateRoute(rObj, rObj.priceSource, form.cbAllRoute.value, form.cbIgnoreMissedPrices.value,
            function(res) {
                rObj = res;
                callback();
            });
    };
    
    function checkNextStep() {
        return form.mcPriceSource.value && form.cbNoContract.value || form.mcContract.value;
    }
    
};
