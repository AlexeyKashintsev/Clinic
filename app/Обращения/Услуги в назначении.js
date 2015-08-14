/**
 * 
 * @author Алексей
 */
function AppointmentUslugi() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.setTreat = function(aTreatId) {
        model.qUslInTreat.params.treatId = aTreatId;
        model.qUslInTreat.execute();
    };
    
    form.btnAdd.onActionPerformed = function(event) {
        //TODO Добавление услуги
    };
    form.button1.onActionPerformed = function(event) {
        form.close();
    };
    form.btnSave.onActionPerformed = function(event) {
      model.save();
    };
}
