/**
 * 
 * @author minya92
 */
function ContractPricesView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.model = model;
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    var fmUslSel;

    self.setContractId = function(aContractId) {
        model.qPricesByContract.params.contract_id = aContractId;
        //model.revert();
        model.requery();
    };
    
    form.btnAdd.onActionPerformed = function(event) {
        if (!fmUslSel)
            fmUslSel = new Uslugi4SelectView();
        fmUslSel.showModal(function(aUslId) {
            if (aUslId) {
                model.qPricesByContract.push({
                    usluga_id   :   aUslId,
                    contract_id :   model.qPricesByContract.params.contract_id
                });
            }
        });
    };
    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Удалить?")){
            model.qPricesByContract.remove(model.qPricesByContract.cursorPos);
        }
    };
    
    form.modelGrid.column.onSelect = function (evt){
        fmUslSel.showModal(function(aUslId) {
            if (aUslId) {
                model.qPricesByContract.cursor.usluga_id = aUslId;
            }
        });
    };
}
