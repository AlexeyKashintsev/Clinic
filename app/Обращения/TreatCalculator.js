/**
 * 
 * @author Alexey
 * @constructor
 * @public
 */ 
function TreatCalculator() {
    var self = this, model = P.loadModel(this.constructor.name);
    var patientM = new Patient();
    var jsl = new jslFormatter();
    var errors = false;
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
        }
//        P.Logger.info('Услуги в маршруте: ' + logIt(uslRoutes[anUslugaId]));
        return uslRoutes[anUslugaId];
    }
    
    function logIt(aObjToLog) {
//        P.Logger.info(jsl + ' ' + jsl.format);
        P.Logger.info(jsl.formatJSON(JSON.stringify(aObjToLog)));
    }
    
    var hazardRoutes = {};
    function getHazardRoute(aHazard) {
        aHazard = typeof aHazard === 'object' ? aHazard.hazards_id : aHazard;
        if (!hazardRoutes[aHazard]) {
            model.qHazardContents.params.hazard_id = aHazard;
            model.qHazardContents.requery();
            P.Logger.info('Вредность ' + aHazard + ' Длина маршрута ' + model.qHazardContents.length);
            hazardRoutes[aHazard] = {
                route: []
            };
            model.qHazardContents.forEach(function(routeUsl) {
                hazardRoutes[aHazard].route.push(routeUsl);
            });
        }
//        logIt(hazardRoutes[aHazard].route);
        return hazardRoutes[aHazard].route;
    }
    
    function checkIfUslIsApplicable(aPatient, anUsluga) {
        var applicable = true;
        P.Logger.info('Проверяем возможность применения услуги к пациенту ' + anUsluga.route_usl);
        try {
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
        } catch (e) {
            P.Logger.warning('Невозможно проверить примененимость услуги к пациенту ' + aPatient.surname + ' ' + aPatient.firstname
                    + (!aPatient.sex ? ', не указан пол пациента'  : '')
                    + (!aPatient.date_oft_birth ? ', не указана дата рождения' : ''));
        }
        return applicable;
    }
    
    self.calculateRoute4Group = function(aPatients, anUslugi) {
        var patients = [];
        var uslugi = {};
        aPatients.forEach(function(aPatient) {
            var patient = self.calculateRoute4Person(aPatient, anUslugi);
//            logIt(patient);
            patients.push(patient);
//            logIt(patients);
            
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
            };
        });
        var res = {
            patients: patients,
            uslugi: uslugi
        };
//        logIt(res);
        P.Logger.info('Построение маршрутов завершено! ' + res);
        return res;
    };
    
    self.calculateRoute4Person = function(aPatient, anUslugi) {
        var patient = typeof aPatient === 'object' ? aPatient : patientM.getPatientSync(aPatient);
        patient.route = {};
        P.Logger.info('Расчет маршрута для пациента');
        anUslugi.forEach(function(uslId) {
            P.Logger.info('Обработка услуги ' + uslId);
            var uslRoute = getUslRoute(uslId);
            patient.doHazards = uslRoute.useHazards;
            uslRoute.route.forEach(function(routeUsl) {
                if (checkIfUslIsApplicable(patient, routeUsl)) {
                    var uslId = routeUsl.route_usl ? routeUsl.route_usl : routeUsl.usl_uslugi_id;
                    P.Logger.info('Добавление услуги ' + uslId);
                    if (!patient.route[uslId]) {
                        patient.route[uslId] = {
                            usl_id: uslId,
                            usl_content: true,
                            hazard: false
                        };
                    } else {
                        patient.route[routeUsl.route_usl].usl_content = true;
                    }
                }
            });
        });
//      если в услугах встретилась услуга с обработкой вредностей
        if (patient.doHazards) {
            P.Logger.info('В услугах встретилась обработка вредностей');
            patient.hazards.forEach(function(hazard) {
                P.Logger.info('Обработка вредности ' + hazard);
                var hazRoute = getHazardRoute(hazard);
                P.Logger.info('Маршрут по вредности  получен ' + hazRoute);
                hazRoute.forEach(function(routeUsl) {
                    if (checkIfUslIsApplicable(patient, routeUsl)) {
                        P.Logger.info('Добавление услуги ' + routeUsl.route_usl);
                        if (!patient.route[routeUsl.route_usl]) {
                            patient.route[routeUsl.route_usl] = {
                                usl_id: routeUsl.route_usl,
                                usl_content: false,
                                hazard: true
                            };
                        } else {
                            patient.route[routeUsl.route_usl].hazard = true;
                        }
                    }
                });
            });
        }
        P.Logger.info('Patient data ready');
//        logIt(patient.route);
        return patient;
    };
}
