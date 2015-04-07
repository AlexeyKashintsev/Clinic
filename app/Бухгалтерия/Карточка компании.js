/**
 * 
 * @author Алексей
 */
function CompanyCard() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Карточка компании";
    
    self.show = function () {
        DESKTOP ? form.showInternalFrame(DESKTOP) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    var fmContracts = new ContractsByCompanyView();
    fmContracts.showOnPanel(form.pnlContracts);
    
    self.setCompany = function(aCompanyID) {
        if (aCompanyID) {
            model.qAllFirms.params.company_id = aCompanyID;
            model.requery();
            fmContracts.setCompany(aCompanyID);
        } else {
            model.revert();
            model.requery();
            self.addNewCompany();
        }
    };
    
    self.addNewCompany = function() {
        model.qAllFirms.push({});
        fmContracts.setCompany(model.qAllFirms.cursor.buh_companies_id);
        fmContracts.checkForUpdate = function() {
            if (model.modified) {
                if (confirm('Сохранить изменения?')) {
                    model.save();
                    return true;
                } else
                    return false;
            } 
            fmContracts.checkForUpdate = false;
            return true;
        };
    };

    form.btnSave.onActionPerformed = function(event) {
        model.save();
        fmContracts.save();
        form.close(true);
    };
    form.btnCancel.onActionPerformed = function(event) {
        model.revert();
        fmContracts.revert();
        form.close();
    };
}
