/**
 * 
 * @author Mikhail, Alexey
 */
function AppointmentForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var treatCreator = new P.ServerModule('TreatCreator');
    var treatCalculator = new P.ServerModule('TreatCalculator');
//    var rue = {
//        usluga: "usluga_id",
//        people_count: "people_count",
//        usl_route_count: "---",
//        hazards_count: "---"
//    };
//    var routeUsl = [];
//    
//    var sue = {
//        usluga: "usluga_id",
//        usl_cost: "usl_cost",
//        contract: "contract_id"
//    };
//    var selectedUsl = [];
//    form.mgUsl.data = selectedUsl;
    
    var patients = [];
    var curTreat;
    
    self.show = function () {
        form.show();
    };
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    function setCurTreat(aTreatmentId) {
        model.revert();
        curTreat = aTreatmentId;
        model.qUslInTreat.params.treat_id = curTreat;
        model.qUslInTreat.requery();
    }
    
    self.setPatients = function(aPatients) {
        patients = aPatients;
        form.mtPatientsCount.text = patients.length;
        if (patients.length > 1) 
            treatCreator.createGroupTreatment(null, setCurTreat);
        else
            treatCreator.createSingleTreatment(aPatients[0].man_patient_id, setCurTreat);
    };
    
    var fmUslugiSelect = new Uslugi4SelectView();
    form.btnAdd.onActionPerformed = function(event) {
        if (curTreat)
            fmUslugiSelect.showModal(function(anUsluga) {
                if (anUsluga) {
                    model.qUslInTreat.push({
                        treat_id: curTreat,
                        usluga_id: anUsluga
                    });
                }
            });
    };
}
