/**
 * 
 * @author minya92
 */
function LoaderProcessor() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
     self.loader = function(aGrid, anQuery){        
        var parent = aGrid.parent;
        form.lbLoad.height = 200;
        form.lbLoad.width = 200;
        //parent.add(form.lbLoad);// (form.lbLoad, new P.Anchors (0,200,200,100,200,0));
        var w = Math.round(parent.width / 2 - 100);
        var h = Math.round(parent.height / 2 - 100);
        parent.add(form.lbLoad, new P.Anchors (w,200,w,h,200,h));

        aGrid.visible = false;
        anQuery.requery(function(){
            aGrid.visible = true;
            parent.remove(form.lbLoad);
        });
    };
}
