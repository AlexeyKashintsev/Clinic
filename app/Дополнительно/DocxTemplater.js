/* global P */

/**
 * @public
 * @author minya92
 */ 
function DocxTemplater() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    P.require([
        'Дополнительно/docx/angular-expressions.js',
        'Дополнительно/docx/FileSaver.min.js',
        'Дополнительно/docx/jszip-utils.js',
        'Дополнительно/docx/downloadify.min.js',
        'Дополнительно/docx/main.min.js'
    ]);
    
    self.run = function (aTemplate, aOutputName, aData) {
        loadFile("web/templates/" + aTemplate, function(err,content){
            var doc = new DocxGen(content);
            doc.setData(aData);
            doc.render();
            var out=doc.getZip().generate({type:"blob"}); //Output the document using Data-URI
            saveAs(out, aOutputName);
        });
    };
}
