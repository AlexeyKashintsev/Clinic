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
    
    var selectPriceListView = new SelectPriceListView();
    
    var contractPricesView = new ContractPricesView();
    
    model.requery(function () {});
    
//    function reqUslTypes(){
//        var prevId = model.qUslTypesByPrice.cursor.usl_types_id;
//        model.requery(function(){
//            model.qUslTypesByPrice.cursor.usl_types_id = prevId;
//        });
//    }
    
    form.button.onActionPerformed = function(event) {
        selectPriceListView.showModal(function(aResult){
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
        model.qPricesByContractByType.params.usluga_type = model.qUslTypesByPrice.cursor.usl_types_id ? model.qUslTypesByPrice.cursor.usl_types_id : 0;
        RequeryAnimate(form.modelGrid1, model.qPricesByContractByType);
    };

    form.btnDel.onActionPerformed = function(event) {
        model.qPricesByContractByType.splice(model.qPricesByContractByType.indexOf(form.modelGrid1.selected[0]), 1);
        //model.qPricesByContractByType.remove(model.qPricesByContractByType.cursorPos);
    };
    
    form.btnReq.onActionPerformed = function(event) {
        if(model.modified && confirm("Внесенные изменения будут потеряны.\nОбновить?")){
            model.requery();
        }
    };
    form.btnSave.onActionPerformed = function(event) {
        model.save(function(){
            model.requery();
        });
    };
    
    var fmUslSel;
    form.btnAdd.onActionPerformed = function(event) {
        if(model.qPricesByContractByType.params.contract_id){
            if (!fmUslSel)
                fmUslSel = new Uslugi4SelectView();
            fmUslSel.showModal(function(aUslId) {
                if (aUslId) {
                    model.qPricesByContractByType.push({
                        usluga_id   :   aUslId,
                        contract_id :   model.qPricesByContractByType.params.contract_id
                    });
                }
            });
        } else {
            alert("Для начала выберите прайс лист!");
//            form.button.onActionPerformed();
//            form.btnAdd.onActionPerformed();
        }
    };
    
    form.label1.onMouseClicked = function(event) {
        form.button.onActionPerformed(event);
    };
    
    form.btnImport.onActionPerformed = function(event) {
        if(model.qPricesByContractByType.params.contract_id){
            selectPriceListView.showModal(function(aResult){
                if(aResult){
                    if(confirm("Вы уверены что хотите загрузить список услуг из " + aResult.company_name + " " + aResult.contract_name)){
                        model.qCopyUslCost.params.contract_select = aResult.contract_id;
                        model.qCopyUslCost.params.contract_target = model.qPricesByContractByType.params.contract_id;
                        model.qCopyUslCost.execute(function(){}, function(){
                            model.requery();
                        });
                    }
                }
            });
        } else {
            alert("Для начала выберите договор!");
            form.button.onActionPerformed();
        }
    };
}
