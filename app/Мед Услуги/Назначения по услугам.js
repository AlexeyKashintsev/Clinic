/**
 * @public
 * @author minya92
 */
function UslugiContentsView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    var fmUslContent = new UslugaContent();
    
    function req(){
        fmUslContent.setUsluga(model.qUslugiByType.cursor.usl_id, model.qUslTypes.cursor.usl_types_id, model.qUslugiByType.cursor.usl_name);
    }
    
    model.requery(req);
    model.qUslTypes.onScrolled = req;
    model.qUslugiByType.onScrolled =  req;
    fmUslContent.showOnPanel(form.pnlUslContent);
}
