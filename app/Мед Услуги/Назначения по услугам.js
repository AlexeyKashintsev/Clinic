/**
 * @public
 * @author minya92
 */
function UslugiContentsView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    form.title = "Назначения по услугам";
    var fmUslContent = new UslugaContent();
    var lp = new LongProcessor();
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    model.qUslTypes.onScrolled = function(){
        model.qUslugiByType.params.usl_type = model.qUslTypes.cursor.usl_types_id;
        model.qUslugiByType.requery();
    };
    
    model.qUslugiByType.onRequeried =  function(){
        if(model.qUslugiByType.length > 0){
            fmUslContent.setUsluga(model.qUslugiByType.cursor.usl_uslugi_id, 
                                   model.qUslugiByType.cursor.usl_type,
                                   model.qUslugiByType.cursor.usl_name
            );
        }
    };
    
    model.qUslugiByType.onScrolled = function(event) {
        model.qUslugiByType.onRequeried();
    };

    fmUslContent.showOnPanel(form.pnlUslContent);
    
    model.requery();

    form.tfFilter.onValueChange = function(event) {
        lp.start(form.lbLoading, function(){
            model.qUslugiByType.params.search = form.tfFilter.text;
            model.qUslugiByType.requery(function(){lp.stop();});
        });
    };
}
