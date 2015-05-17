/**
 * @public
 * @author minya92
 */
function UslTypesView() {
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
    
    form.btnReq.onActionPerformed = function(evt) {
        if (!model.modified || confirm('Изменения будут потеряны.\nЗагрузить новые данные?')) {
            model.requery();
        }
    };

    form.btnSave.onActionPerformed = function(evt) {
        model.save();
    };
    
    form.onWindowClosing = function(evt) {
        if (model.modified&&confirm('Сохранить изменения?')){
            model.save();
        }
    };

    form.btnDel.onActionPerformed = function(event) {
        if (model.qUslTypes.cursor.usl_types_id) {
            if (confirm('Внимание! Так же будут удалены услуги с данным типом!\nУдалить данный тип услуги?')) {
                model.qUslTypes.delete();//.remove(model.qUslTypes.cursorPos);
            };
        } else {
            alert('Невозможно удалить данный тип услуг!');
        }
    };
    form.btnAddParent.onActionPerformed = function(event) {
        var newUslName = prompt('Название нового типа услуги');
        if (newUslName)
            model.qUslTypes.push({
                type_name   :   newUslName,
                type_parent :   
                        model.qUslTypes.cursor.usl_types_id !== 0 ? model.qUslTypes.cursor.usl_types_id : null
            });
    };
    form.btnAdd.onActionPerformed = function(event) {
        var newUslName = prompt('Название нового типа услуги');
        if (newUslName)
            model.qUslTypes.push({
                type_name   :   newUslName,
                type_parent :   
                        model.qUslTypes.cursor.type_parent !== 0 ? model.qUslTypes.cursor.type_parent : null
            });
    };
    
}
