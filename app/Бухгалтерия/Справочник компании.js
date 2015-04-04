/**
 * 
 * @author minya92
 */
function CompaniesList() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    var fmCompany;
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnDel.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnReq.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnSave.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    
    form.modelGrid.onMouseClicked = function(evt) {
        if (evt.clickCount > 1) {
            if (!fmCompany)
                fmCompany = new CompanyCard;
            fmCompany.setCompany(model.qAllFirms.cursor.buh_companies_id);
            fmCompany.show();
        }
    };

}
