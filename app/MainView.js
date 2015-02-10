/**
 * 
 * @author Alexey
 */
function MainView() {
    var self = this, model = this.model, form = this;
    mainForm = this;
    var fmUslTypes, fmUslList, fmUslContents;
    var fmContragents;
    var fmHazards;
    
    self.showFormAsInternal = function(aForm) {
        var frameRunner = aForm;
        try {
            frameRunner.desktop = self.formDesktop;
            frameRunner.showInternalFrame(self.formDesktop);
        } finally {
            frameRunner.toFront();
        }
    };
    
    function showFormAsModal(formId) {
        modalForm = new Form(formId);
        modalForm.showModal();
    }

    function miUslugiTypesActionPerformed(evt) {//GEN-FIRST:event_miUslugiTypesActionPerformed
        if (!fmUslTypes) {
            fmUslTypes = new UslTypesView();
            self.showFormAsInternal(fmUslTypes);
        } else 
            self.showFormAsInternal(fmUslTypes);
    }//GEN-LAST:event_miUslugiTypesActionPerformed

    function miUslugiListActionPerformed(evt) {//GEN-FIRST:event_miUslugiListActionPerformed
        if (!fmUslList) {
            fmUslList = new UslugiByTypeView();
            self.showFormAsInternal(fmUslList);
        } else self.showFormAsInternal(fmUslList);
    }//GEN-LAST:event_miUslugiListActionPerformed

    function miUslugiContentsActionPerformed(evt) {//GEN-FIRST:event_miUslugiContentsActionPerformed
        if (!fmUslContents) {
            fmUslContents = new UslugiContentsView();
            self.showFormAsInternal(fmUslContents);
        }	else self.showFormAsInternal(fmUslContents);
    }//GEN-LAST:event_miUslugiContentsActionPerformed

    function miContragentsActionPerformed(evt) {//GEN-FIRST:event_miContragentsActionPerformed
        if (!fmContragents) {
            fmContragents = new CompaniesList();
            self.showFormAsInternal(fmContragents);
    }	else self.showFormAsInternal(fmContragents);
    }//GEN-LAST:event_miContragentsActionPerformed

    function miHazardsActionPerformed(evt) {//GEN-FIRST:event_miHazardsActionPerformed
        if (!fmHazards) {
            fmHazards = new HazardsByGroupView();
            self.showFormAsInternal(fmHazards);
    }	else self.showFormAsInternal(fmHazards);
    }//GEN-LAST:event_miHazardsActionPerformed
}
/*
 * 
 *                   if (!fmServices) {
            fmServices = new ServicesForm();
            self.showFormAsInternal(fmServices);
    }	else self.showFormAsInternal(fmServices);
 */