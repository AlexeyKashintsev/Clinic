/**
 * 
 * @author Alexey
 */
function ContractDetailsView() {
    var self = this, model = this.model, form = this;
    var fmCosts;
    
    self.setContractID = function(aContractID, aCompanyID) {
        if (aContractID) {
            model.qContract.params.contract_id = aContractID;
            model.qContract.execute();
        } else {
            if (model.modified)
                model.revert();
            model.qContract.push({
                company_id  :   aCompanyID,
                active      :   true,
                start_date  :   new Date()
            });
        }
    };

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
        if (fmCosts)
            fmCosts.model.save();
        form.close(true);
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnCancelActionPerformed(evt) {//GEN-FIRST:event_btnCancelActionPerformed
        model.revert();
        if (fmCosts)
            fmCosts.model.revert();
        form.close(false);
    }//GEN-LAST:event_btnCancelActionPerformed
}
