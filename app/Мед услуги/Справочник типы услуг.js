/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function UslTypesView() {
var self = this, model = this.model, form = this; 

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing


    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        var newUslName = prompt('Название нового типа услуги');
        if (newUslName)
            model.qUslTypes.push({
                type_name   :   newUslName,
                type_parent :   
                        model.qUslTypes.cursor.type_parent !== 0 ? model.qUslTypes.cursor.type_parent : null
            });
    }//GEN-LAST:event_btnAddActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        if (model.qUslTypes.cursor.usl_types_id) {
            if (confirm('Внимание! Так же будут удалены услуги с данным типом!\nУдалить данный тип услуги?')) {
                model.qUslTypes.deleteRow();
            }
        } else {
            alert('Невозможно удалить данный тип услуг!');
        }
    }//GEN-LAST:event_btnDelActionPerformed

    function btnAddParentActionPerformed(evt) {//GEN-FIRST:event_btnAddParentActionPerformed
        var newUslName = prompt('Название нового типа услуги');
        if (newUslName)
            model.qUslTypes.push({
                type_name   :   newUslName,
                type_parent :   
                        model.qUslTypes.cursor.usl_types_id !== 0 ? model.qUslTypes.cursor.usl_types_id : null
            });
    }//GEN-LAST:event_btnAddParentActionPerformed
}