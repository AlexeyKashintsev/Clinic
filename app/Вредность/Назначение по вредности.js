/**
 * @public
 * @author minya92
 */
function HazardContent() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    form.modelCombo.onValueChange = function(aEvt) {
        
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
