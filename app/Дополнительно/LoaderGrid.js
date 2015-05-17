/**
 * @public
 * @author minya92
 * @constructor
 */ 
function LoaderGrid() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    /*
     * 
     */
    self.loader = function(aForm, aGrid, aQuery){
        var lbLoad = new P.Label("Загрузка...");
        //lbLoad.icon = new P.Icon.load("icons/loader200x200.gif");
        var parent = aGrid.parent;
        parent.add(lbLoad, new P.Anchors(100,100,100,100,100,100));

        aGrid.visible = false;
        aQuery.requery(function(){
            aGrid.visible = true;
            lbLoad.visible = false;
        });
    };
}
