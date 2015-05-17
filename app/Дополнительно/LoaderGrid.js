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
        var parent = aGrid.parent;
        aForm.lbLoad = new P.Label("12345");
        aForm.lbLoad.parent = parent;
        aForm.lbLoad.left = aGrid.left + 40;
        aForm.lbLoad.top = aGrid.top + 40;
        console.log(aGrid.left + " " + aGrid.top);
        aGrid.visible = false;
        aQuery.requery(function(){
            aGrid.visible = true;
            aForm.lbLoad.visible = false;
        });
    };
}
