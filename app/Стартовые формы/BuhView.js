/**
 * 
 * @author Alexey
 */

var DESKTOP = null;

function BuhView() {
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

    form.miContragents.onActionPerformed = function(event) {
        if (!fmContragents) {
                fmContragents = new CompaniesList();
        }
        fmContragents.show(form.formDesktop);
    };
    
    
    form.mContracts.onActionPerformed = function(event) {
        if (!fmContracts)
            fmContracts = new AllContractsView();
        fmContracts.show(form.formDesktop);
    };    

    form.miPriceList.onActionPerformed = function(event) {
        if (!fmPrcieList)
            fmPrcieList = new PriceListForm();
        fmPrcieList.show(form.formDesktop);
    };
    form.miLogout.onActionPerformed = function (evt){
        if(confirm("Выйти из системы?")){
            P.logout(function(){
                window.location.reload();
            });
        }
    }
}
