/**
 * 
 * @author minya92
 */
function ContractPricesView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnDel.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
}
