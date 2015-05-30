/**
 * 
 * @author Alexey
 */

var DESKTOP = null;

function RegView() {
    var self = this
        , model = P.loadModel(this.constructor.name)
        , form = P.loadForm(this.constructor.name, model);
    
    DESKTOP = form.formDesktop;
    
    P.require(["Дополнительно/RequeryAnimate.js"]);
    
    
    
    self.show = function (aDesktop) {
        //aDesktop ? form.showInternalFrame(aDesktop) : form.show();
        try {
            form.view.showOn(document.getElementById('Main'));
        } catch(e) {
            form.show();
        }
    };
    
    var obj = [
        {a: "q", b: "bn"},
        {a: "rg",b: "ff"}
    ];
    
    var fmUslTypes, fmUslList, fmUslContents;
    var fmContragents, fmContracts;
    var fmHazards;
    var fmUsers;
    var fmPatients;
    var fmPrcieList;
    var fmManJob, fmUslPeriod, fmObrStatus, fmUslPeriodicType, fmUsiLimAgeType;
    var fmMkbDeseases;

    form.miPatients.onActionPerformed = function(event) {
        if (!fmPatients)
            fmPatients = new PatientsForm();
        fmPatients.show(form.formDesktop);
    };
    
    form.miLogout.onActionPerformed = function (evt){
        if(confirm("Выйти из системы?")){
            P.logout(function(){
                window.location.reload();
            });
        }
    }
}
