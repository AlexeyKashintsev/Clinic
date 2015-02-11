/**
 * 
 * @author Alexey
 */
function UslugiContentsView() {
    var self = this, model = this.model, form = this;
    var fmUslContent;
    

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        if (!fmUslContent) {
            fmUslContent = new UslugaContent();
            fmUslContent.doClose = false;
        }
        fmUslContent.showOnPanel(form.pnlUslContent);
        fmUslContent.setUsluga(model.qUslugiByType.cursor.usl_uslugi_id);
    }//GEN-LAST:event_formWindowOpened

    function qUslugiByTypeOnScrolled(evt) {//GEN-FIRST:event_qUslugiByTypeOnScrolled
        fmUslContent.setUsluga(model.qUslugiByType.cursor.usl_uslugi_id);
    }//GEN-LAST:event_qUslugiByTypeOnScrolled
}
