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
    
    var editRole = new EditRoleForm();
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Вы уверены что хотите удалить данного пользователя?\nЭту операцию НЕЛЬЗЯ отменить!")){
            model.qDelUser.params.usr_name = model.qUsers.cursor.usr_name;
            model.qDelUser.execute(function(){}, function(){
                model.requery();
            })
        }
    };
    form.btnEdit.onActionPerformed = function(event) {
        editRole.setUser(model.qUsers.cursor.usr_name, model.qUsers.cursor.group_name);
        editRole.showModal(function(a){
            model.requery();
        });
    };
    
    form.btnReq.onActionPerformed = function(event) {
        model.requery();
    };
    
    form.btnAdd.onActionPerformed = function(event) {
        var login = prompt("Введите логин пользователя:");
        if(login){
            model.qUsers.push({
                usr_name: login
            });
            form.btnPass.onActionPerformed();
        }
    };

    form.btnPass.onActionPerformed = function(event) {
        var pass = prompt("Введите новый пароль:");
        if(pass){
            model.qUsers.cursor.usr_passwd = P.MD5.generate(pass);
            model.save(function(){
                alert("Пароль успешно изменен!");
            });
        }
    };
    form.btnSave1.onActionPerformed = function(event) {
        model.save();
    };
    form.btnCancel.onActionPerformed = function(event) {
        form.close();
    };
}