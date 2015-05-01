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
    
    var selectContractForm = new SelectContractForm();
    
    var contractPricesView = new ContractPricesView();
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.button.onActionPerformed = function(event) {
        selectContractForm.showModal(function(aResult){
            form.lbContract.text = "Контрагент:" +aResult.company_name + " Договор №:" + aResult.contract_name;
            model.qPricesByContractByType.params.contract_id = aResult.contract_id;
            model.qPricesByContractByType.requery();
            
            model.qPricesByContractByType.params.usluga_type = 0;
            model.qPricesByContractByType.requery();
            //contractPricesView.setContractId(aResult.contract_id);
            //contractPricesView.showOnPanel(form.pnlUsl);
        });
    };
    
    form.lbContract.onMouseClicked = function(event) {
        form.button.onActionPerformed(event);
    };
    
    model.qUslTypes.onScrolled = function(event) {
        //contractPricesView.setUslType(model.qUslTypes.cursor.usl_types_id);
        model.qPricesByContractByType.params.usluga_type = model.qUslTypes.cursor.usl_types_id ? model.qUslTypes.cursor.usl_types_id : 0;
        model.qPricesByContractByType.requery();
    };

    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Удалить?")){
            model.qPricesByContractByType.remove(model.qPricesByContractByType.cursorPos);
        }
    };
    form.btnReq.onActionPerformed = function(event) {
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?'))
            model.qPricesByContractByType.requery();
    };
    form.btnSave.onActionPerformed = function(event) {
        model.save();
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
            }
        });
    };
    form.btnImport.onActionPerformed = function(event) {
        alert("Временно недоступно!");
    };
}
