/**
 * @public
 * @author minya92
 */
function UslugaContent() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.close = function () {
        form.close(true);
    };
    
    var fmUslSelect;
    self.doClose = true;

    self.setUsluga = function(aUslugaID, aUslTypeID, aUslName) {
//        if (model.modified){
//            confirm('Сохранить изменения?') ? model.save() : model.revert();
//        }
        if (model.qUslugiByType.findById(aUslugaID)) {
            model.params.usl_id = aUslugaID;
        }
        if (!aUslugaID) {
            model.qUslugaById.push({
                usl_type    :   aUslTypeID,
                usl_name    :   aUslName
            });
        }
    };
    
    
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
         if (!fmUslSelect)
            fmUslSelect = new Uslugi4SelectView();
         fmUslSelect.show();
    };
    
    self.uslAdd = function(aRouteId){
        model.qUslugaContents.push({
            route_usl : aRouteId,
            usl_container : model.params.usl_id
        });
    };
}
