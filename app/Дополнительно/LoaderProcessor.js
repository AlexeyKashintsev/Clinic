/**
 * 
 * @author minya92
 */
function requeryAnimate(aGrid, aQuery) {  
    var parent = aGrid.parent;
    var lbLoad = new P.Label('null');
    P.Icon.load('icons/loading5.gif', function(data){
        lbLoad.icon = data;
        lbLoad.text = null;

        var w = Math.round(parent.width / 2 - 100);
        var h = Math.round(parent.height / 2 - 100);
        parent.add(lbLoad, new P.Anchors (w,200,w,h,200,h));

        aGrid.visible = false;

        aQuery.requery(function(){
            aGrid.visible = true;
            parent.remove(lbLoad);
        });
    });        
}
