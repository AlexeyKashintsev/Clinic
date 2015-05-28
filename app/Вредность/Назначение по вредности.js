/**
 * @public
 * @author minya92
 */
function HazardContent() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
//    form.mcHazard.onValueChange = function(aEvt) {
//        self.setHazard(form.mcHazard.value.hazards_id);
//    };
    
    self.setHazard = function(aHazardID, aHazardName){
        if (model.modified && confirm('Сохранить изменения?')) {
            model.save();
        }
        model.qHazardContents.params.hazard_id = aHazardID;
        form.lbUsl.text = aHazardName;
        model.qHazardContents.execute();
        
    };
    
    model.requery();
    
}
