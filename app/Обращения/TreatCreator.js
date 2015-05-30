/**
 * 
 * @author Алексей
 * @constructor
 */ 
function TreatCreator() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    self.createGroupTreatment = function(aContractId) {
        model.revert();
        model.qTreatGroup.params.contract_id = 
            model.qTreatGroup.params.group_id = null;
        model.qTreatGroup.push({
            contract_id: aContractId ? aContractId : null
        });
        model.qTreatById.params.treat_id = null;
        model.qTreatById.push({
            treatment_group_id: model.qTreatGroup.cursor.obr_group_id,
            treat_date: new Date(),
            treat_status: 0
        });
//        model.save();
        return model.qTreatById.cursor.obr_treatment_id;
    };
    
    self.createSingleTreatment = function(aPatientId) {
        model.revert();
        model.qTreatById.params.treat_id = null;
        model.qTreatById.push({
            patient: aPatientId,
            treat_date: new Date(),
            treat_status: 0
        });
//        model.save();
        return model.qTreatById.cursor.obr_treatment_id;
    };
}
