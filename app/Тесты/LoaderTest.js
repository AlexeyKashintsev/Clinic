/**
 * 
 * @author minya92
 */
function LoaderTest() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    P.require(["Дополнительно/RequeryAnimate.js"]);
    var loaderProcessor;
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.button.onActionPerformed = function(event) {
        //if(!loaderProcessor) loaderProcessor = new LoaderProcessor();
        RequeryAnimate(form.modelGrid, model.qUslTypes);
    };
}
