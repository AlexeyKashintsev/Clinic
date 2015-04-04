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
    
    form.modelCombo.onValueChange = function(aEvt) {
        
    };
    
    self.setHazard = function(aHazardID){
        if (model.modified && confirm('Сохранить изменения?')){
        model.save();
    }
    //if (model.qUslugiByType.findById(aHazardID)) {
        model.qHazardContents.params.hazard_id = aHazardID;
        model.qHazardContents.execute();
        //model.params.haz_id = aHazardID;
    //}
    };
    
    model.qHazards.onScrolled = function(){
        alert("scroll");
        model.qHazardContents.params.hazard_id = model.qHazards.cursor.hazards_id;
        model.qHazardContents.requery();
    };
    
    form.modelCombo.onItemSelected = function(){
        alert("test");
    };
    
//    form.modelCombo.on = function(){
//        alert("test");
//    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
}
