/**
 * 
 * @author Alexey
 */
function MainView() {
    var self = this
        , model = P.loadModel(this.constructor.name)
        , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        //aDesktop ? form.showInternalFrame(aDesktop) : form.show();
        form.view.showOn(document.getElementById('Main'));
    };
    
    var obj = [
        {a: "q", b: "bn"},
        {a: "rg",b: "ff"}
    ];
    
    var fmUslTypes, fmUslList, fmUslContents;
    var fmContragents;
    var fmHazards;
    var fmUsers;
    
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

    };
    
    form.miUslugiList.onActionPerformed = function(event) {
        if (!fmUslList) {
            fmUslList = new UslugiByTypeView();
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
                self.showFormAsInternal(fmContragents);
        }
        self.showFormAsInternal(fmContragents);
    };
    form.miPatients.onActionPerformed = function(event) {
        // TODO Добавьте здесь свой код
    };
}
