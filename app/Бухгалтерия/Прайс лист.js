/**
 * 
 * @author minya92
 */
function PriceListForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    var selectContractForm = new SelectContractForm();
    
    var contractPricesView = new ContractPricesView();
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    function reqUslTypes(){
        var prevId = model.qUslTypesByPrice.cursor.usl_types_id;
        model.qUslTypesByPrice.requery(function(){
            model.qUslTypesByPrice.cursor.usl_types_id = prevId;
        });
    }
    
    form.button.onActionPerformed = function(event) {
        selectContractForm.showModal(function(aResult){
            form.lbContragent.text = aResult.company_name;
            form.lbContract.text = aResult.contract_name;
            model.qPricesByContractByType.params.contract_id = aResult.contract_id;
            model.qPricesByContractByType.requery();
            
            model.qUslTypesByPrice.params.contract_id = aResult.contract_id;
            model.qUslTypesByPrice.requery();
            
            model.qPricesByContractByType.params.usluga_type = 0;
            model.qPricesByContractByType.requery();
            //contractPricesView.setContractId(aResult.contract_id);
            //contractPricesView.showOnPanel(form.pnlUsl);
        });
    };
    
    form.lbContract.onMouseClicked = function(event) {
        form.button.onActionPerformed(event);
    };
    
    model.qUslTypesByPrice.onScrolled = function(event) {
        //contractPricesView.setUslType(model.qUslTypes.cursor.usl_types_id);
        model.qPricesByContractByType.params.usluga_type = model.qUslTypesByPrice.cursor.usl_types_id ? model.qUslTypesByPrice.cursor.usl_types_id : 0;
        model.qPricesByContractByType.requery();
    };

    form.btnDel.onActionPerformed = function(event) {
        //model.qPricesByContractByType.remove(model.qPricesByContractByType.cursorPos);
        if(confirm("Удалить запись? \nЭту операцию невозможно отменить!")){
           model.qDelUslCost.params.cost_id = model.qPricesByContractByType.cursor.usl_cost_id;
           model.qDelUslCost.execute(function(){
                    model.qPricesByContractByType.requery();
                }, function(){
                    model.qPricesByContractByType.requery();
            });
        }
    };
    form.btnReq.onActionPerformed = function(event) {
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')){
            model.qPricesByContractByType.requery();
            reqUslTypes();
        }
    };
    form.btnSave.onActionPerformed = function(event) {
        model.save();
        reqUslTypes();
    };
    
    var fmUslSel;
    form.btnAdd.onActionPerformed = function(event) {
        if (!fmUslSel)
            fmUslSel = new Uslugi4SelectView();
        fmUslSel.showModal(function(aUslId) {
            if (aUslId) {
                model.qPricesByContractByType.push({
                    usluga_id   :   aUslId,
                    contract_id :   model.qPricesByContractByType.params.contract_id
                });
                //model.qUslTypesByPrice.
            }
        });
    };
    
    form.lbContragent.onMouseClicked = function(event) {
        form.button.onActionPerformed(event);
    };
    form.label.onMouseClicked = function(event) {
        form.button.onActionPerformed(event);
    };
    form.label1.onMouseClicked = function(event) {
        form.button.onActionPerformed(event);
    };
    
    form.btnImport.onActionPerformed = function(event) {
        //alert("Временно недоступно!");
        selectContractForm.showModal(function(aResult){
            if(aResult){
                if(confirm("Вы уверены что хотите загрузить список услуг из " + aResult.company_name + " " + aResult.contract_name)){
                    model.qCopyUslCost.params.contract_select = aResult.contract_id;
                    model.qCopyUslCost.params.contract_target = model.qPricesByContractByType.params.contract_id;
                    model.qCopyUslCost.execute(function(){
                        model.qPricesByContractByType.requery();
                    }, function(){
                        model.qPricesByContractByType.requery();
                    });
                }
            }
        });
    };
    
    form.btnSelect.onActionPerformed = function(event) {
        form.close(model.qPricesByContractByType.cursor);
    };
}
