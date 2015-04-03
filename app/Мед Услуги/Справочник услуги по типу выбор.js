/**
 * 
 * @author minya92
 */
function Uslugi4SelectView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var parent;
    self.show = function (aParent) {
        form.show();
        //console.log(aParent);
        parent = aParent;
    };
    
    form.onWindowClosing = function(event) {
        alert(model.qUslugiByType.cursor.usl_usligi_id);
        console.log(model.qUslugiByType.cursor.usr_name);
        parent.uslAdd(2);
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
            alert(model.qUslugiByType.cursor.usl_usligi_id);
            form.close();
        }
    };
}
