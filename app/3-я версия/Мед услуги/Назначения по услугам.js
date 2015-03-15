/**
 * 
 * @author Alexey
 */
function UslugiContentsView() {
    var self = this, model = this.model, form = this;
    var fmUslContent = new UslugaContent();
    fmUslContent.doClose = false;
    

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        fmUslContent.showOnPanel(form.pnlUslContent);
    }//GEN-LAST:event_formWindowOpened

    function qUslugiByTypeOnScrolled(evt) {//GEN-FIRST:event_qUslugiByTypeOnScrolled
        fmUslContent.setUsluga(model.qUslugiByType.cursor.usl_uslugi_id);
    }//GEN-LAST:event_qUslugiByTypeOnScrolled

    function qUslugiByTypeOnRequeried(evt) {//GEN-FIRST:event_qUslugiByTypeOnRequeried
        fmUslContent.setUsluga(model.qUslugiByType.empty ? null : model.qUslugiByType.cursor.usl_uslugi_id);
    }//GEN-LAST:event_qUslugiByTypeOnRequeried
}
