/**
 * 
 * @author Mikhail
 */
function TreatmentDetailForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.setPatient = function (aPacientId){
        model.qTreatByPatient.params.patient_id = aPacientId;
        model.qTreatByPatient.requery();
    };
    
    model.requery(function () {
        
    });
    
}
