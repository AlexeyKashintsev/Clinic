/**
 * 
 * @author Mikhail
 */
function EditRoleForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var INSERT = false;
    var USER;
    self.show = function () {
        form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    self.setUser = function(aUser, aRole){
        if(!aRole) INSERT = true;
        else INSERT = false;
        USER = aUser;
        form.title = USER;
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.button.onActionPerformed = function(event) {
        if(INSERT){
            model.qUserAddRole.params.usr_name = USER;
            model.qUserAddRole.params.usr_role = model.qRoles.cursor.role_name;
            model.qUserAddRole.execute(function(){}, function(){
                form.close(true);   
            });
        } else {
            model.qUserEditRole.params.usr_name = USER;
            model.qUserEditRole.params.usr_role = model.qRoles.cursor.role_name;
            model.qUserEditRole.execute(function(){}, function(){
                form.close(true);   
            });
        }
        form.close(true);    
    };

}
