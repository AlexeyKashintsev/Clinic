/**
 * 
 * @author minya92
 */
function CompaniesList() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Справочник компании";
    
    self.show = function () {
        form.show();
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
            model.save();
        }
    };
    
    form.modelGrid.onMouseClicked = function(evt) {
        if (evt.clickCount > 1) {
            if (!fmCompany)
                fmCompany = new CompanyCard;
            fmCompany.setCompany(model.qAllFirms.cursor.buh_companies_id);
            fmCompany.showModal(function(a){
                model.qAllFirms.requery(function(){
                    model.requery();
                });
            });
        }
    };

}
