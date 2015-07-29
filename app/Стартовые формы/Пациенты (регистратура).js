/**
 * 
 * @author Алексей
 */
function PatientsForm() {
    var params = {
        firstname : null
    };
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var fmPatient = new PatientForm();
    var treatWizard, fmDataLoader;
    var fmTreatmentDetail = new TreatmentDetailForm();
    
    model.requery(function(){
        fmTreatmentDetail.setPatient(model.qPatientsByParams.cursor.man_patient_id);
        fmTreatmentDetail.showOnPanel(form.pnlObr);
    });
    
    model.qPatientsByParams.onScrolled = function(event) {
        fmTreatmentDetail.setPatient(model.qPatientsByParams.cursor.man_patient_id);
    };

    
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
        fmPatient.setParams(model.qPatientsByParams.cursor.man_patient_id);
        fmPatient.showModal(function(aResult) {
            if (aResult){
                model.qPatientsByParams.requery();
                model.qAllFirms.requery();
            }
        });
    };
    form.btnAddPatient.onActionPerformed = function(event) {
        fmPatient.setParams(null);
        fmPatient.showModal(function(aResult) {
            if (aResult)
                model.qPatientsByParams.requery();
        });
        //model.qPatientsByParams.push({});
    };
    
    form.btnApplyFilter.onActionPerformed = function(event) {
        model.qPatientsByParams.params.company_id = form.mcWorkPlace.value ? 
                form.mcWorkPlace.value.buh_companies_id : null;
        model.qPatientsByParams.params.firstname = form.tfFirstName.text;
        model.qPatientsByParams.params.surname = form.tfSurname.text;
        model.qPatientsByParams.params.treat_status = form.mcTreatStatus.value ? form.mcTreatStatus.value[0] : null;
        model.qPatientsByParams.params.start_date = form.mdTreatStart.value;
        model.qPatientsByParams.params.end_date = form.mdTreatEnd.value;
        
        model.qPatientsByParams.requery();
    };
    
    model.qPatientsByParams.onRequeried = function(event) {
        form.lbPatientsCount.text = model.qPatientsByParams.length;
        form.lbSelectedCount.text = form.mgPatients.selected.length;
    };
    
    form.mgPatients.onMouseClicked = function(event) {
        if (event.clickCount === 2)
            form.btnEditPatient.onActionPerformed();
        form.lbSelectedCount.text = form.mgPatients.selected.length;
    };
    form.btnSelAll.onActionPerformed = function(event) {
        if (form.mgPatients.selected.length === model.qPatientsByParams.length)
            form.mgPatients.clearSelection();
        else
            model.qPatientsByParams.forEach(function(aCursor) {
                form.mgPatients.select(aCursor);
            });
        form.lbSelectedCount.text = form.mgPatients.selected.length;
    };
    
    form.btnAddTreat.onActionPerformed = function(event) {
        if (form.mgPatients.selected.length > 0)
            if (!treatWizard) {
//                P.require(['TreatWizard'], function() {
                    treatWizard = new TreatWizard();
                    form.btnAddTreat.onActionPerformed();
//                });
            } else {
                treatWizard.showWizard({patients: form.mgPatients.selected});
            }
        else
            alert('Необходимо выбрать хотя бы одного пациента!');
                
    };
    form.btnAddTreat1.onActionPerformed = function(event) {
        if(confirm("Выйти из системы?")){
            P.logout(function(){
                window.location.reload();
            });
        }
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
    form.btnLoadData.onActionPerformed = function(event) {
        if (!fmDataLoader)
            fmDataLoader = new DataLoader();
        fmDataLoader.showModal();
    };
}
