const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

// PANEL IZQUIERDO
setValue("usuario", "usuario");
setValue("fechaInicial", "fechaInicial");
setValue("fechaFinal", "fechaFinal");

// PIPELINE
setValue("totalOportunidades", "totalOportunidades");
setValue("actividades", "actividades");
setValue("tasaExito", "tasaExito");

// EFICIENCIA GLOBAL
setValue("eficienciaGlobal", "eficienciaGlobal");
setValue("eficienciaSeguimiento", "eficienciaSeguimiento");

// MOMENTUM
setValue("PipelineMomentum", "PipelineMomentum");
setValue("TextoPipelineMomentum", "TextoPipelineMomentum");

// SALUD DEL PIPELINE
setValue("PipelineHealthScore", "PipelineHealthScore");
setValue("PipelineHealthTexto", "PipelineHealthTexto");

// FORECAST
setValue("ForecastCierres", "ForecastCierres");
setValue("ForecastCierresTexto", "ForecastCierresTexto");

// BOTÓN PDF (mañana lo activamos)
document.getElementById("btnGenerarPDF").onclick = () => {
    alert("Mañana activamos la generación de PDF real.");
};
