/**
 * @public
 * @author Mikhail
 * @module
 */ 
function AutorizerModule() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    var roles = {
        0: "admin",
        1: "buh",
        2: "reg",
        3: "prof"
    };
    
    var forms = {
        0: "MainView",
        1: "BuhView",
        2: "RegView",
        3: "ProfView"
    };
        
    self.getUserRole = function (){
        for(var i in roles){
            if (P.principal.hasRole(roles[i])){
                return roles[i];
            }
        }
        return false;
    };
    
    self.getStartForm = function(aRole){
        P.Logger.warning(P.principal.name);
        if(!aRole) aRole = self.getUserRole();
        for(var i in roles){
            //P.Logger.warning(aRole);
            if(roles[i] == aRole)
                return forms[i];
        }
        return false;
    };
    
}
