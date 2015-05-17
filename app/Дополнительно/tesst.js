/**
 * 
 * @author minya92
 */
function tesst() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    var testLB = new P.Label("ляля");
    form.panel.add(testLB, new P.Anchors(20,20,20,20,20,20));
//    testLB.visible = true;
//    testLB.width = 50;
//    testLB.height = 50;
//    testLB.top = 100;
//    testLB.left = 100;
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.button.onActionPerformed = function(event) {
        var a = 3;
    };
}
