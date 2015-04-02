/**
 * @author Алексей
 * @name template2
 * @public
 */

function Uslugi4SelectView_() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
   
    self.show = function () {
        form.show();
    };

    function formWindowClosing(evt) {
        if (model.modified && confirm('Сохранить изменения?')) {
           model.save();
        }
    }

    function buttonActionPerformed(evt) {
        form.close(model.qUslugiByType.cursor.usl_uslugi_id);
    }

    function button1ActionPerformed(evt) {
        form.close();
    }
}