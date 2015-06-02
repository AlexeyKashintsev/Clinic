/**
 * 
 * @author minya92
 */
function SelectPriceListView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.save = function() {
        model.save();
    };
    self.revert = function() {
        model.revert();
    };
    
    //Показывать только прайс листы
    model.qContracts.params.price = true;
    
    form.title = "Прайс листы все";
    model.qContracts.requery();
    
    self.setSelect = function(aSelect){
        form.btnSelect.visible = aSelect;
    };
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    self.setCompany = function(aCompanyId) {
        model.qContracts.params.comp_id = aCompanyId;
        model.revert();
        model.qContracts.requery();
    };
    
    //model.qContracts.execute();
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        var aName = prompt("Введите название:");
        if(aName) {
            model.qContracts.push({
                contr_name: aName,
                с_active: true,
                price: true,
                company_id: model.qContracts.params.comp_id
            });
        }
    };
    
    form.btnReq.onActionPerformed = function(event) {
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
            model.qContracts.requery();
        }
    };
    
    form.onWindowClosing = function(event) {
        if (model.modified&&confirm('Сохранить изменения?')){
            model.save();
        }
    };

    form.btnDel.onActionPerformed = function(event) {
        model.qContracts.remove(model.qContracts.cursorPos);
    };
    
    form.cbActive.onMouseClicked = function(event) {
        //alert(form.cbActive.value);
        if(form.cbActive.value)
            model.qContracts.params.c_act = true;
        else
            model.qContracts.params.c_act = null;
        model.qContracts.execute();
    };
    
    form.modelGrid.onMouseClicked = function(evt){
        if(evt.clickCount > 1){
            model.save(function() {
                //var contractDetailsView = new PricesByContract();
                var contractDetailsView = new ContractDetailsView();
                contractDetailsView.cancelSelectCompany();
                contractDetailsView.setContractID(model.qContracts.cursor.buh_contracts_id, model.qContracts.cursor.company_id);
                contractDetailsView.showModal(function(a){
                    model.qContracts.execute();
                });
            });
            //form.close(model.qContracts.cursor);
        }
    };
    
    form.btnSelect.onActionPerformed = function(event) {
        form.close({
            company_name : model.qAllFirms.cursor.company_name,
            contract_name: model.qContracts.cursor.contr_name,
            contract_id  : model.qContracts.cursor.buh_contracts_id
        });
    };
}
