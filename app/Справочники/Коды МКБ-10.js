/**
 * 
 * @author minya92
 */
function MkbDeseasesForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
//    model.requery(function () {
//        //if (!model.qMkbClasses.cursor.mkb_classes_id) model.qMkbDeseases.params.mkb_class = 12;
//        //if (model.qMkbDeseases.params.mkb_class || model.qMkbDeseases.params.mkb_find)
//            
//    });

    model.qMkbClasses.requery();
    
    form.button.onActionPerformed = function(event) {
        if (model.modified && confirm('Сохранить изменения'))
            model.save();
        form.close(form.mgDeseases.selected[0].mkb_deseases_id);
    };
    
    form.tfDeseasesSearch.onValueChange = function() {
      model.qMkbDeseases.params.mkb_find = form.tfDeseasesSearch.text ? form.tfDeseasesSearch.text : null;        
        model.qMkbDeseases.execute();  
    };
    
    model.qMkbClasses.onScrolled = function(event) {
      model.qMkbDeseases.params.mkb_class = model.qMkbClasses.cursor.mkb_classes_id;
      model.qMkbDeseases.params.mkb_find = form.tfDeseasesSearch.text ? form.tfDeseasesSearch.text : null;
      model.qMkbDeseases.execute();  
    };    
        
    form.modelCheckBox.value = true;
    
    form.modelCheckBox.onActionPerformed = function(event) {
        model.qMkbDeseases.requery();
    };

}
