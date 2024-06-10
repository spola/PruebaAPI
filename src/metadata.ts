/* eslint-disable */
export default async () => {
    const t = {
        ["./procesos/entities/proceso.entity"]: await import("./procesos/entities/proceso.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./procesos/dto/create-proceso.dto"), { "CreateProcesoDto": {} }], [import("./procesos/dto/update-proceso.dto"), { "UpdateProcesoDto": {} }], [import("./procesos/entities/proceso.entity"), { "Proceso": { id: { required: true, type: () => Number }, referencia: { required: true, type: () => String }, centroCostoId: { required: true, type: () => Number }, fechaCreacion: { required: true, type: () => Date } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./health/health.controller"), { "HealthController": { "check": { type: Object } } }], [import("./procesos/procesos.controller"), { "ProcesosController": { "create": { type: String }, "findAll": { type: [t["./procesos/entities/proceso.entity"].Proceso] }, "findOne": { type: t["./procesos/entities/proceso.entity"].Proceso }, "update": { type: String }, "remove": { type: String } } }]] } };
};