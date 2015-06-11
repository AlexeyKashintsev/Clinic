/**
 * 
 * @author Mikhail
 */
function TabNazn() {
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
    
    self.setData = function(aData){
        model.qNaznach.params.treatId = aData;
        model.qNaznach.requery();
    };
   
    form.btnChangeStatus.onActionPerformed = function(event) {
        var selectStatusForm = new SelectStatusForm();
        selectStatusForm.showModal(function(a){
            if(a){
                model.qNaznach.forEach(function(row) {
                    row.route_status = a;
                });
                model.save();
            }
        });
    };
    
    form.btnSave.onActionPerformed = function(event) {
        model.save();
    };
}
