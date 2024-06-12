// var cron = require('node-cron');

module.exports = app => {
    const { verificarToken } = app.middlewares.auth;
    const Peticion = app.controllers.peticiones;
    
    app.get('/obtenerParaGuardarUnidades', Peticion.obtenerParaGuardarUnidades);

    app.get('/obtenerParaGuardarUnidades', Peticion.obtenerParaGuardarUnidades);

    app.get('/obtenerVehiculos', Peticion.obtenerVehiculos);

    app.get('/obtenerSnapshot', Peticion.obtenerSnapshot);



    app.get('/obtenerReporte/:fechainicio/:fechafin', Peticion.obtenerReporte);
}



// id_unidad: element.id,
// auxInputType1: element.auxInputType1 != undefined  ? element.auxInputType1 : null,
// cameraSerial: element.cameraSerial != undefined  ? element.cameraSerial : null,
// samsara_serial: element['externalIds']['samsara.serial'] != undefined  ? element['externalIds']['samsara.serial'] : null,
// samsara_vin: element['externalIds']['samsara.vin'] != undefined  ? element['externalIds']['samsara.vin'] : null,
// gateway_serial: element['gateway'][0]['serial'] != undefined ? element['gateway'][0]['serial'] : null,
// gateway_model: element['gateway']['model'] != undefined ? element['gateway']['model'] : null,
// harshAccelerationSettingType: element.harshAccelerationSettingType,
// licensePlate: element.licensePlate != undefined ? element.licensePlate : null,
// make: element.make,
// model: element.model,
// name: element.name,
// notes: element.notes,
// serial: element.serial,
// staticAssignedDriver_id: element['staticAssignedDriver']['id'] != undefined ? element['staticAssignedDriver']['id'] : null,
// staticAssignedDriver_name: element['staticAssignedDriver']['name'] != undefined ? element['staticAssignedDriver']['name'] : null,
// vin: element.vin,
// year: element.year,
// vehicleRegulationMode: element.vehicleRegulationMode != undefined ? element.vehicleRegulationMode : null,
// createdAtTime: element.createdAtTime,
// updatedAtTime: element.updatedAtTime,
// esn: element.esn != undefined ? element.esn : null,