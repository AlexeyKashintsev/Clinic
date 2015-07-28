/* global P */

/**
 * 
 * @author alexey
 * {global P}
 */
function TreatDetailedView() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    var rObj = {};
    self.setData = function(aRObj) {
            rObj = aRObj;
            rObj.naznacheniya = [];
            rObj.patients.forEach(preaprePatientData);

            form.mgRoutes.data = rObj.naznacheniya;
            form.mgRoutes.childrenField = "n_children";
            form.mgRoutes.parentField = "n_parent";
            form.mgRoutes.colName.field = "n_name";
            form.mgRoutes.colSelected.field = "usluga.selected";
            form.mgRoutes.colRoute.field = "usluga.route";
            form.mgRoutes.colClinic.field = "usluga.clinic_work";
    };
    
    self.show = function (aPanel) {
        var cont = aPanel ? aPanel : self.container;
        if (cont) {
            cont.add(form.view, new P.Anchors(1, null, 1, 1, null, 1));
        } else 
            form.show();
    };
    
    self.showModal = function(callback) {
        form.showModal(callback);
    };
    
    self.onBeforeNext = function(callback) {
        callback();
    };
    
    Object.defineProperty(self, 'nextData', {
        get: function() {
            return rObj;
        }
    });
    
    function preaprePatientData(patient) {
        var rec = {
            n_name: patient.surname + ' ' + patient.firstname + ' ' + patient.patronymic,
            n_parent: null,
            n_children: [],
            n_by_hazard: null,
            n_by_content: null,
            cost: null,
            selected: null,
            route: null,
            clinic_work: null
        };
        if (patient.hazards.length > 0) {
            var hazards = {
                n_name: "Вредности",
                n_parent: null,//rec,
                n_children: []
            };
            for (var j in patient.hazards) {
                if (j !== 'length') {
                    var hazard = patient.hazards[j];
                    hazards.n_children.push({
                        n_name: hazard.haz_code + " " + hazard.haz_name,
                        n_parent: null,//hazards,
                        n_children: []
                    });
                }
            }
            ;
            rec.n_children.push(hazards);
        }
        var route = {
            n_name: "Назначения",
            n_parent: null,//rec,
            n_children: []
        };
        for (var j in patient.route) {
            route.n_children.push({
                n_name: self.controller.qUslById.findByKey(j).usl_name,
                usluga: patient.route[j],
//                n_by_hazard: patient.route[j].hazard,
//                n_by_content: patient.route[j].usl_content,
                n_parent: null,//hazards,
                n_children: []
//                cost: patient.route[j].usl_cost,
//                selected: patient.route[j].selected,
//                route: patient.route[j].route
            });
        }
        rec.n_children.push(route);

        rObj.naznacheniya.push(rec);
    };
    
    form.btnOk.onActionPerformed = function(event) {
        form.close(rObj);
    };
    form.btnCancel.onActionPerformed = function(event) {
        form.close();
    };
}
