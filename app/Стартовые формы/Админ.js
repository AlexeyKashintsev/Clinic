/**
 * 
 * @author Alexey
 */

var DESKTOP = null;

function MainView() {
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
    var fmManJob, fmUslPeriod, fmObrStatus, fmUslPeriodicType, fmUsiLimAgeType, fmResults;
    var fmMkbDeseases;
    var fmRouteStatus;
    
    form.miUsers.onActionPerformed = function(event) {
        if (!fmUsers) {
            fmUsers = new UsersView();
        }
        fmUsers.show(form.formDesktop);
        //fmUsers.show();
    };
    
     form.miUslugiTypes.onActionPerformed = function(event) {
        if(!fmUslTypes)
            fmUslTypes = new UslTypesView();
        fmUslTypes.show(form.formDesktop);
    };
    
    form.miHazards.onActionPerformed = function(event) {
        if (!fmHazards) {
            fmHazards = new HazardForm();
        }
        fmHazards.show(form.formDesktop);
    };
    
    form.miUslugiList.onActionPerformed = function(event) {
        if (!fmUslList) {
            fmUslList = new Uslugi4SelectView();
        }
        fmUslList.show(form.formDesktop);
    };
    form.miUslugiContents.onActionPerformed = function(event) {
        if (!fmUslContents) {
                fmUslContents = new UslugiContentsView();
        }
        fmUslContents.show(form.formDesktop);   
    };
    form.miContragents.onActionPerformed = function(event) {
        if (!fmContragents) {
                fmContragents = new CompaniesList();
        }
        fmContragents.show(form.formDesktop);
    };
    form.miPatients.onActionPerformed = function(event) {
        if (!fmPatients)
            fmPatients = new PatientsForm();
        fmPatients.show(form.formDesktop);
    };
    form.miManJob.onActionPerformed = function(event) {
        if (!fmManJob)
            fmManJob = new ManJobForm();
        fmManJob.show(form.formDesktop);
    };
    form.miUslPeriod.onActionPerformed = function(event) {
        if (!fmUslPeriod)
            fmUslPeriod = new UslPeriodForm();
        fmUslPeriod.show(form.formDesktop);
    };
    form.miObrStatus.onActionPerformed = function(event) {
        if (!fmObrStatus)
            fmObrStatus = new ObrStatusForm();
        fmObrStatus.show(form.formDesktop);
    };
    form.miUslPeriodicType.onActionPerformed = function(event) {
        if (!fmUslPeriodicType)
            fmUslPeriodicType = new UslPeriodicTypeForm();
        fmUslPeriodicType.show(form.formDesktop);
    };
    form.miUsiLimAgeType.onActionPerformed = function(event) {
        if (!fmUsiLimAgeType)
            fmUsiLimAgeType = new UsiLimAgeTypeForm();
        fmUsiLimAgeType.show(form.formDesktop);
    };
    form.mContracts.onActionPerformed = function(event) {
        if (!fmContracts)
            fmContracts = new AllContractsView();
        fmContracts.show(form.formDesktop);
    };    
    form.miMkbDeseases.onActionPerformed = function(event) {
        if (!fmMkbDeseases)
            fmMkbDeseases = new MkbDeseasesForm();
        fmMkbDeseases.show(form.formDesktop);
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
    form.miResultsParams.onActionPerformed = function(event) {
        if (!fmResults)
            fmResults = new ResultsForm();
        fmResults.show(form.formDesktop);
    };
    form.miRouteStatus.onActionPerformed = function(event) {
        if (!fmRouteStatus)
            fmRouteStatus = new ObrRouteStatusForm();
        fmRouteStatus.show(form.formDesktop);
    };
}
