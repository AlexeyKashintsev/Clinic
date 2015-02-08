/**
 * 
 * @author Алексей
 * @name template2
 * @public
 */

function UslugiByTypeView() {

    var self = this, model = this.model, form = this;

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (self.model.modified && confirm('Сохранить изменения?')) {
            self.model.save();
        }
        self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (self.model.modified && confirm('Сохранить изменения?')) {
           self.model.save();
        }
}//GEN-LAST:event_formWindowClosing

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        var uslName = prompt('Введите наименование новой услуги');
        if (uslName)
            model.qUslugiByType.push({
                    usl_type    :   model.qUslTypes.cursor.usl_types_id,
                    usl_name    :   uslName
            });
    }//GEN-LAST:event_btnAddActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        model.qUslugiByType.deleteRow();
    }//GEN-LAST:event_btnDelActionPerformed

    function grdUslTypeMouseClicked(evt) {//GEN-FIRST:event_grdUslTypeMouseClicked

    }//GEN-LAST:event_grdUslTypeMouseClicked
}