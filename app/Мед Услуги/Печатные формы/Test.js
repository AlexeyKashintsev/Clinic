/**
 * 
 * @author user
 */
function OwnersView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);

    self.show = function () {
        form.show();
        model.requery();
    };
   
   var docx = new DocxTemplater();

    form.btnReport.onActionPerformed = function(event) {
        var obj = {"first_name":"Мищка",
            last_name:"Лапшин",
            "phone":"687677868767868",
            "description":"New Website",
            ewedwdwdw: "ewdwed",
            id: 868768768
        };
        docx.run("tagExample.docx", "test.docx", obj)
    };
}
