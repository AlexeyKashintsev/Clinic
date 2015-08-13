/* global P */

/**
 * 
 * @author alexey
 * @constructor
 */ 
function TreatWizard() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.showWizard = function (aPatientsArray, aCallback) {
        var wizard = new Wizard(['TreatUslSelector', 'TreatStat', 'TreatCostAndContract'
            , 'TreatCostsView', 'TreatFinish'], aPatientsArray);
        wizard.showModal(aCallback);
    };
    
    self.execute = function() {
        self.showWizard([143186739536219, 142808473476141, 142808237417447]);
    };
}
