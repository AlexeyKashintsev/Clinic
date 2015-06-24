/**
 * 
 * @author user
 */
function OwnersView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);

    self.show = function () {
        form.show();
        model.requery();
    };
    
    var lp = new LongProcessor([form.btnReport]);

    form.btnReport.onActionPerformed = function (event) {
        lp.start(this, function(){
            var srvModule = new P.ServerModule("OwnersReport");
            srvModule.execute(function(aReport){
                aReport.show();
                lp.stop();
            });
        });
    };
    


}
