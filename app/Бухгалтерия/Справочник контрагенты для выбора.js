/**
 * 
 * @author minya92
 */
function CompanySelectorView() {
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
    
    form.btnCancel.onActionPerformed = function(event) {
        form.close(false);
    };
    form.btnReq.onActionPerformed = function(event) {
        model.requery();
    };
    form.btnSelect.onActionPerformed = function(event) {
        form.close(model.qAllFirms.cursor.buh_companies_id);
    };
    form.btnReq1.onActionPerformed = function(event) {
        var companyCard = new CompanyCard();
        companyCard.addNewCompany();
        companyCard.showModal(function(a){
            model.requery();
        });
    };
}
