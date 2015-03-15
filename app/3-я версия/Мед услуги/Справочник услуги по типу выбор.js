/**
 * 
 * @author Алексей
 * @name template2
 * @public
 */

function Uslugi4SelectView() {

    var self = this, model = this.model, form = this;
    var fmUslContent;

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (model.modified && confirm('Сохранить изменения?')) {
           model.save();
        }
}//GEN-LAST:event_formWindowClosing

    function grdUslTypeMouseClicked(evt) {//GEN-FIRST:event_grdUslTypeMouseClicked

    }//GEN-LAST:event_grdUslTypeMouseClicked

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        form.close(model.qUslugiByType.cursor.usl_uslugi_id);
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        form.close();
    }//GEN-LAST:event_button1ActionPerformed
}