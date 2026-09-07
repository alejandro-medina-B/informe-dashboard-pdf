// ===============================
// 1. Leer parámetros desde la URL
// ===============================
const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

// ===============================
// 2. Insertar valores en el panel izquierdo
// ===============================
setValue("usuario", "usuario");
setValue("fechaInicial", "fechaInicial");
setValue("fechaFinal", "fechaFinal");

// ===============================
// 3. Insertar valores en el Pipeline
// ===============================
setValue("totalOportunidades", "totalOportunidades");
setValue("actividades", "actividades");
setValue("tasaExito", "tasaExito");

// ===============================
// 4. Insertar valores en KPIs
// ===============================
setValue("eficienciaGlobal", "eficienciaGlobal");
setValue("eficienciaSeguimiento", "eficienciaSeguimiento");
setValue("eficienciaCierre", "eficienciaCierre");
setValue("eficienciaTrabajo", "eficienciaTrabajo");

setValue("momentum", "momentum");
setValue("ritmo", "ritmo");

setValue("pipelineHealth", "pipelineHealth");
setValue("velocity", "velocity");

setValue("forecast", "forecast");

// ===============================
// 5. Botón Generar Reporte (misma página)
// ===============================
document.getElementById("btnGenerarPDF").onclick = () => {

    const baseURL = "https://alejandro-medina-b.github.io/informe-dashboard-pdf/";

    const url =
        baseURL +
        "?fechaInicial=" + params.get("fechaInicial") +
        "&fechaFinal=" + params.get("fechaFinal") +
        "&usuario=" + params.get("usuario") +
        "&totalOportunidades=" + params.get("totalOportunidades") +
        "&actividades=" + params.get("actividades") +
        "&eficienciaGlobal=" + params.get("eficienciaGlobal") +
        "&eficienciaSeguimiento=" + params.get("eficienciaSeguimiento") +
        "&eficienciaCierre=" + params.get("eficienciaCierre") +
        "&eficienciaTrabajo=" + params.get("eficienciaTrabajo") +
        "&tiempoInactividad=" + params.get("tiempoInactividad") +
        "&ritmo=" + params.get("ritmo") +
        "&tasaExito=" + params.get("tasaExito") +
        "&velocity=" + params.get("velocity") +
        "&momentum=" + params.get("momentum") +
        "&pipelineHealth=" + params.get("pipelineHealth") +
        "&forecast=" + params.get("forecast");

    // 🔥 ESTA LÍNEA ES LA QUE SOLUCIONA TODO
    window.location.href = url;
};
