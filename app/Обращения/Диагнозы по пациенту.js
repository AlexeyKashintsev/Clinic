/**
 * 
 * @author Mikhail
 */
function DiagnosesForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    self.setPacient = function(id){
        model.qDiagnosesPacient.params.pacient_id = id;
    };
}
