/**
 * 
 * @author minya92
 */
function Uslugi4SelectView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.showModal(function(a){alert(a)});
    };
    
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    model.qUslTypes.onScrolled = function(){
        model.qUslugiByType.params.usl_type = model.qUslTypes.cursor.usl_types_id;
        model.qUslugiByType.requery();
    };
    
    form.modelGrid1.onMouseClicked = function(evt){
        if(evt.clickCount == 2){
            //parent.uslAdd();
            form.close(model.qUslugiByType.cursor.usl_usligi_id);
        }
    };
}
