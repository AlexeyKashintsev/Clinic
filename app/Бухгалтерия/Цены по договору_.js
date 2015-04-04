/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function ContractPricesView_() {
    var self = this, model = this.model, form = this; 
    var fmUslSel;

    self.setContractId = function(aContractId) {
        model.qPricesByContract.params.contract_id = aContractId;
        model.revert();
        model.requery();
    };

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing


    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        if (!fmUslSel)
            fmUslSel = new Uslugi4SelectView();
        fmUslSel.showModal(function(aUslId) {
            if (aUslId) {
                model.qPricesByContract.push({
                    usluga_id   :   aUslId,
                    contract_id :   model.qPricesByContract.params.contract_id
                });
            }
        });
        //model.qPricesByContract.
    }//GEN-LAST:event_btnAddActionPerformed
}