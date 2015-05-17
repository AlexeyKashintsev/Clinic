/**
 * 
 * @author minya92
 */
function Uslugi4SelectView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var uslugaContent = new UslugaContent();
    var loaderGrid = false;
    
    form.title = "Выбор услуги";
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    self.showModal = function(aCallback) {
        form.showModal(aCallback);
    };
    
    model.qUslTypes.onScrolled = function(){
        model.qUslugiByType.params.usl_type = model.qUslTypes.cursor.usl_types_id;
//        form.lbLoading.visible = true;
//        form.mgUsl.visible = false;
//        model.qUslugiByType.requery(function(){
//            form.lbLoading.visible = false;
//            form.mgUsl.visible = true;
//        });
        if(!loaderGrid) loaderGrid = new LoaderGrid();
        loaderGrid.loader(form, form.mgUsl, model.qUslugiByType);
        
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
        uslugaContent.setUsluga(model.qUslugiByType.cursor.usl_uslugi_id, 
                                model.qUslugiByType.cursor.usl_type, 
                                model.qUslugiByType.cursor.usl_name);
        uslugaContent.showModal(function(){
            model.qUslugiByType.requery();
        });
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
            model.qUslugiByType.remove(model.qUslugiByType.cursorPos); // deleteRow();
        }
    };
    
    form.btnCancel.onActionPerformed = function(event) {
        form.close(false);
    };
    
    form.btnSelect.onActionPerformed = function(event) {
        form.close(model.qUslugiByType.cursor.usl_uslugi_id); //return usl_id
    };
}
