/**
 * 
 * @author minya92
 */
function CompaniesList() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Справочник контрагенты";
    
    self.show = function () {
        if(DESKTOP){
            form.showInternalFrame(DESKTOP);
            form.button.visible = false;
        } else
            form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    var fmCompany;
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        var aName = prompt("Введите наименовние:");
        if(aName){
            model.qAllFirms.push({
                company_name: aName
            });
        }
    };
    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Удалить компанию?")){
            model.qAllFirms.remove(model.qAllFirms.cursorPos);
        }
    };
    form.btnReq.onActionPerformed = function(event) {
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
            model.requery();
        }
    };
    form.btnSave.onActionPerformed = function(event) {
        if (model.modified&&confirm('Сохранить изменения?')){
            model.save(function(){
                model.requery();
            });
        }
    };
    
    form.modelGrid.onMouseClicked = function(evt) {
        if (evt.clickCount > 1) {
            form.btnEdit.onActionPerformed();
        }
    };

    form.button.onActionPerformed = function(event) {
        model.save(function(){
            form.close({
                id: model.qAllFirms.cursor.buh_companies_id,
                name: model.qAllFirms.cursor.company_name
            });
        });
    };
    
    form.btnEdit.onActionPerformed = function(event) {
        model.save(function(){
            if (!fmCompany)
                fmCompany = new CompanyCard;
            fmCompany.setCompany(model.qAllFirms.cursor.buh_companies_id);
            fmCompany.showModal(function(a){
                model.qAllFirms.requery(function(){
                    model.requery();
                });
            });
        });
    };

    form.mfSearch.onValueChange = function(event) {
        model.qAllFirms.params.company_find = form.mfSearch.text;
        model.requery();
    };

}
