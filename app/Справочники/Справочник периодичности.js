/**
 * 
 * @author minya92
 */
function UslPeriodForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
         model.qUslPeriod.push({});
    };
    form.btnDel.onActionPerformed = function(event) {
        if (confirm("Удалить?"))
            model.qUslPeriod.splice(model.qUslPeriod.indexOf(form.modelGrid.selected[0]), 1);
        //model.qUslPeriod.remove(model.qUslPeriod.cursorPos);
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
                //model.requery();
            });
    };
    form.button.onActionPerformed = function(event) {
        form.close(model.qUslPeriod.cursor.usl_period_id);
    };
}
