/**
 * 
 * @author mike
 */
function UserCreateAndEditForm() {
    var self = this, model = this.model, form = this;
    var adminFunctions = new ServerModule("AdminFunctions");
    var changePassView = new ChangePassView();
    var userModule = new ServerModule("UserModule");
    
    var userNew = false;
    var validateLogin = false;
    var validatePass = false;

    
    self.setUserName = function(aUserName){
        model.params.user_name = aUserName;
    };  

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        if (userNew) { //Если создан новый пользователь...
            var roleName = model.params.role_name;
            
            userModule.createUser(form.tfLogin.text, adminFunctions.MD5(form.tfPass.text), 
                                  roleName, form.tfEmail.text, form.tfPhone.text);
            model.save(function(){
                form.close(true);
            });
        } else {
            userModule.editUser(form.tfLogin.text, form.tfEmail.text, form.tfPhone.text);
            form.close(true);
        }
    }//GEN-LAST:event_btnSaveActionPerformed

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        form.lbInfo.text = "";
        if(model.params.user_name){
            model.usersByNameReadonly.requery(function(){
                userNew = false; //говорим что это не новый пользователь
                form.tfLogin.enabled = false;
                form.tfLogin.text = model.usersByNameReadonly.cursor.usr_name;
                form.tfPass.text = "Сменить пароль";
                form.tfEmail.text = model.usersByNameReadonly.cursor.usr_email;
                form.tfPhone.text = model.usersByNameReadonly.cursor.usr_phone;
                model.params.role_name = model.usersByNameReadonly.cursor.group_name;
            });      
        } else {
            //очищаем поля и разрешаем редактировать
            userNew = true; //Говорим что создаем нового пользователя
            form.tfLogin.text = "";
            form.tfLogin.enabled = true;
            form.tfPass.text = "";
            form.tfPhone.text ="";
            form.tfEmail.text ="";
            form.tfPass.enabled = true;           
            form.btnSave.enabled = true;
        }
    }//GEN-LAST:event_formWindowOpened

    function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
        model.requery();
    }//GEN-LAST:event_formWindowClosed

    function tfPassMouseClicked(evt) {//GEN-FIRST:event_tfPassMouseClicked
        
        if(model.params.user_name && !form.tfLogin.enabled){
            changePassView.setUserName(model.params.user_name);
            changePassView.showModal(function(){
                model.requery();
            });
        }
    }//GEN-LAST:event_tfPassMouseClicked

    function ValidateForm(){
        if(validateLogin && validatePass){
            ChangeStateElements(true);
        } else ChangeStateElements(false);
    }
    
    function ChangeStateElements(state) {
        form.btnSave.enabled = state;
        form.tfEmail.enabled = state;
        form.tfPhone.enabled = state;
        form.tfFIO.enabled = state;
        form.tfAdress.enabled = state;
        form.tfAdditional.enabled = state;
    }
    
    function tfLoginFocusLost(evt) {//GEN-FIRST:event_tfLoginFocusLost
        if(userModule.checkIfLoginExists(form.tfLogin.text)){
                form.lbInfo.text = "Логин уже занят!";
                form.lbInfo.foreground = Color.RED;
                model.params.user_name = null;
                validateLogin = false;
            } else {
                form.lbInfo.text = "Логин свободен!";
                form.lbInfo.foreground = new Color("#2F7F39");
                validateLogin = true;
            }
          ValidateForm(); 
    }//GEN-LAST:event_tfLoginFocusLost

    function tfPassKeyPressed(evt) {//GEN-FIRST:event_tfPassKeyPressed
        if(form.tfPass.text.length < 5){
            form.lbPass.text = "Пароль меньше 5 символов!";
            form.lbPass.foreground = Color.RED;
            validatePass = false;
        } else {
            form.lbPass.text = "";
            validatePass = true;
        }
        ValidateForm();
    }//GEN-LAST:event_tfPassKeyPressed
    /**
    * @rolesAllowed barista
    */   
    function btnCancelActionPerformed(evt) {//GEN-FIRST:event_btnCancelActionPerformed
        form.close();
    }//GEN-LAST:event_btnCancelActionPerformed

    function tfLoginKeyPressed(evt) {//GEN-FIRST:event_tfLoginKeyPressed
//        Асинхронный код
//        
//        userModule.checkLogin(form.tfLogin.text, function(aResult){
//            if(!aResult){
//                form.lbInfo.text = "Логин уже занят!";
//                form.lbInfo.foreground = Color.RED;
//                model.params.user_name = null;
//                validateLogin = false;
//            } else {
//                form.lbInfo.text = "Логин свободен!";
//                form.lbInfo.foreground = new Color("#2F7F39");
//                validateLogin = true;
//            }
//            ValidateForm();            
//        });
    }//GEN-LAST:event_tfLoginKeyPressed
    
    function validateEmail(){
        var re = /.+@.+\..+/i;
        if (re.test(form.tfEmail.text)){
            return true;
        } else return false;
    }

    function tfEmailFocusLost(evt) {//GEN-FIRST:event_tfEmailFocusLost
    }//GEN-LAST:event_tfEmailFocusLost

    function tfEmailKeyPressed(evt) {//GEN-FIRST:event_tfEmailKeyPressed
    }//GEN-LAST:event_tfEmailKeyPressed

    function tfPhoneFocusLost(evt) {//GEN-FIRST:event_tfPhoneFocusLost
    }//GEN-LAST:event_tfPhoneFocusLost

    function tfPhoneKeyPressed(evt) {//GEN-FIRST:event_tfPhoneKeyPressed
    }//GEN-LAST:event_tfPhoneKeyPressed

    function tfEmailKeyReleased(evt) {//GEN-FIRST:event_tfEmailKeyReleased
        if (validateEmail()){
            form.lbEmail.text = '';
        } else {
            form.lbEmail.text = 'Email некорректен';
            form.btnSave.enabled = false;
        }
        if (validateEmail() && validatePhone()) form.btnSave.enabled = true;
    }//GEN-LAST:event_tfEmailKeyReleased

    function validatePhone(){
        var re = /^\8\d{10}$/i;
        if (re.test(form.tfPhone.text)){
            return true;
        } else return false;
    }

    function tfPhoneKeyReleased(evt) {//GEN-FIRST:event_tfPhoneKeyReleased
        if (validatePhone()){
            form.lbPhone.text = '';
        } else {
            form.lbPhone.text = 'Номер телефона некорректен';
            form.btnSave.enabled = false;
        }
        if (validateEmail() && validatePhone()) form.btnSave.enabled = true;
    }//GEN-LAST:event_tfPhoneKeyReleased

    function tfPhoneActionPerformed(evt) {//GEN-FIRST:event_tfPhoneActionPerformed
    }//GEN-LAST:event_tfPhoneActionPerformed
}
