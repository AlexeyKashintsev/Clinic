/**
 * 
 * @author Alexey
 */
function MainView() {
    var self = this, model = this.model, form = this;
    
    var fmUslTypes, fmUslList, fmUslContents;
    
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
            fmUslTypes.mainForm = self;
            self.showFormAsInternal(fmUslTypes);
        } else 
            self.showFormAsInternal(fmUslTypes);
    }//GEN-LAST:event_miUslugiTypesActionPerformed

    function miUslugiListActionPerformed(evt) {//GEN-FIRST:event_miUslugiListActionPerformed
        if (!fmUslList) {
            fmUslList = new UslugiByTypeView();
            fmUslList.mainForm = self;
            self.showFormAsInternal(fmUslList);
        } else self.showFormAsInternal(fmUslList);
    }//GEN-LAST:event_miUslugiListActionPerformed

    function miUslugiContentsActionPerformed(evt) {//GEN-FIRST:event_miUslugiContentsActionPerformed
        if (!fmUslContents) {
            fmUslContents = new UslugiContentsView();
            fmUslContents.mainForm = self;
            self.showFormAsInternal(fmUslContents);
        }	else self.showFormAsInternal(fmUslContents);
    }//GEN-LAST:event_miUslugiContentsActionPerformed
}
/*
 * 
 *                   if (!fmServices) {
            fmServices = new ServicesForm();
            fmServices.mainForm = self;
            self.showFormAsInternal(fmServices);
    }	else self.showFormAsInternal(fmServices);
 */