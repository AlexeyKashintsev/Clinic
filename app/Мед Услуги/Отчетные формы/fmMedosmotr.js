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
    
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    self.setTreatment = function(aTreat) {
        model.qTreatById.params.treat_id = aTreat.obr_treatment_id;
        model.qTreatById.requery(function() {
            
        });
        patient.getPatientAsync(aTreat.patient, function(aPatient) {
            form.tfSurname.data = aPatient;
            form.tfName.data = aPatient;
            form.tfPatronymic.data = aPatient;
            form.ddSex.data = aPatient;
            form.mdDateOfBirth.data = aPatient;
        });
    };
}
