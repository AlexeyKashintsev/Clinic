/**
 * 
 * @author Mikhail
 */
function BuhIinshuranceCompanyForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        model.qBuh_inshurance_company.push({});
    };
    form.btnDel.onActionPerformed = function(event) {
        if (confirm("Удалить?"))
        model.qBuh_inshurance_company.remove(model.qBuh_inshurance_company.cursorPos);
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
        form.close(model.qBuh_inshurance_company.cursor.buh_inshurance_company_id);
    };
}
