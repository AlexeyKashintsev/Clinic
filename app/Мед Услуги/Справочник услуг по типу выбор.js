/**
 * 
 * @author minya92
 */
function Uslugi4SelectView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Выбор услуги";
    
    self.show = function () {
        form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    model.qUslTypes.onScrolled = function(){
        model.qUslugiByType.params.usl_type = model.qUslTypes.cursor.usl_types_id;
        model.qUslugiByType.requery();
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnReq.onActionPerformed = function(event) {
        if(model.modified)
            if(confirm("Сохранить изменения?"))
                model.save(function(){
                    model.requery();
                });
            else
                model.requery();
    };
    
    form.btnSave.onActionPerformed = function(event) {
        model.save();
    };
    
    form.button.onActionPerformed = function(event) {
        // TODO Добавьте карточку услуги!!!
    };
    
    form.btnAdd.onActionPerformed = function(event) {
        var uslName = prompt("Введите название новой услуги:");
        if(uslName){
            model.qUslugiByType.push({
                usl_type: model.qUslTypes.cursor.usl_types_id,
                usl_name: uslName
            });
        }
    };
    
    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Удалить выбранную услугу?")){
            model.qUslugiByType.remove(model.qUslugiByType.cursorPos); // deleteRow();
        }
    };
    
    form.btnCancel.onActionPerformed = function(event) {
        form.close(true);
    };
    
    form.btnSelect.onActionPerformed = function(event) {
        form.close(model.qUslugiByType.cursor.usl_uslugi_id); //return usl_id
    };
}
