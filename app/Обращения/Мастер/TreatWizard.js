/* global P */

/**
 * 
 * @author alexey
 * @constructor
 */ 
function TreatWizard() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.showWizard = function (aPatientsArray) {
        var wizard = new Wizard(['TreatUslSelector', 'TreatDetailedView'], aPatientsArray);
        wizard.showModal();
    };
    
    self.showWizard([143186739536219, 142808473476141, 142808237417447]);
}
