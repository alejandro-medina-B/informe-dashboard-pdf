const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

// PANEL IZQUIERDO
setValue("usuario", "usuario");
setValue("fechaInicial", "fechaInicial");
setValue("fechaFinal", "fechaFinal");

// PIPELINE
setValue("prospectosNuevos", "prospectosNuevos");
setValue("prospectosEnSeguimiento", "prospectosEnSeguimiento");
setValue("actividades", "actividades");
setValue("tasaExito", "tasaExito");

// EFICIENCIA GLOBAL
const eficienciaGlobalValor = params.get("eficienciaGlobal");
document.getElementById("eficienciaGlobal").innerText =
    eficienciaGlobalValor ? eficienciaGlobalValor + " %" : "—";

const eficienciaSeguimientoValor = params.get("eficienciaSeguimiento");
document.getElementById("eficienciaSeguimiento").innerText =
    eficienciaSeguimientoValor ? eficienciaSeguimientoValor + "% de seguimiento" : "";

const eficienciaTrabajoValor = params.get("eficienciaTrabajo");
document.getElementById("eficienciaTrabajo").innerText =
    eficienciaTrabajoValor ? eficienciaTrabajoValor + "% de trabajo" : "";

const eficienciaCierreValor = params.get("eficienciaCierre");
document.getElementById("eficienciaCierre").innerText =
    eficienciaCierreValor ? eficienciaCierreValor + "% de cierre" : "";

// MOMENTUM
setValue("PipelineMomentum", "PipelineMomentum");
setValue("TextoPipelineMomentum", "TextoPipelineMomentum");

// SALUD DEL PIPELINE
setValue("PipelineHealthScore", "PipelineHealthScore");
setValue("PipelineHealthTexto", "PipelineHealthTexto");

// FORECAST
setValue("ForecastCierres", "ForecastCierres");
setValue("ForecastCierresTexto", "ForecastCierresTexto");

// BOTÓN PDF
document.getElementById("btnGenerarPDF").onclick = () => {
    alert("Aquí activaremos la generación de PDF.");
};
