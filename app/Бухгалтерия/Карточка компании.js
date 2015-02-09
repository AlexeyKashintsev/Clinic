/**
 * 
 * @author Алексей
 */
function CompanyCard() {
    var self = this, model = this.model, form = this;
    
    self.setCompany = function(aCompanyID) {
        model.qAllFirms.params.company_id = aCompanyID;
        model.requery();
    }
}
