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
    
    var fmCosts = new ContractPricesView();
    fmCosts.showOnPanel(form.pnlCosts);
    var newContract = false;
    
    self.setContractID = function(aContractID, aCompanyID) {
        if (aContractID) {
            model.qContract.params.contract_id = aContractID;
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

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
        fmCosts.model.save();
        form.close(true);
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnCancelActionPerformed(evt) {//GEN-FIRST:event_btnCancelActionPerformed
        if (newContract) {
            model.qContract.deleteRow();
            model.save();
        } else            
            model.revert();
        fmCosts.model.revert();
        form.close(false);
    }//GEN-LAST:event_btnCancelActionPerformed
}
