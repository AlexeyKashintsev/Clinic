/**
 * 
 * @author Alexey
 */
function DataLoader() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function () {
        form.show();
    };
    
    self.showModal = function (aCallback) {
        form.showModal(aCallback);
    };
    
    form.btnChooseFile.onActionPerformed = function(evt) {
        P.selectFile(function(aFile) {
            console.log(aFile);
        });
    };
}
