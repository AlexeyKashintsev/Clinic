/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatFinish() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var rObj = {};
    self.setData = function(aRObj) {
        rObj = aRObj;
        self.controller.finishBtn = true;
    };
    
    Object.defineProperty(self, 'nextData', {
        get: function() {
            return rObj;
        }
    });
    
    self.show = function (aPanel) {
        var cont = aPanel ? aPanel : self.container;
        if (cont) {
            cont.add(form.view, new P.Anchors(1, null, 1, 1, null, 1));
        } else 
            form.show();
    };
    
    self.doFinish = function(callback) {
        callback();
    };
    
}
