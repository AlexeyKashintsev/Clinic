/**
 * @public
 * @author minya92
 */
function PassportHealth() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , template = P.loadTemplate(this.constructor.name, model);
    
    self.setPacient = function(aPacient){
        model.qPatientById.params.patient_id = aPacient;
        //model.qPatientById.requery();
    };
    
    self.execute = function (onSuccess, onFailure) {
        
        model.requery(function () {
            // TODO : place data processing code here
            P.Logger.warning(model.qPatientById.cursor.man_patient_id + "!!!!!!!!!!!!!!!!!!!!!!!!!!");
            var report = template.generateReport();
            // report.show(); | report.print(); | var savedTo = report.save(saveTo ?);
            onSuccess(report);
        }, onFailure);
        
    };
}
