/**
 * 
 * @author Alexey
 */
function ContractDetailsView() {
    var self = this
        , model = P.loadModel(this.constructor.name)
        , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    var fmCosts = new ContractPricesView();
    fmCosts.showOnPanel(form.pnlCosts);
    var newContract = false;
    
    self.setContractID = function(aContractID, aCompanyID) {
        if (aContractID) {
            model.qContract.params.contract_id = aContractID;
            model.qAllFirms.params.company_id = aCompanyID;
            model.revert();
            model.requery();
            fmCosts.setContractId(aContractID);
            newContract = false;
        } else {
            if (model.modified) {
                model.revert();
                model.requery();
            }
            model.qContract.push({
                company_id  :   aCompanyID,
                с_active    :   true,
                start_date  :   new Date()
            });
            model.save();
            newContract = true;
            fmCosts.setContractId(model.qContract.cursor.buh_contracts_id);
        }
    };
    
    model.requery();
    
    form.btnSave.onActionPerformed = function(event) {
        model.save();
        fmCosts.save();
        form.close(true);
    };
    
    form.btnCancel.onActionPerformed = function(event) {
         if (newContract) {
            model.qContract.deleteRow();
            model.save();
        } else            
            model.revert();
        fmCosts.revert();
        form.close(false);
    };
}
