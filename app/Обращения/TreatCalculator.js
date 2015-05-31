/**
 * 
 * @author Alexey
 * @constructor
 * @public
 */ 
function TreatCalculator() {
    var self = this, model = P.loadModel(this.constructor.name);
    var patientM = new Patient();
    
//    Возможно, нужно сделать рекурсивный обход
    var uslRoutes = {};
    function getUslRoute(anUslugaId) {
        P.Logger.info('Получение маршрута для услуги ' + anUslugaId);
        if (!uslRoutes[anUslugaId]) {
            model.qUslugaContents.params.usluga_id = anUslugaId;
            model.qUslugaContents.requery();
            model.qUslugaById.params.usluga_id = anUslugaId;
            model.qUslugaById.requery();
            uslRoutes[anUslugaId] = {
                route: [],
                useHazards: model.qUslugaById.cursor.use_hazards
            };
            
//            P.Logger.info('Маршрут получен ' + model.qUslugaContents.length);
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
        }
        P.Logger.info('Маршрут получен ' + anUslugaId);
        return uslRoutes[anUslugaId];
    }
    
    var hazardRoutes = {};
    function getHazardRoute(aHazardId) {
        if (!hazardRoutes[aHazardId]) {
            model.qHazardContents.params.hazard_id = aHazardId;
            model.qHazardContents.requery();
            hazardRoutes[aHazardId] = {
                route: []
            };
            model.qHazardContents.forEach(function(routeUsl) {
                hazardRoutes[aHazardId].route.push(routeUsl);
            });
        }
        return hazardRoutes[aHazardId];
    }
    
    function checkIfUslIsApplicable(aPatient, anUsluga) {
        var applicable = true;
         P.Logger.info('Проверяем возможность применения услуги к пациенту' + anUsluga);
        if (anUsluga.sex && anUsluga.sex !== aPatient.sex) applicable = false;
        if (anUsluga.limitation_age) {
            var patientAgeYears = (new Date).getFullYear() - aPatient.date_oft_birth.getFullYear();
            switch (anUsluga.limitation_age_type) {
                case 1: {
                        break
                }
                case 2: {//Older
                        if (anUsluga.limitation_age <= patientAgeYears)
                            applicable = false;
                        break;
                }
                case 3: {//Younger
                        if (anUsluga.limitation_age > patientAgeYears)
                            applicable = false;
                        break;
                }
            }
        }
        return applicable;
    }
    
    self.calculateRoute4Group = function(aPatients, anUslugi) {
        var patients = [];
        var uslugi = {};
        aPatients.forEach(function(aPatient) {
            var patient = patientM.getPatientSync(aPatient);
            patient.route = self.calculateRoute4Person(patient, anUslugi);
            patients.push(patient);
            for (var j in patient.route) {
                if (!uslugi[j]) {
                    uslugi[j] = {
                        usl_id: j,
                        people: 0,
                        usl_content: 0,
                        hazard: 0
                    };
                }
                uslugi[j].people++;
                if (patient.route[j].usl_content) 
                    uslugi[j].usl_content++;
                if (patient.route[j].hazard) 
                    uslugi[j].hazard++;
                P.Logger.info('Usluga_id: ' + j + ', people: ' + uslugi[j].people + ', usl_content: ' + uslugi[j].usl_content + ', hazard: ' + uslugi[j].hazard);
            };
        });
        var res = {
            patients: patients,
            uslugi: uslugi
        };
        P.Logger.info('Построение маршрутов завершено! ' + res);
        return res;
    };
    
    self.calculateRoute4Person = function(aPatient, anUslugi) {
        var patient = typeof aPatient === 'object' ? aPatient : patientM.getPatientSync(aPatient);
        patient.route = {};
        P.Logger.info('Получаем маршрут по слугам');
        anUslugi.forEach(function(uslId) {
            P.Logger.info('Обработка услуги ' + uslId);
            var uslRoute = getUslRoute(uslId);
            patient.doHazards = uslRoute.useHazards;
            uslRoute.route.forEach(function(routeUsl) {
                if (checkIfUslIsApplicable(patient, routeUsl)) {
                    P.Logger.info('Добавление услуги ' + routeUsl.usl_uslugi_id);
                    if (!patient.route[routeUsl.usl_uslugi_id]) {
                        patient.route[routeUsl.usl_uslugi_id] = {
                            usl_id: routeUsl.usl_uslugi_id,
                            usl_content: true,
                            hazard: false
                        };
                    } else {
                        patient.route[routeUsl.usl_uslugi_id].usl_content = true;
                    }
                }
            });
        });
//      если в услугах встретилась услуга с обработкой вредностей
        if (patient.doHazards) {
//            P.Logger.info('В услугах встретилась обработка вредностей');
            patient.hazards.forEach(function(hazard) {
//                P.Logger.info('Обработка вредности ' + hazard);
                var hazRoute = getHazardRoute(hazard);
                hazRoute.forEach(function(routeUsl) {
                    if (checkIfUslIsApplicable(patient, routeUsl)) {
                        P.Logger.info('Добавление услуги ' + routeUsl.usl_uslugi_id);
                        if (!patient.route[routeUsl.usl_uslugi_id]) {
                            patient.route[routeUsl.usl_uslugi_id] = {
                                usl_id: routeUsl.usl_uslugi_id,
                                usl_content: false,
                                hazard: true
                            };
                        } else {
                            patient.route[routeUsl.usl_uslugi_id].hazard = true;
                        }
                    }
                });
            });
        }
        P.Logger.info('Patient data ready');
        return patient.route;
    };
}
