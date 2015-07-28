/**
 * 
 * @author minya92
 */
function t123() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);
    
    self.show = function (aDesktop) {
        aDesktop ? form.showInternalFrame(aDesktop) : form.show();
    };
    
    var uslRoutes = {};
    function getUslRoute(anUslugaId) {
        P.Logger.info('Получение маршрута для услуги ' + anUslugaId);
//        if (!uslRoutes[anUslugaId]) {
            model.qUslugaContents.params.usluga_id = anUslugaId;
            model.qUslugaContents.requery(function() {          
                
                model.qUslugaById.params.usluga_id = anUslugaId;
                model.qUslugaById.requery(function() {
                    uslRoutes[anUslugaId] = {
                        route: [],
                        useHazards: model.qUslugaById.cursor.use_hazards
                    };

                    P.Logger.info('Маршрут получен, длина маршрута ' + model.qUslugaContents.length);
                    if (model.qUslugaContents.length === 0)
                        uslRoutes[anUslugaId].route.push(function() {
                            model.qUslugaById.params.usluga_id = anUslugaId;
                            model.qUslugaById.requery();
                            return model.qUslugaById.cursor;
                        }());
                    else
                        model.qUslugaContents.forEach(function(routeUsl) {
                            uslRoutes[anUslugaId].route.push(routeUsl);
                        });
  
                    P.Logger.info('Услуги в маршруте: ' + function() {
                        var res = '';
                        for (var j in uslRoutes[anUslugaId].route)
                            res += 'usl: ' + uslRoutes[anUslugaId].route[j];
                        return res;
                    }());
  
                });
            });
//        }

//        return uslRoutes[anUslugaId];
    }
    
    form.button.onActionPerformed = function(event) {
        getUslRoute(form.textField.text);
    };
    
    form.button1.onActionPerformed = function(event) {
        var req = new HTTPRequest();
        req.module = 'testM';
        req.method = 'test';
        req.post("111", function(aRes) {
            console.log(aRes);
        }, function(aRes) {alert(aRes)});
    };
    form.button2.onActionPerformed = function(event) {
        var modT = new P.ServerModule('testM');
        modT.test();
    };
    

    
    form.button3.onActionPerformed = function(event) {
        var testJSON = '{"hazards":[{"hazard_type":2,"haz_code":"25","haz_group":"","hazards_id":1027,"haz_short_name":"Работы на водопроводных сооружениях\"","man_hazards_id":143497395463481,"hazard_id":1027,"workplace_id":143455303158580,"haz_name":"Работы на водопроводных сооружениях, связанные с подготовкой воды и обслуживанием водопроводных сетей\"","period_type":1}]}';
//        var req = new HTTPRequest();
//        req.module = 'testM';
//        req.method = 'test';
//        req.post(encodeURIComponent(testJSON), function(aRes) {
//            console.log(aRes);
//        }, function(aRes) {alert(aRes)});
        var modT = new P.ServerModule('testM');
        modT.test(JSON.parse(testJSON));
    };
    form.modelCheckBox.onValueChange = function(event) {
        form.checkBox1.selected = form.modelCheckBox.value;
        form.label.text = form.modelCheckBox.value;
    };
    
    var sp = [];
    sp[1] = {};
    sp[1000000000000000000000000] = {};
    form.button4.onActionPerformed = function(event) {
        form.modelGrid.data = sp;
    };
    
    
    form.button5.onActionPerformed = function(event) {
        var modT = new P.ServerModule('testM');
        modT.testDB(function() {
            alert('ok');
        }, function() {
            alert('failure');
        });
    };
}
