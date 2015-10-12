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
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    model.requery();
    
    form.btnAdd.onActionPerformed = function(event) {
        var name =  prompt("Введите наименование результата");
        if(name){
            model.qResultsForm.push({                
                param_name : name
            });
            //model.save(function(){
            //    model.requery();
            //});
        }
    };
    form.btnDel.onActionPerformed = function(event) {
        if (confirm("Удалить? После удадения необходимо сохранение!"))
            model.qResultsForm.remove(model.qResultsForm.findByKey(form.mgResults.selected[0].usl_params_list_id));
            //model.qResultsForm.remove(model.qResultsForm.cursorPos);
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
        if (confirm("Удалить? После удадения необходимо сохранение!"))
            model.qResultsDefForm.remove(model.qResultsDefForm.findByKey(form.mgResultsDef.selected[0].usl_params_def_values_id));
        //model.qResultsDefForm.remove(model.qResultsDefForm.cursorPos);        
    };
    
        form.tfParamRezSearch.onValueChange = function() {
      model.qResultsForm.params.usl_find = form.tfParamRezSearch.text ? form.tfParamRezSearch.text : null;        
        model.qResultsForm.execute();  
    };
    form.button.onActionPerformed = function(event) {
       if (model.modified && confirm('Сохранить изменения'))
            model.save();
        form.close(form.mgResults.selected[0].usl_params_list_id);        
        //form.close(model.qResultsForm.cursor.usl_params_list_id);
    };
    form.btnSave.onActionPerformed = function(event) {
        model.save();
    };
    form.btnReq.onActionPerformed = function(event) {
        if (model.modified && confirm("Сохранить изменения?"))
            model.save(function () {
                model.requery();
            });
        else
            model.requery();
    };
    form.button1.onActionPerformed = function(event) {
        form.close();
    };
}
