/**
 * 
 * @author root
 * @constructor
 */ 
function TreatCalculator() {
    var self = this, model = P.loadModel(this.constructor.name);
    var patientM = new Patient();
    
    var uslRoutes = {};
    function getUslRoute(anUslugaId) {
        if (!uslRoutes[anUslugaId]) {
            model.qUslugaContents.params.usluga_id = anUslugaId;
            model.qUslugaContents.requery();
            model.qUslugaById.params.usluga_id = anUslugaId;
            model.qUslugaById.requery();
            uslRoutes[anUslugaId] = {
                route: [],
                useHazards: model.qUslugaById.cursor.use_hazards
            };

            model.qUslugaContents.forEach(function(routeUsl) {
                uslRoutes[anUslugaId].route.push(routeUsl);
            });
        }
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
            patient.route.forEach(function(routeUsl) {
                //TODO HERE
            });
        });
    };
    
    self.calculateRoute4Person = function(aPatient, anUslugi) {
        var patient = typeof aPatient === 'object' ? aPatient : patientM.getPatientSync(aPatient);
        patient.route = {};
        anUslugi.forEach(function(uslId) {
            var uslRoute = getUslRoute(uslId);
            patient.doHazards = uslRoute.useHazards;
            uslRoute.route.forEach(function(routeUsl) {
                if (checkIfUslIsApplicable(patient, routeUsl)) {
                    patient.route[routeUsl.usl_uslugi_id] = {
                        usl_id: routeUsl.usl_uslugi_id,
                        usl_content: true,
                        hazard: false
                    };
                }
            });
        });
        if (patient.doHazards) {
            patient.hazards.forEach(function(hazard) {
                var hazRoute = getHazardRoute(hazard);
                hazRoute.forEach(function(routeUsl) {
                    if (checkIfUslIsApplicable(patient, routeUsl)) {
                        if (!patient.route[routeUsl.usl_uslugi_id])
                            patient.route[routeUsl.usl_uslugi_id] = {
                                usl_id: routeUsl.usl_uslugi_id,
                                usl_content: false,
                                hazard: true
                            };
                        else
                            patient.route[routeUsl.usl_uslugi_id].hazard = true;
                    }
                });
            });
        }
        
        return patient.route;
    };
}
