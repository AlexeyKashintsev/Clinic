/**
 * 
 * @author Алексей
 * @public
 */

function UslugiSelectList() {
var self = this, model = this.model, form = this; 


    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        if (!model.qUslWithTypesTree.cursor.is_type) {
            form.close(model.qUslWithTypesTree.cursor.row_id);
        } else 
            alert('Нельзя выбрать тип услуги!');
    }//GEN-LAST:event_btnSelectActionPerformed

    function btnCancelActionPerformed(evt) {//GEN-FIRST:event_btnCancelActionPerformed
        form.close();
    }//GEN-LAST:event_btnCancelActionPerformed
}