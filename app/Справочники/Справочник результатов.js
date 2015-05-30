/**
 * 
 * @author Mikhail
 */
function ResultsForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    model.requery();
    
    form.btnAdd.onActionPerformed = function(event) {
        var name =  prompt("Введите наименование результата");
        if(name){
            model.qResultsForm.push({                
                param_name : name
            });
            model.save(function(){
                model.requery();
            });
        }
    };
    form.btnDel.onActionPerformed = function(event) {
        if (confirm("Удалить?"))
        model.qResultsForm.remove(model.qResultsForm.cursorPos);
    }; 
    form.btnAdd1.onActionPerformed = function(event) {
        var name =  prompt("Введите имя параметра");
        if(name){
            model.qResultsDefForm.push({
                param_id : model.qResultsForm.cursor.usl_params_list_id,
                params_value : name
            });
            model.save();
        }
    };
    form.btnDel1.onActionPerformed = function(event) {
        if (confirm("Удалить? Данная операция необратима!"))
        model.qResultsDefForm.remove(model.qResultsDefForm.cursorPos);
    };
}
