/**
 * 
 * @author Алексей
 * @public
 */

function ContractsByCompanyView() {
var self = this, model = this.model, form = this; 
var fmContract;

self.setCompany = function(aCompanyId) {
    model.qContracts.params.company_id = aCompanyId;
    model.qContracts.execute();
};

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing
    
    function addNewContract() {
        if (!fmContract)
            fmContract = new ContractDetailsView();
    }

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        if (self.checkForUpdate) {
            if (self.checkForUpdate()) 
                addNewContract();
        } else 
            addNewContract();
    }//GEN-LAST:event_btnAddActionPerformed
}