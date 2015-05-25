/**
 * 
 * @author minya92
 */
function LoaderProcessor() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
//    self.show = function () {
//        form.show();
//    };
    
     self.loader = function(aForm, aGrid, aQuery){
        //var lbLoad = new P.Label("Загрузка...");
        //var lbLoad = form.lbLoad;
        //lbLoad.icon = new P.Image() //Icon.load("icons/loader200x200.gif");
        
        var parent = aGrid.parent;
        form.lbLoad.height = 100;
        form.lbLoad.width = 100;
        parent.add(form.lbLoad);// (form.lbLoad, new P.Anchors (0,200,200,100,200,0));

        aGrid.visible = false;
        aQuery.requery(function(){
            aGrid.visible = true;
            parent.remove(form.lbLoad);
        });
    };
}
