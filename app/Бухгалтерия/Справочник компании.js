/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function CompaniesList() {
var self = this, model = this.model, form = this;
var fmCompany;

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
        model.requery();
    }
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
        model.qAllFirms.insert();
    }//GEN-LAST:event_btnAddActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        if (confirm('Удалить выделенного контрагента'))
            model.qAllFirms.deleteRow();
    }//GEN-LAST:event_btnDelActionPerformed

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        if (evt.clickCount > 1) {
            if (!fmCompany)
                fmCompany = new CompanyCard;
            fmCompany.setCompany(model.qAllFirms.cursor.buh_companies_id);
            mainForm.showFormAsInternal(fmCompany);
        }
    }//GEN-LAST:event_modelGridMouseClicked
}