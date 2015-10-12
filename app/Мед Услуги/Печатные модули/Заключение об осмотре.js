/* global P */

/**
 * @public
 * @author minya92
 * @constructor
 */ 
function PrintZakluchenieObOsmotre() {
    var self = this, model = P.loadModel(this.constructor.name);
    var treament_id;
    
    self.setTreatment = function(aTreatId){
        treament_id = aTreatId;
    };
    
    self.execute = function () {
        // TODO : place application code here
    };
}
