/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatStat() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var uslStat = [];
    
    var detailedForm = new TreatDetailedView();
    var rObj;
    function prepareStatData(aStatData) {
        for (var j in aStatData) {
            var usl = self.controller.qUslById.findByKey(j);
            aStatData[j].usl_name = usl.usl_name;
            aStatData[j].clinic_work = usl.clinic_work;
            aStatData[j].do_apply = usl.do_apply;
            uslStat.push(aStatData[j]);
        }
    }
    
    self.show = function (aPanel) {
        var cont = aPanel ? aPanel : self.container;
        if (cont) {
            cont.add(form.view, new P.Anchors(1, null, 1, 1, null, 1));
        } else 
            form.show();
        detailedForm.controller = self.controller;
    };
    
    self.onBeforeNext = function(callback) {
        if (!applied) {
            apply();
        }
        callback();
    };
    
    Object.defineProperty(self, 'nextData', {
        get: function() {
            return rObj;
        }
    });
    
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    self.setData = function(aRObj) {
        rObj = aRObj;
        prepareStatData(rObj.uslugi);
        form.mgUslugiStat.data = uslStat;//rObj.uslugi;
        form.mgUslugiStat.colUslName.field = "usl_name";
        form.mgUslugiStat.colCount.field = "treatments";
        form.mgUslugiStat.colCountByRoute.field = "usl_content";
        form.mgUslugiStat.colCountByHazard.field = "hazard";
        form.mgUslugiStat.colClinic.field = "clinic_work";
        form.mgUslugiStat.colRoute.field = "do_apply";
    };
    
    var applied = false;
    function apply() {
        rObj.patients.forEach(function(patient) {
            for (var j in patient.route) {
                patient.route[j].route = rObj.uslugi[j].do_apply;
                patient.route[j].clinic_work = rObj.uslugi[j].clinic_work;
            };
        });
        applied = true;
    };
    form.btnMore.onActionPerformed = function(event) {
        if (applied && confirm('Обновить данные'))
            apply();
        detailedForm.setData(rObj);
        detailedForm.showModal();
    };
}
