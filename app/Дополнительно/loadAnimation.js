function loadAnim(aGrid, aQuery){        
    var parent = aGrid.parent;
    var lbLoad = new P.Label("Загрузка...");
        lbLoad.icon = new P.Image() //Icon.load("icons/loader200x200.gif");
    form.lbLoad.height = 200;
    form.lbLoad.width = 200;
    //parent.add(form.lbLoad);// (form.lbLoad, new P.Anchors (0,200,200,100,200,0));
    var w = Math.round(parent.width / 2 - 100);
    var h = Math.round(parent.height / 2 - 100);
    parent.add(form.lbLoad, new P.Anchors (w,200,w,h,200,h));

    aGrid.visible = false;
    aQuery.requery(function(){
        aGrid.visible = true;
        parent.remove(form.lbLoad);
    });
};