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
        P.Logger.info(c);
        var is = b.getInputStream();
        var f = [];
        var d = is.read(f,0,1);
        function a() {var b = c.request.getIt();
            for (var j in c)
                P.Logger.warning(j);
        }
        a();
        return 'ok!';
    };
}
