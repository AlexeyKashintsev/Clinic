/**
 * @public
 */
function OwnersReport() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , template = P.loadTemplate(this.constructor.name, model);
    
    model.data = {};
    
    self.execute = function (onSuccess, onFailure) {
        model.requery(function () {
            model.data.test = ["Тест!"];  
             
            var report = template.generateReport()
            //report.show(); | report.print(); | var savedTo = report.save(saveTo ?);
            onSuccess(report);
        }, onFailure);
    }; 
}
