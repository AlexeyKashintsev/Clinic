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
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnAdd.onActionPerformed = function(event) {
        if(form.mgJobs.data.length == 0 && form.tfManJobSearch.text!== '')
        {
            model.qManJob.push({job_title: form.tfManJobSearch.text});             
            form.mgJobs.data = model.qManJob;
            model.save(function(){});
        }
        else if(form.mgJobs.data.length != 0)
            model.qManJob.push({});
    };
    form.btnDel.onActionPerformed = function(event) {
        if (confirm("Удалить?"))
        model.qManJob.remove(model.qManJob.cursorPos);
    };
    form.btnReq.onActionPerformed = function(event) {
        if(model.modified && confirm("Сохранить изменения?")) 
            model.save(function(){
                model.requery();
            });
        else
            model.requery();
    };
    form.btnSave.onActionPerformed = function(event) {
        model.save(function(){
                model.requery();
            });
    };
    form.button.onActionPerformed = function(event) {
        if (model.modified && confirm('Сохранить изменения'))
            model.save();
        form.close(model.qManJob.cursor.man_job_id);
    };
    
    form.tfManJobSearch.onValueChange = function() {
//        model.qManJob.params.job_find = form.tfManJobSearch.text ? form.tfManJobSearch.text : null;        
//        model.qManJob.execute();  
        if (form.tfManJobSearch.text !== '') {
            var myRe = form.tfManJobSearch.text; 
            var newArr = model.qManJob.filter(function(element, index, array) {
                if(element.job_title.match(new RegExp(myRe, "i")))
                    return true;
            });            
            form.mgJobs.data = newArr;   
            
//            if(form.mgJobs.data.length == 0)
//                console.log("null");
            
        } else {
            form.mgJobs.data = model.qManJob;
        }
    };
}
