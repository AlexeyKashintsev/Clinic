/**
 * 
 * @author alexey
 * @constructor
 * @public
 */ 
function testM() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.test = function(anInput) {
//        var c = new P.HttpContext();
//        var response = decodeURIComponent(c.request.body);
//        var json = JSON.parse(response);
        return 'response:' + response;
    };
    
    self.testDB = function(callback, failure) {
        model.qTestWrite.push({a: '1'});
        model.save(callback, failure);
    };
}
