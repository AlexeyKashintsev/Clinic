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
        form.show(aCallback);
    };
    
    var upMod = new uploadingModule(function(aRes) {
        console.log(aRes);
    });
    
    form.btnChooseFile.onActionPerformed = function(evt) {
//        P.selectFile(function (aFile) {
//            console.log(aFile.name);
//        });
        upMod.execute();
    };
}
