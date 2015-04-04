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
    
    // TODO : place your code here
    
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
