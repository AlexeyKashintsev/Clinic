/**
 * 
 * @author Алексей
 * @public
 */

function UsersView() {
    var self = this, model = this.model, form = this;
    self.isSelectForm = false;
    
    //var tradePointsForm = new TradePoints();
    var userCreateAndEditForm = new UserCreateAndEditForm();

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        form.pnlSelLock.visible = self.isSelectForm;
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing


    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        form.close(model.qUsers.usr_name);
    }//GEN-LAST:event_btnSelectActionPerformed

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        userCreateAndEditForm.setUserName(undefined);
        userCreateAndEditForm.showModal(function(){
                model.requery();
            });
    }//GEN-LAST:event_btnAddActionPerformed

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        if (evt.clickCount === 2) {
            userCreateAndEditForm.setUserName(model.qUsers.cursor.usr_name);
            userCreateAndEditForm.showModal(function(){
                    model.requery();
                });
        }
    }//GEN-LAST:event_modelGridMouseClicked

    function modelGridMousePressed(evt) {//GEN-FIRST:event_modelGridMousePressed
    }//GEN-LAST:event_modelGridMousePressed

    function btnEditActionPerformed(evt) {//GEN-FIRST:event_btnEditActionPerformed
    }//GEN-LAST:event_btnEditActionPerformed
}