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
        req.URL = 'bcd';
        req.get(function(aRes) {
            console.log(aRes);
        });
    };
}
