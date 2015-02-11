/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function CompaniesListForSelect() {
var self = this, model = this.model, form = this; 

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
        model.requery();
    }
}//GEN-LAST:event_btnReqActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

}