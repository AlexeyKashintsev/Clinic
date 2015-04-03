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
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.close = function () {
        form.close(true);
    };
    
    var fmUslSelect;
    self.doClose = true;
    var uslContainer;
    var uslTypeId;
    
    self.setUsluga = function(aUslugaID, aUslTypeID, aUslName) {
//        if (model.modified){
//            confirm('Сохранить изменения?') ? model.save() : model.revert();
//        }
        if (model.qUslugiByType.findById(aUslugaID)) {
            uslContainer = aUslugaID;
        }
        if (!aUslugaID) {
            model.qUslugaById.push({
                usl_type    :   aUslTypeID,
                usl_name    :   aUslName
            });
            uslContainer = model.qUslugaById.cursor.usl_uslugi_id;
            uslTypeId = aUslTypeID;
        }
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        if (!fmUslSelect)
            fmUslSelect = new Uslugi4SelectView();
        fmUslSelect.showModal(function(aRouteId) {
            model.qUslugaContents.push({
                route_usl       : aRouteId,
                usl_container   : uslContainer,
                usl_type        : uslTypeId
            });
            model.save();
            model.qUslugaContents.requery();
        });
    };

    form.btnReq1.onActionPerformed = function(event) {
        model.save();
    };
    form.btnReq.onActionPerformed = function(event) {
        model.requery();
    };
}
