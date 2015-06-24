/**
 * 
 * @author user
 * @constructor
 */ 
function uploadingModule(aCallback, aFileFilter) {
    var self = this, model = P.loadModel(this.constructor.name);
    var callback = aCallback;
    var fileFilter = aFileFilter;
    var file;
    var loading;
    self.execute = function () {
      P.selectFile(function (aFile) {
            file = aFile;
            if (loading == null) {
                if (file != null) {
                    loading = P.Resource.upload(file,file.name,
                            function (aUrl) {
                                loading = null;
                                P.Icon.load(aUrl, function (loadedFile) {
                                    if (callback){
                                        callback(loadedFile);
                                    }
                                }, function (e) {
                                    P.Logger.info(e);
                                });
                            },
                            function (aEvent) {

                            },
                            function (aError) {
                                loading = null;
                                alert("Uploading is aborted with message: " + aError);
                            }
                    );
                } else
                    alert("Select a file please...");
            } else
                alert("Wait please while current upload ends!");
        }, fileFilter);
    };
}
