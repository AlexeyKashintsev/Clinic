/* global P */

/**
 * 
 * @author Алексей
 * {global P}
 */
function fmMedosmotr() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var patient = new Patient();
    
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
    
    model.requery();
    
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    self.setTreatment = function(aTreat) {
        model.qTreatById.params.treat_id = aTreat.obr_treatment_id;
        model.qNaznach.params.treatId = aTreat.obr_treatment_id;
        model.qTreatById.requery();
        model.qNaznach.requery();
        
        patient.getPatientAsync(aTreat.patient, function(aPatient) {
            form.tfSurname.data = aPatient;
            form.tfName.data = aPatient;
            form.tfPatronymic.data = aPatient;
            form.tfSex.data = aPatient;
            form.mdDateOfBirth.data = aPatient;
            
            form.tfSurname.field = 'surname';
            form.tfName.field = 'firstname';
            form.tfPatronymic.field = 'patronymic';
            form.tfSex.field = 'sex';
            form.mdDateOfBirth.field = 'date_oft_birth';
            
            form.mgHazards.data = aPatient.hazards;
            form.mgHazards.colHazardCode.field = 'haz_code';
            form.mgHazards.colHazardName.field = 'haz_short_name';
        });
    };
}
