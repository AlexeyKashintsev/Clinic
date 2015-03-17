/**
 * 
 * @author Алексей
 * @public
 */

function UsersView() {
    var self = this
        , model = P.loadModel(this.constructor.name)
        , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Пользователи";
    
    self.show = function () {
        form.show();
    };
    form.btnDel.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnEdit.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnSave.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnReq.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
    form.btnAdd.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
}