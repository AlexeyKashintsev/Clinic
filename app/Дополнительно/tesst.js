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
    
    form.view.lb = new P.Label("ляля");
    form.view.lb.visible = true;
    form.view.lb.width = 200;
    form.view.lb.height = 200;
    form.view.lb.top = 100;
    form.view.lb.left = 100;
    
    model.requery(function () {
        // TODO : place your code here
    });
    
}
