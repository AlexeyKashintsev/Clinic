/**
 * 
 * @author Алексей
 * @name template2
 * @public
 */

function HazardsByGroupView() {
    var self = this, model = this.model, form = this;
    var fmHazardContent;

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (model.modified && confirm('Сохранить изменения?')) {
            model.save();
        }
        model.qUslugiByType.requery();
}//GEN-LAST:event_btnReqActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (model.modified && confirm('Сохранить изменения?')) {
           model.save();
        }
}//GEN-LAST:event_formWindowClosing

    function btnContentsActionPerformed(evt) {//GEN-FIRST:event_btnContentsActionPerformed
        if (model.qHazards.cursor.hazards_id) {
            if (!fmHazardContent)
                fmHazardContent = new HazardContent();
            fmHazardContent.setHazard(model.qHazards.cursor.hazards_id);
            fmHazardContent.showModal();
        }
    }//GEN-LAST:event_btnContentsActionPerformed
}