/**
 * 
 * @author minya92
 */
function Uslugi4SelectView__() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    self.form = form;
    
    var parent;
    self.show = function () {
        form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
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
            //alert();
            form.close(model.qUslugiByType.cursor.usl_uslugi_id);
        }
    };
    
    form.button.onActionPerformed = function(event) {
        alert(model.qUslugiByType.cursor.usl_uslugi_id);
    };
}
