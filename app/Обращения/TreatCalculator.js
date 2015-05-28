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
    
    self.calculateRoute4Group = function(aPatients, anUslugi) {
        
    };
    
    self.calculateRoute4Person = function(aPatient, anUslugi) {
        var patient = patientM.getPatientSync(aPatient);
        patient.route = {};
        anUslugi.forEach(function(uslId) {
            var uslRoute = getUslRoute(uslId);
            patient.doHazards = uslRoute.useHazards;
            uslRoute.route.forEach(function(routeUsl) {
                //TODO Here
            });
        });
    };
}
