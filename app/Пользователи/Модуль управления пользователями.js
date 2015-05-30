/**
 * @author minya92
 * @public
 * @module
 */ 
function UserModule____() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.getUserRole = function(){
        P.Logger.warning(P.principal.hasRole("admin"));
    };
    //var adminFunctions = new _AdminFunctions();

    //TODO сделать проверку может ли пользователь создавать пользователя с такой ролью    
    self.createUser = function(anUserName, aPasswordMD5, aRoleName, anEmail, aPhone){
        model.params.user_role = aRoleName;
        model.usersByName.insert();
        model.usersByName.usr_name = anUserName;
        model.usersByName.usr_passwd = aPasswordMD5;
        model.usersByName.usr_form = model.queryRoles.role_form;
        model.usersByName.usr_email = anEmail ? anEmail : null;
        model.usersByName.usr_phone = aPhone;
        model.save();
        addRole(anUserName, aRoleName);
    };
  
    /*
     * 
     */
    self.editUser = function(anUserName, aEmail, aPhone){
        model.params.user_name = anUserName;
        model.usersByName.usr_email = aEmail;
        model.usersByName.usr_phone = aPhone;
        model.save();
    };
    
    function addRole(anUserName, aRoleName){
        model.qUserAddRole.params.usr_name = anUserName;
        model.qUserAddRole.params.usr_role = aRoleName;
        model.qUserAddRole.executeUpdate();
    }
    
    self.setPassword = function(anUserName, aNewPasswordMD5) {
        model.params.user_name = anUserName;
        model.usersByName.usr_passwd = aNewPasswordMD5;
        model.save();
    };
    
    self.checkIfLoginExists = function(aLogin) {
        model.params.user_name = aLogin;
        model.usersByName.params.phone = null;
        if (model.usersByName.length > 0){
            return true;
        } else return false;
    };
    
    self.checkIfPhoneExists = function(aPhone) {
        model.params.user_name = null;
        model.usersByName.params.phone = aPhone;
        if (model.usersByName.length > 0){
            return true;
        } else return false;
    };
}
