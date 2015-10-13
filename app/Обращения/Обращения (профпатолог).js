/**
 * 
 * @author Алексей
 */
function TreatmentsForm() {
    var params = {
        firstname : null
    };
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var fmPatient = new PatientForm();
    var repForms = {};
    model.requery();
    
    self.show = function (aDesktop) {
        if(aDesktop){
            form.showInternalFrame(aDesktop);
        } else{
           try {
               form.view.showOn(document.getElementById('Main'));
           } catch(e) {
               form.show();
           }
       }
    };
    
    
    
    form.btnEditPatient.onActionPerformed = function(event) {
        fmPatient.setParams(model.qAllPatientTreatmentsStatuses.cursor.man_patient_id);
        fmPatient.showModal(function(aResult) {
            if (aResult){
                model.qAllPatientTreatmentsStatuses.requery();
                model.qAllFirms.requery();
            }
        });
    };
    
    form.btnApplyFilter.onActionPerformed = function(event) {
        model.qAllPatientTreatmentsStatuses.params.company_id = form.mcWorkPlace.value ? 
                form.mcWorkPlace.value.buh_companies_id : null;
        model.qAllPatientTreatmentsStatuses.params.firstname = form.tfFirstName.text;
        model.qAllPatientTreatmentsStatuses.params.surname = form.tfSurname.text;
        model.qAllPatientTreatmentsStatuses.params.treat_status = form.mcTreatStatus.value ? form.mcTreatStatus.value.obr_status_id : null;
        //model.qAllPatientTreatmentsStatuses.params.start_date = form.mdTreatStart.value ? form.mdTreatStart.value : null;
//        model.qAllPatientTreatmentsStatuses.params.end_date = form.mdTreatEnd.value ? form.mdTreatEnd.value : null;
        
        model.qAllPatientTreatmentsStatuses.requery();
    };
    
//    model.qPatientsByParams.onRequeried = function(event) {
//        form.lbPatientsCount.text = model.qPatientsByParams.length;
//        form.lbSelectedCount.text = form.mgPatients.selected.length;
//    };
    
    
    form.btnSelAll.onActionPerformed = function(event) {
        if (form.mgPatients.selected.length === model.qAllPatientTreatmentsStatuses.length)
            form.mgPatients.clearSelection();
        else
            model.qAllPatientTreatmentsStatuses.forEach(function(aCursor) {
                form.mgPatients.select(aCursor);
            });
        form.lbSelectedCount.text = form.mgPatients.selected.length;
    };
    
    form.btnClearFilter.onActionPerformed = function(event) {
        form.mcWorkPlace.value = null;
        form.tfFirstName.text = null;
        form.tfSurname.text = null;
        form.mcTreatStatus.value = null;
        form.mdTreatStart.value = null;
        form.mdTreatEnd.value = null;
        
        form.btnApplyFilter.onActionPerformed();
    };
    
    function showTreatForm(aForm, aTreat) {
        aForm.setTreatment(aTreat);
        aForm.showModal();
    }
    
    form.mgTreats.onMouseClicked = function(event) {
        if (event.clickCount === 2) {
            var fmName = model.qUslugaById.findByKey(form.mgTreats.selected[0].usluga_id);
            var usl = model.qUslugaById.find(function(arElem) {
                return false//(arElem.usl_uslugi_id === usl);
            });
            
            fmName = fmName ? fmName.rep_form : null;
            if (!repForms[fmName]) {
                P.require([fmName], function() {
                    repForms[fmName] = new window[fmName]();
                    showTreatForm(repForms[fmName], form.mgTreats.selected[0]);
                });
            } else {
                showTreatForm(repForms[fmName], form.mgTreats.selected[0]);
            }
        }
    };

}
