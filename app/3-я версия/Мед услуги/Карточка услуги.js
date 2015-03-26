/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function UslugaContent_old() {
var self = this, model = this.model, form = this; 
var fmUslSelect;
self.doClose = true;

self.setUsluga = function(aUslugaID, aUslTypeID, aUslName) {
    if (model.modified){
        confirm('Сохранить изменения?') ? model.save() : model.revert();
    }
    if (model.qUslugiByType.findById(aUslugaID)) {
        model.params.usl_id = aUslugaID;
    }
    if (!aUslugaID) {
        model.qUslugaById.push({
            usl_type    :   aUslTypeID,
            usl_name    :   aUslName
        });
    }
};

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
            model.requery();
    }
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
    if (self.doClose) 
        form.close(true);
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing


    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        if (!fmUslSelect)
            fmUslSelect = new Uslugi4SelectView();
        fmUslSelect.showModal(function(aUslID) {
            if (aUslID)
                model.qUslugaContents.push({
                    usl_container   :   model.qUslugaContents.params.usluga_id,
                    usl_content     :   aUslID
                });
        });
    }//GEN-LAST:event_btnAddActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        model.qUslugaContents.deleteRow();
    }//GEN-LAST:event_btnDelActionPerformed

    function colUslContentOnSelect(aEditor) {//GEN-FIRST:event_colUslContentOnSelect
        //TODO Возможно, здесь будет глюк
        if (!fmUslSelect)
            fmUslSelect = new UslugiSelectList();
        fmUslSelect.showModal(function(aUslID) {
            if (aUslID)
                model.qUslugaContents.cursor.usl_content = aUslID;
        });
    }//GEN-LAST:event_colUslContentOnSelect

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        model.revert();
        if (self.doClose) 
            form.close(false);
    }//GEN-LAST:event_buttonActionPerformed
}