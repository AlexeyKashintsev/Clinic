/**
 * 
 * @author Алексей
 */
function TreatmentForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnSave.onActionPerformed = function(event) {
        model.save(function() {
            form.close(true);
        });
    };
    form.btnCancel.onActionPerformed = function(event) {
        model.revert();
        form.close();
    };
}
