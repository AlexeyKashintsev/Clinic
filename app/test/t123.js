/**
 * 
 * @author minya92
 */
function t123() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    var a = [
        {id: "1", parent:"0", name:"p"},
        {id: "2", parent:"1", name:"ch1"},
        {id: "3", parent:"1", name:"ch2"}
    ];
//    a.parent = "parent";
//    a.children = "id";
    form.modelGrid.data = a;
    
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
}
