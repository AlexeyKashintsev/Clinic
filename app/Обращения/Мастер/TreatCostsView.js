/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatCostsView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
            
    var contractConstructor = new P.ServerModule('ContractConstructor');
    
//    model.qPeriodic.requery();
//    model.qSex.requery();
//    model.qUsiLimAgeType.requery();
//    model.qUslById.requery();
    
    var rObj = {};
    self.setData = function(aRObj) {
        function preparePriceData(price) {
            price.usluga = self.controller.qUslById.findByKey(price.usluga_id);
            price.periodic_type = model.qPeriodic.findByKey(price.per_type);
            price.sex_t = model.qSex.findByKey(price.sex);
            price.age_type = model.qSex.findByKey(price.limitation_age_type);
        }
        model.requery(function() {
            rObj = aRObj;
            rObj.priceData.forEach(preparePriceData);
            form.mgCosts.data = rObj.priceData;
            form.mgCosts.colUsl_name.field = "usluga";
            form.mgCosts.colSex.field = "sex_t";
            form.mgCosts.colPer_type.field = "periodic_type";
            form.mgCosts.colVozrastType.field = "age_type";
            form.mgCosts.colVozrast.field = "limitation_age";

            form.mgCosts.onRender = function (event) {
                if (event.object.missed)
                    event.cell.background = new P.Color('#FFCCCC');
            };
            
            checkForNextStep();
        });
    };
    
    Object.defineProperty(self, 'nextData', {
        get: function() {
            return rObj;
        }
    });
    
    self.show = function (aPanel) {
        var cont = aPanel ? aPanel : self.container;
        if (cont) {
            cont.add(form.view, new P.Anchors(1, null, 1, 1, null, 1));
        } else 
            form.show();
    };
    
    self.onBeforeNext = function(callback) {
        if (checkForNextStep()) {
            if (rObj.contract)
                updateContract(callback);
            else
                updatePrice(callback);
        } else {
            alert('Ошибка! Не заданы все цены!');
        }
    };
    
    function getCosts() {
        var costs = [];
        form.mgCosts.data.forEach(function (s) {
            costs.push({
                limitation_age_type: s.age_type ? s.age_type.usl_lim_age_type_id : null,
                cost: s.cost,
                per_type: s.periodic_type ? s.periodic_type.usl_periodic_type_id : null,
                sex: s.sex_t ? s.sex_t.man_sex_id : null,
                usluga_id: s.usluga ? s.usluga.usl_uslugi_id : null
            });
        });
        return costs;
    }
    
    function updatePrice(callback) {
        var contract_id;
        if (rObj.price && confirm('Обновить прайс лист?'))
            contract_id = rObj.price;
        if (contract_id)
            contractConstructor.updateContractPrices(contract_id, getCosts(callback));
        return !!contract_id;
    }
    
    function updateContract(callback) {
        var contract_id;
        if (rObj.contract) {
            contract_id = rObj.contract;
        }
        if (contract_id)
            contractConstructor.updateContractPrices(contract_id, getCosts(), callback);
        return !!contract_id;
    }
    
    function checkForNextStep() {
        var ok = true;
        rObj.priceData.forEach(function(pData) {
            if (!pData.cost)
                ok = false;
        });
        self.controller.finishBtn = self.controller.nextBtn = ok;
        return ok;
    }
    
    form.btnDoublePrice.onActionPerformed = function (event) {
        if (form.mgCosts.selected[0]) {
            var s = form.mgCosts.selected[0];
            form.mgCosts.data.push({
                limitation_age_type: s.limitation_age_type,
                cost: s.cost,
                missed: s.missed,
                per_type: s.per_type,
                sex: s.sex,
                usluga_id: s.usluga_id,
                usluga: s.usluga,
                age_type: s.age_type,
                sex_t: s.sex_t,
                periodic_type: s.periodic_type
            });
        }
    };
    
    form.btnSaveToPrice.onActionPerformed = function(event) {
        if (!updatePrice())
            alert('Прайс-лист не выбран!');
        else {
            if (!rObj.contract)
                checkForNextStep();
        }
    };
    form.btnSaveToContract.onActionPerformed = function(event) {
        if (!updateContract())
            alert('Договор не выбран!');
        else
            checkForNextStep();
    };
    
    self.doFinish = function(callback) {
        var treatCreator = new P.ServerModule('TreatCreator');
        treatCreator.applyTreatment(rObj, callback);
    };
}
