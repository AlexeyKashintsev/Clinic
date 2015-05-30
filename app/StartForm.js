/**
 * 
 * @author Mikhail
 */
function StartForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        var um = new P.ServerModule("AutorizerModule");
        var formName = um.getStartForm(um.getUserRole());
        P.require([formName], function(){
            var f = new (eval(formName));
            f.show();
        });
    };
    
    
    
    model.requery(function () {
        // TODO : place your code here
    });
    
}
