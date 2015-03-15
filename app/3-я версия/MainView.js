/**
 * 
 * @author Alexey
 */
function MainView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    mainForm = this;
  /*  var fmUslTypes, fmUslList, fmUslContents;
    var fmContragents;
    var fmHazards;
    var fmUsers;
    
    self.showFormAsInternal = function(aForm) {
        var frameRunner = aForm;
        try {
            frameRunner.desktop = self.formDesktop;
            frameRunner.showInternalFrame(self.formDesktop);
        } catch(e) {
            frameRunner.show();
        }
        finally {
            frameRunner.toFront();
        }
    };
    
    function showFormAsModal(formId) {
        modalForm = new Form(formId);
        modalForm.showModal();
    }

    function miUslugiTypesActionPerformed(evt) {//GEN-FIRST:event_miUslugiTypesActionPerformed
        if (!fmUslTypes) {
            require(['UslTypesView'], function() {
                fmUslTypes = new UslTypesView();
                self.showFormAsInternal(fmUslTypes);
            });
        } else 
            self.showFormAsInternal(fmUslTypes);
    }//GEN-LAST:event_miUslugiTypesActionPerformed

    function miUslugiListActionPerformed(evt) {//GEN-FIRST:event_miUslugiListActionPerformed
        if (!fmUslList) {
            require(['UslugiByTypeView'], function() {
                fmUslList = new UslugiByTypeView();
                self.showFormAsInternal(fmUslList);
            });            
        } else
            self.showFormAsInternal(fmUslList);
    }//GEN-LAST:event_miUslugiListActionPerformed

    function miUslugiContentsActionPerformed(evt) {//GEN-FIRST:event_miUslugiContentsActionPerformed
        if (!fmUslContents) {
            require(['UslugiContentsView'], function() {
                fmUslContents = new UslugiContentsView();
                self.showFormAsInternal(fmUslContents);
            });
        } else
            self.showFormAsInternal(fmUslContents);
    }//GEN-LAST:event_miUslugiContentsActionPerformed

    function miContragentsActionPerformed(evt) {//GEN-FIRST:event_miContragentsActionPerformed
        if (!fmContragents) {
            require(['CompaniesList'], function() {
                fmContragents = new CompaniesList();
                self.showFormAsInternal(fmContragents);
            });
        } else 
            self.showFormAsInternal(fmContragents);
    }//GEN-LAST:event_miContragentsActionPerformed

    function miHazardsActionPerformed(evt) {//GEN-FIRST:event_miHazardsActionPerformed
        if (!fmHazards) {
            require(['HazardsByGroupView'], function() {
                fmHazards = new HazardsByGroupView();
                self.showFormAsInternal(fmHazards);
            });
        } else
            self.showFormAsInternal(fmHazards);
    }//GEN-LAST:event_miHazardsActionPerformed

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        //var d = document.getElementById('menuBar');
        //document.body.appendChild(d);
    }//GEN-LAST:event_formWindowOpened

    function miUsersActionPerformed(evt) {//GEN-FIRST:event_miUsersActionPerformed
        if (!fmUsers) {
            require(['UsersView'], function() {
                fmUsers = new UsersView();
                self.showFormAsInternal(fmUsers);
            });
        } else
            self.showFormAsInternal(fmUsers);
    }//GEN-LAST:event_miUsersActionPerformed*/
}
/*
 * 
 *                   if (!fmServices) {
            fmServices = new ServicesForm();
            self.showFormAsInternal(fmServices);
    }	else self.showFormAsInternal(fmServices);
 */