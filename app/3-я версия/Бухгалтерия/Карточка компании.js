/**
 * 
 * @author Алексей
 */
function CompanyCard() {
    var self = this, model = this.model, form = this;
    
    var fmContracts = new ContractsByCompanyView();
    fmContracts.showOnPanel(form.pnlContracts);
    
    self.setCompany = function(aCompanyID) {
        if (aCompanyID) {
            model.qAllFirms.params.company_id = aCompanyID;
            model.requery();
            fmContracts.setCompany(aCompanyID);
        } else {
            model.revert();
            model.requery();
            self.addNewCompany();
        }
    };
    
    self.addNewCompany = function() {
        model.qAllFirms.insert();
        fmContracts.setCompany(model.qAllFirms.cursor.buh_companies_id);
        fmContracts.checkForUpdate = function() {
            if (model.modified) {
                if (confirm('Сохранить изменения?')) {
                    model.save();
                    return true;
                } else
                    return false;
            } 
            fmContracts.checkForUpdate = false;
            return true;
        };
    };

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
        fmContracts.model.save();
        form.close();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnCancelActionPerformed(evt) {//GEN-FIRST:event_btnCancelActionPerformed
        model.revert();
        fmContracts.model.revert();
        form.close();
    }//GEN-LAST:event_btnCancelActionPerformed
}
