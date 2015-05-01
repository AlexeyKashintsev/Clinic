/**
 * 
 * @author minya92
 */
function HazardForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var fmHazardContent;
        
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    self.getHazardName = function(aHazardId) {
       return model.qHazards.findByKey(aHazardId).haz_short_name;
    };
    
    form.tfHazardSearch.onValueChange = function() {
        model.qHazards.params.hazard_find = form.tfHazardSearch.text;
        model.qHazards.execute();
    };
    
    form.modelCombo.onValueChange = function() {
        model.qHazards.params.hazard_type = form.modelCombo.value.hazard_types_id;
        model.qHazards.execute();
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.button.onActionPerformed = function(event) {
        form.close(model.qHazards.cursor.hazards_id);
    };
    
    form.btnReq.onActionPerformed = function(event) {
        if(model.modified && confirm("Сохранить изменения?")) 
            model.save(function(){
                model.requery();
            });
        else
            model.requery();
    };
    
    form.btnContents.onActionPerformed = function(event) {
        if (model.qHazards.cursor.hazards_id) {
            if (!fmHazardContent)
                fmHazardContent = new HazardContent();
            fmHazardContent.setHazard(model.qHazards.cursor.hazards_id);
            fmHazardContent.showModal();
        }
    };
    
   form.onWindowClosing = function(event) {
       if (model.modified && confirm('Сохранить изменения?')) {
           model.save();
        }
   };

}
