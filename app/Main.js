/**
 * 
 * @author Алексей
 */
function Main() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    var modUslugi = new ModelUslugi();
    
    form.grdUslugi.data = modelUslugi.model.qUslugiByType;
    
    model.requery(function () {
        // TODO : place your code here
    });
    
}
