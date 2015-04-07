/**
 * @public
 * @author minya92
 */
function UslugaContent() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Карточка услуги";
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    self.close = function () {
        form.close(true);
    };
    
    var fmUslSelect;
    var uslContainer;
    var uslTypeId;
    
    self.setUsluga = function(aUslugaID, aUslTypeID, aUslName) {
        uslContainer = aUslugaID;
        model.qUslugaById.params.usluga_id = aUslugaID;
        model.qUslugaContents.params.usluga_id = aUslugaID;
        model.qUslugaById.requery();
        model.qUslugaContents.requery();
        model.qUslTypes.requery();
        
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
            model.save(function(){
                model.qUslugaContents.requery();
            });
        });
    };

    form.btnReq1.onActionPerformed = function(event) {
        model.save();
    };
    
    form.btnReq.onActionPerformed = function(event) {
        model.requery();
    };
    
    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Удалить выбранную услугу?")){
            model.qUslugaContents.remove(model.qUslugaContents.cursorPos); // deleteRow();
        }
    };
    
    /*form.mcUslType.onValueChange = function(event) {
        model.qUslugaById.cursor.usl_type = model.qUslTypes.cursor.usl_types_id;
    };*/

}
