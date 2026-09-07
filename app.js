// ===============================
// 1. Leer parámetros desde la URL
// ===============================
const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

// ===============================
// 2. Panel izquierdo
// ===============================
setValue("usuario", "usuario");
setValue("fechaInicial", "fechaInicial");
setValue("fechaFinal", "fechaFinal");

// ===============================
// 3. Pipeline
// ===============================
setValue("totalOportunidades", "totalOportunidades");
setValue("actividades", "actividades");
setValue("tasaExito", "tasaExito");

// ===============================
// 4. KPI: EFICIENCIA GLOBAL
// ===============================
setValue("eficienciaGlobal", "eficienciaGlobal");
setValue("eficienciaSeguimiento", "eficienciaSeguimiento");

// ===============================
// 5. KPI: MOMENTUM
// ===============================
setValue("PipelineMomentum", "PipelineMomentum");
setValue("TextoPipelineMomentum", "TextoPipelineMomentum");

// ===============================
// 6. KPI: SALUD DEL PIPELINE
// ===============================
setValue("PipelineHealthScore", "PipelineHealthScore");
setValue("PipelineHealthTexto", "PipelineHealthTexto");

// ===============================
// 7. KPI: FORECAST
// ===============================
setValue("ForecastCierres", "ForecastCierres");
setValue("ForecastCierresTexto", "ForecastCierresTexto");

// ===============================
// 8. Botón Generar PDF (mañana lo activamos)
// ===============================
document.getElementById("btnGenerarPDF").onclick = () => {
    alert("Mañana activamos la generación de PDF real.");
};
