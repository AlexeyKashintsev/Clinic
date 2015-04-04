/**
 * 
 * @author Алексей
 * @public
 */

function ContractsByCompanyView_() {
    var self = this;
    var model = P.loadModel(this.constructor.name);
    var form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    model.requery(function () {
        // TODO : place your code here
        alert(1);
    });
    
    var fmContract;

//    self.setCompany = function(aCompanyId) {
//        model.qContracts.params.company_id = aCompanyId;
//        model.revert();
//        model.requery();
//    };

    function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
            model.requery();
        }
    }//GEN-LAST:event_btnReqActionPerformed

    function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (model.modified&&confirm('Сохранить изменения?')){
            model.save();
        }
    }//GEN-LAST:event_formWindowClosing
    
//    function addNewContract() {
//        if (!fmContract)
//            fmContract = new ContractDetailsView();
//        fmContract.setContractID(null, model.qContracts.params.company_id);
//        fmContract.showModal(function(aResult) {
//            if (aResult)
//                model.requery();
//        });
//    }

//    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
//        if (self.checkForUpdate) {
//            if (self.checkForUpdate()) 
//                addNewContract();
//        } else 
//            addNewContract();
//    }//GEN-LAST:event_btnAddActionPerformed
//
//    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
//        if (evt.clickCount > 1) {
//            if (!fmContract)
//                fmContract = new ContractDetailsView();
//            fmContract.setContractID(model.qContracts.cursor.buh_contracts_id);
//            fmContract.showModal(function(aResult) {
//                if (aResult)
//                    model.requery();
//            });
//        }
//    }//GEN-LAST:event_modelGridMouseClicked
    form.btnAdd.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnDel.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnReq.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
}