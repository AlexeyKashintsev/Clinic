/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function template_1() {
var self = this, model = this.model, form = this; 


    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        if (model.qUslWithTypesTree.cursor.parent_type_id) {
            form.close(model.qUslWithTypesTree.cursor.row_id);
        } else 
            alert('Нельзя выбрать тип услуги!');
    }//GEN-LAST:event_btnSelectActionPerformed
}