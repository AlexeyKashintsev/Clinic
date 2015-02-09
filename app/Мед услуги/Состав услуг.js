/**
 * 
 * @author Alexey
 */
function UslugiContentsView() {
    var self = this, model = this.model, form = this;
    var fmUslContent;
    

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        if (!fmUslContent)
            fmUslContent = new UslugaContent();
        fmUslContent.showOnPanel(form.pnlUslContent);
        fmUslContent.setUsluga(model.qUslWithTypesTree.row_id);
    }//GEN-LAST:event_formWindowOpened

    function qUslWithTypesTreeOnScrolled(evt) {//GEN-FIRST:event_qUslWithTypesTreeOnScrolled
        fmUslContent.setUsluga(model.qUslWithTypesTree.cursor.row_id);
    }//GEN-LAST:event_qUslWithTypesTreeOnScrolled
}
