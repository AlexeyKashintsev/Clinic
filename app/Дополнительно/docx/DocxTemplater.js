/* global P */

/**
 * @public
 * @author minya92
 */ 
function DocxTemplater() {
    var self = this, model = P.loadModel(this.constructor.name);
    
    P.require([
        'Дополнительно/docx/libs/angular-expressions.js',
        'Дополнительно/docx/libs/FileSaver.min.js',
        'Дополнительно/docx/libs/jszip-utils.js',
        'Дополнительно/docx/libs/downloadify.min.js',
        'Дополнительно/docx/libs/main.min.js'
    ]);
    
    self.run = function (aTemplate, aOutputName, aData) {
        loadFile("app/Мед Услуги/Печатные формы/" + aTemplate, function(err, content){
            var doc = new DocxGen(content);
            doc.setData(aData);
            doc.render();
            var out=doc.getZip().generate({type:"blob"}); //Output the document using Data-URI
            saveAs(out, aOutputName);
        });
    };
    
    self.zaklObOsmotre = function(aData){
        self.run("zaklu4enie_ob_osmotre.doc", "Заключение по результатам осмотра", aData);
    };
}
