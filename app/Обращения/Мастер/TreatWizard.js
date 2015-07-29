/* global P */

/**
 * 
 * @author alexey
 * @constructor
 */ 
function TreatWizard() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.showWizard = function (aPatientsArray) {
        var wizard = new Wizard(['TreatUslSelector', 'TreatStat', 'TreatCostAndContract'
            , 'TreatCostsView', 'TreatFinish'], aPatientsArray, {
            title :'Мастер создания назначений'
        });
        wizard.showModal();
    };
    
    self.execute = function() {
        self.showWizard({
            contract: 143394573283937,
            allRoute: true,
            uslugi: [143504344351411],
            patientsAr: [143186739536219, 142808473476141, 142808237417447]
        }, {
            title: 'Мастер создания назначений'
        });
    };
}
