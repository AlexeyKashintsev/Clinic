/**
 * 
 * @author minya92
 */
function ContractsByCompanyView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    self.model = model;
    
    form.title = "Договора по компании";
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.setCompany = function(aCompanyId) {
        model.qContracts.params.comp_id = aCompanyId;
        model.revert();
        model.requery();
    };
    
    model.qContracts.execute();
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    
    form.btnReq.onActionPerformed = function(event) {
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
            model.requery();
        }
    };
    
    form.onWindowClosing = function(event) {
        if (model.modified&&confirm('Сохранить изменения?')){
            model.save();
        }
    };

}
