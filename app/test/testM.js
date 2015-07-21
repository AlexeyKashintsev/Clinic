/**
 * 
 * @author alexey
 * @constructor
 * @public
 */ 
function testM() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.test = function(aInput) {
        var c = new P.HttpContext();
        return 'response:' + c.request.body;
    };
}
