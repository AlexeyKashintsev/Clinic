/**
 * 
 * @author Алексей
 * @name template2
 * @public
 */

function template2() {

    var self = this, model = this.model, form = this;

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
        model.requery();
    }
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (model.modified && confirm('Сохранить изменения?')) {
           model.save();
        }
}//GEN-LAST:event_formWindowClosing

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed

    }//GEN-LAST:event_btnAddActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        
           // model.queryItems.deleteRow();
    }//GEN-LAST:event_btnDelActionPerformed

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked

    }//GEN-LAST:event_modelGridMouseClicked
}