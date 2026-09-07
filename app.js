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
// 4. KPIs nuevos
// ===============================
setValue("PipelineMomentum", "PipelineMomentum");
setValue("TextoPipelineMomentum", "TextoPipelineMomentum");

setValue("PipelineHealthScore", "PipelineHealthScore");
setValue("PipelineHealthTexto", "PipelineHealthTexto");

setValue("ForecastCierres", "ForecastCierres");
setValue("ForecastCierresTexto", "ForecastCierresTexto");

// ===============================
// 5. Botón Generar PDF (mañana lo activamos)
// ===============================
document.getElementById("btnGenerarPDF").onclick = () => {
    alert("Mañana activamos la generación de PDF real.");
};
