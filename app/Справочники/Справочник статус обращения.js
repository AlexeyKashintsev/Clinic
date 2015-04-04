/**
 * 
 * @author minya92
 */
function ObrStatusForm() {
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
    
    form.btnAdd.onActionPerformed = function(event) {
        model.qObrStatus.push({});
    };
    
    form.btnDel.onActionPerformed = function(event) {
        if (confirm("Удалить?"))
        model.qObrStatus.remove(model.qObrStatus.cursorPos);
    };
    form.btnReq.onActionPerformed = function(event) {
        if(model.modified && confirm("Сохранить изменения?")) 
            model.save(function(){
                model.requery();
            });
        else
            model.requery();        
    };
    form.btnSave.onActionPerformed = function(event) {
        model.save(function(){
                model.requery();
            });
    };
    form.button.onActionPerformed = function(event) {
        form.close(model.qObrStatus.cursor.obr_status_id);
    };
}
