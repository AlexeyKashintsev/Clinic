/**
 * 
 * @author Алексей
 */
function PatientForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.setParams = function(aPatientId) {
        model.qPatientById.params.patient_id = aPatientId ? aPatientId : null;
        model.qPatientById.requery(function() {
            if (!aPatientId)
                model.qPatientById.push({});
        });
    };
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    // TODO : place your code here
    
    model.requery();
    
    form.ddSex.onValueChange = function(event) {
        model.qPatientById.cursor.sex_id = 
                model.qSex.cursor.man_sex_id;
    };

    
    form.btnSave.onActionPerformed = function(event) {
        model.save(function() {
            form.close(model.qPatientById.cursor.man_patient_id);
        });
    };
    form.btnCancel.onActionPerformed = function(event) {
        model.revert();
        form.close(false);
    };
}
