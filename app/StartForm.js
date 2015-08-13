/**
 * 
 * @author Mikhail
 */
function StartForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        var um = new P.ServerModule("UserModule");
        var formName = um.getStartForm(um.getUserRole());
        if(formName){
            P.require([formName], function(){
                var f = new (eval(formName));
                f.show();
            }, function(er) {
                console.log('Error on require ' + er);
            });
        } else {
            alert('Нет анонимного доступа!');
//            P.logout(function(){
//                window.location.reload();
//            });
        }
    };
    
    
    
    model.requery(function () {
        // TODO : place your code here
    });
    
}
