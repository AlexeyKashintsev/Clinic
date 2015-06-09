/**
 * 
 * @author Mikhail
 */
function TreatmentDetailForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
    };
    
    self.setPatient = function (aPacientId){
        model.qTreatByPatient.params.patient_id = aPacientId;
        model.qTreatByPatient.requery();
    };
    
    model.requery(function () {
        
    });
    
    var tabUslugi = new TabUslugi();
    tabUslugi.setData(model.qUslugiInTreat);
    tabUslugi.showOnPanel(form.pnlUsl);
    
    var tabNazn = new TabNazn();
    tabNazn.setData(model.qNaznach);
    tabNazn.showOnPanel(form.pnlNazn);
    
    var tabPrices = new TabPrices();
    tabPrices.setData(model.qUslInTreat);
    tabPrices.showOnPanel(form.pnlPrices);
    
    var tabAdditional = new TabAdditional();
    tabAdditional.setData(model.qObrAdditional);
    tabAdditional.showOnPanel(form.pnlDop);
}
