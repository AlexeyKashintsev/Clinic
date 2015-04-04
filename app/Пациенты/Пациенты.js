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
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    model.requery();
    
    form.button1.onActionPerformed = function(event) {
        fmPatient.setParams(model.qPatientsByParams.cursor.man_patient_id);
        fmPatient.showModal(function(aResult) {
            if (aResult)
                model.qPatientsByParams.requery();
        });
    };
    form.button.onActionPerformed = function(event) {
        fmPatient.setParams(null);
        fmPatient.showModal(function(aResult) {
            if (aResult)
                model.qPatientsByParams.requery();
        });
        //model.qPatientsByParams.push({});
    };
    form.btnApply.onActionPerformed = function(event) {
        model.qPatientsByParams.params.company_id = form.mcWorkPlace.data;
        model.qPatientsByParams.params.firstname = form.mcWorkPlace.text;
        model.qPatientsByParams.params.surname = form.tfSurname.text;
        model.qPatientsByParams.requery();
    };
    
    model.qPatientsByParams.onRequeried = function(event) {
        form.lbPatientsCount.text = model.qPatientsByParams.length;
        form.lbSelectedCount.text = form.mgPatients.selected.length;
    };
    
    form.mgPatients.onMouseClicked = function(event) {
        if (event.clickCount === 2)
            form.button1.onActionPerformed();
        form.lbSelectedCount.text = form.mgPatients.selected.length;
    };
}
