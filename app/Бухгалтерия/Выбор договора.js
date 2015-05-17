/**
 * 
 * @author minya92
 */
function SelectContractForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    model.qAllFirms.onRequeried = function(event) {
        model.qContracts.params.comp_id = model.qAllFirms.cursor.buh_companies_id;
        model.qContracts.requery();
    };
    
    model.qAllFirms.onScrolled = function(event) {
        model.qAllFirms.onRequeried(event);
    };
    
    form.modelGrid1.onMouseClicked = function(event) {
        if(event. clickCount > 1){
            form.btnSelect.onActionPerformed(event);
        }
    };

    form.btnSelect.onActionPerformed = function(event) {
        form.close({
            company_name : model.qAllFirms.cursor.company_name,
            contract_name: model.qContracts.cursor.contr_name,
            contract_id  : model.qContracts.cursor.buh_contracts_id
        });
    };
    
    form.btnReq.onActionPerformed = function(event) {
        model.requery();
    };
    form.btnCancel.onActionPerformed = function(event) {
        form.close(false);
    };
}
