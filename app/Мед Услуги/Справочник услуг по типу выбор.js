/**
 * 
 * @author minya92
 */
function Uslugi4SelectView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    var lp = new LongProcessor();
    var uslugaContent = new UslugaContent();
    var readonly = false;
    form.title = "Выбор услуги";
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    self.readOnly = function(){
        readonly = true;
        form.button.visible = false;
    };
    
    model.qUslTypes.onScrolled = function(){
        model.qUslugiByType.params.usl_type = model.qUslTypes.cursor.usl_types_id;
        try {
            RequeryAnimate(form.mgUsl, model.qUslugiByType);
        } catch (e) {
            model.qUslugiByType.requery();
        }
    };
    
    model.requery(function () {
        // TODO : place your code here
    });
    
    form.btnReq.onActionPerformed = function(event) {
        if(model.modified)
            if(confirm("Сохранить изменения?"))
                model.save(function(){
                    model.requery();
                });
            else
                model.requery();
    };
    
    form.btnSave.onActionPerformed = function(event) {
        model.save();
    };
    
    form.button.onActionPerformed = function(event) {
        if(!readonly){
            uslugaContent.setUsluga(model.qUslugiByType.cursor.usl_uslugi_id, 
                                    model.qUslugiByType.cursor.usl_type, 
                                    model.qUslugiByType.cursor.usl_name);
            uslugaContent.showModal(function(){
                model.qUslugiByType.requery();
            });
        } else 
            form.btnSelect.onActionPerformed();
            
    };
    
    form.mgUsl.onMouseClicked = function(event) {
        if(event.clickCount == 2)
            form.button.onActionPerformed();
    };

    
    form.btnAdd.onActionPerformed = function(event) {
        if(model.qUslTypes.cursor.usl_types_id === 0){
            alert("Невозможно создать услугу в категории 'Все услуги'\nВыберите другую категорию!");
        } else {
            var uslName = prompt("Введите название новой услуги:");
            if(uslName){
                model.qUslugiByType.push({
                    usl_type: model.qUslTypes.cursor.usl_types_id,
                    usl_name: uslName
                });
            }
        }
    };
    
    form.btnDel.onActionPerformed = function(event) {
        if(confirm("Удалить выбранную услугу?")){
            model.qUslugiByType.splice(model.qUslugiByType.indexOf(form.mgUsl.selected[0]), 1);
            //model.qUslugiByType.remove(model.qUslugiByType.cursorPos); // deleteRow();
        }
    };
    
    form.btnCancel.onActionPerformed = function(event) {
        form.close(false);
    };
    
    form.btnSelect.onActionPerformed = function(event) {
        form.close(model.qUslugiByType.cursor.usl_uslugi_id); //return usl_id
    };
    form.btnAdd1.onActionPerformed = function(event) {
        var newUslName = prompt('Название нового типа услуги');
        if (newUslName)
            model.qUslTypes.push({
                type_name   :   newUslName,
                type_parent :   
                        model.qUslTypes.cursor.type_parent !== 0 ? model.qUslTypes.cursor.type_parent : null
            });
    };
    form.btnAddParent.onActionPerformed = function(event) {
        var newUslName = prompt('Название нового типа услуги');
        if (newUslName)
            model.qUslTypes.push({
                type_name   :   newUslName,
                type_parent :   
                        model.qUslTypes.cursor.usl_types_id !== 0 ? model.qUslTypes.cursor.usl_types_id : null
            });
    };
    form.btnDel1.onActionPerformed = function(event) {
        if (model.qUslTypes.cursor.usl_types_id) {
            if (confirm('Внимание! Так же будут удалены услуги с данным типом!\nУдалить данный тип услуги?')) {
                model.qUslTypes.splice(model.qUslTypes.indexOf(form.modelGrid.selected[0]), 1);
                //model.qUslTypes.remove(model.qUslTypes.cursorPos);
            };
        } else {
            alert('Невозможно удалить данный тип услуг!');
        }
    };
    
    form.mfSearch.onValueChange = function(event) {
        console.log(model.qUslugiByType.params.usl_type);
        if(model.qUslugiByType.params.usl_type){
            model.qUslugiByType.params.usl_type=null;
            model.requery(function(){search()});
        }else
            search();
        function search(){    
            lp.start(form.lbLoading, function(){
                model.qUslugiByType.params.search = form.mfSearch.text;
                model.qUslugiByType.requery(function(){lp.stop();});
            });
        }
    };

}
