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
    
    var resultsForm;
    var fmUslSelect;
    var uslContainer;
    var uslTypeId;
    var aUslugaID;
    
    self.setUsluga = function(aUslugaID, aUslTypeID, aUslName) {
        uslContainer = aUslugaID;
        model.qUslParamsName.params.p_usl_uslugi_id = aUslugaID;
        model.qUslugaById.params.usluga_id = aUslugaID;
        model.qUslugaContents.params.usluga_id = aUslugaID;
        model.qUslParamsName.requery();
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
            if(aRouteId){
                model.qUslugaContents.push({
                    route_usl       : aRouteId,
                    usl_container   : uslContainer,
                    usl_type        : uslTypeId
                });
                model.save(function(){
                    model.qUslugaContents.requery();
                });
            }
        });
    };

    form.btnSave.onActionPerformed = function(event) {
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

    form.btnAdd1.onActionPerformed = function(event) {
         if (!resultsForm)
            resultsForm = new ResultsForm();
        resultsForm.showModal(function(usl_params_list_id) {
            model.qUslParamsName.push({
                param_id : usl_params_list_id,
                usluga_id : uslContainer
            });
            model.qUslParamsName.params.p_usl_uslugi_id = uslContainer;
            model.save(function(){
                model.qUslParamsName.requery();
            });
        });
        //model.qUslPeriodicType.push({});
    };
    form.btnDel1.onActionPerformed = function(event) {
        if(confirm("Удалить выбранный параметр?")){
            model.qUslParamsName.remove(model.qUslParamsName.cursorPos); // deleteRow();
        }
    };
    form.btnReq1.onActionPerformed = function(event) {
        form.btnReq.onActionPerformed();
    };
    form.btnSave1.onActionPerformed = function(event) {
        form.btnSave.onActionPerformed();
    };
    form.modelGrid1.onMouseClicked = function(event) {
        if(event.clickCount > 1){
            if (!resultsForm)
                resultsForm = new ResultsForm();
            resultsForm.showModal(function(){
                model.qUslParamsName.requery();
            });
        }
    };

}
