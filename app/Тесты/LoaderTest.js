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
    P.require(["Дополнительно/LoaderProcessor.js"]);
    var loaderProcessor;
    // TODO : place your code here
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.button.onActionPerformed = function(event) {
        //if(!loaderProcessor) loaderProcessor = new LoaderProcessor();
        LoaderProcessor(form.modelGrid, model.qUslTypes);
    };
    form.button1.onActionPerformed = function(event) {
        var lbLoad = new P.Label(null);
    
//        P.require("icons/loader200x200.gif", function(aResource) {
//            console.log(aResource);
//        });
        lbLoad.width = 100;
        lbLoad.height = 100;
        P.Icon.load("icons/loader200x200.gif", );
        form.pnlTest.add(lbLoad, new P.Anchors ('0', 0,'100%',1,'100%','100%'));
        
        
    };
}
