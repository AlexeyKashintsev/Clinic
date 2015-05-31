/**
 * @public
 * @author root
 * @constructor
 * @stateless
 */ 
function Patient() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    var reqCount = 0;
    function processRequery(aCallback) {
        reqCount++;
        if (reqCount === 2) {
            var patient = model.qPatientById.cursor;
            patient.hazards = model.qHazardsByManJob;
            aCallback(patient);
        }
    };
    
    self.getPatientAsync = function(aPatientId, aCallback) {
        model.qPatientById.params.patient_id =
                model.qWorkPlaceByPatient.params.patient_id = aPatientId;
        model.qPatientById.requery(function() {
            processRequery(aCallback);
        });
        model.qWorkPlaceByPatient.requery(function() {
            model.qHazardsByManJob.params.workplaceId = 
                    model.qWorkPlaceByPatient.cursor.man_workplace_id;
            model.qHazardsByManJob.requery(function() {
                processRequery(aCallback);
            });
        });
    };
    
    self.getPatientSync = function(aPatientId) {
        P.Logger.info('Getting patient ' + aPatientId);
        model.qPatientById.params.patient_id =
                model.qWorkPlaceByPatient.params.patient_id = aPatientId;
        model.qPatientById.requery();
        model.qWorkPlaceByPatient.requery();
        P.Logger.info('Data loaded ' + model.qPatientById.length + ' | ' + model.qWorkPlaceByPatient.length);
        model.qHazardsByManJob.params.workplaceId = model.qWorkPlaceByPatient.length > 0 ?
            model.qWorkPlaceByPatient.cursor.man_workplace_id : null;
        model.qHazardsByManJob.requery();
        
        var patient = model.qPatientById.cursor;
        patient.hazards = function() {
            var res = [];
            model.qHazardsByManJob.forEach(function(aRes) {
                res.push(aRes);
            });
            return res;
        }();;
        return patient;
    };
}
