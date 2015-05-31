/**
 * 
 * @author minya92
 */
function ManJobForm() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);

    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };

    self.showModal = function (aCallback) {
        form.showModal(aCallback);
    };

    model.requery(function () {
        // TODO : place your code here
    });

    form.btnAdd.onActionPerformed = function (event) {
        if (form.mgJobs.data.length == 0 && form.tfManJobSearch.text != '')
        {
            model.qManJob.push({job_title: form.tfManJobSearch.text});
            form.mgJobs.data = model.qManJob;
            model.save(function () {
                form.tfManJobSearch.text = '';
            });
        } else
        if (form.mgJobs.data.length != 0 && form.tfManJobSearch.text == '')
            model.qManJob.push({});
    };

    form.btnReq.onActionPerformed = function (event) {
        if (model.modified && confirm("Сохранить изменения?"))
            model.save(function () {
                model.requery();
            });
        else
            model.requery();
    };
    form.btnSave.onActionPerformed = function (event) {
        model.save(function () {
            //model.requery();
        });
        form.tfManJobSearch.text = '';
    };
    form.button.onActionPerformed = function (event) {
        if (model.modified && confirm('Сохранить изменения'))
            model.save();
        form.close(form.mgJobs.selected[0].man_job_id);
    };

    form.tfManJobSearch.onValueChange = function () {
        if (form.tfManJobSearch.text !== '') {
            var myRe = form.tfManJobSearch.text;
            var re = new RegExp(myRe, "i");
            var newArr = model.qManJob.filter(function (element, index, array) {
                if (element.job_title)
                    if (element.job_title.match(re))
                        return true;
            });
            form.mgJobs.data = newArr;
        } else {
            form.mgJobs.data = model.qManJob;
        }
    };
    
    form.btnDel.onActionPerformed = function(event) {
        model.qManJob.remove(model.qManJob.findByKey(form.mgJobs.selected[0].man_job_id));
    };

}
