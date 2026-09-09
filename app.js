const params = new URLSearchParams(window.location.search);

/* Panel izquierdo */
document.getElementById("nombreUsuario").innerText = params.get("nombreUsuario");
document.getElementById("fechaInicial").innerText = params.get("fechaInicial");
document.getElementById("fechaFinal").innerText = params.get("fechaFinal");

/* Pipeline */
document.getElementById("prospectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("prospectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("actividades").innerText = params.get("actividades");

/* Actividad promedio */
document.getElementById("actividadPromedio").innerText =
    params.get("actividadPorProspecto");

/* Cierre Ganado (tarjeta verde) */
document.getElementById("cierreGanado").innerText =
    params.get("tasaExito") || 0;

/* Cierre Perdido (si después lo conectas) */
document.getElementById("cierrePerdido").innerText =
    params.get("cierrePerdido") || 0;

/* KPIs principales */
document.getElementById("eficienciaGlobal").innerText = params.get("eficienciaGlobal");

document.getElementById("eficienciaSeguimiento").innerText =
    params.get("eficienciaSeguimiento") + "% de seguimiento";

document.getElementById("eficienciaTrabajo").innerText =
    params.get("eficienciaTrabajo") + "% de trabajo";

document.getElementById("eficienciaCierre").innerText =
    params.get("eficienciaCierre") + "% de cierre";

/* Momentum */
document.getElementById("PipelineMomentum").innerText = params.get("PipelineMomentum");
document.getElementById("TextoPipelineMomentum").innerText = params.get("TextoPipelineMomentum");

/* Salud */
document.getElementById("PipelineHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("PipelineHealthTexto").innerText = params.get("PipelineHealthTexto");

/* Forecast */
document.getElementById("ForecastCierres").innerText = params.get("ForecastCierres");
document.getElementById("ForecastCierresTexto").innerText = params.get("ForecastCierresTexto");

/* PDF */
document.getElementById("pdfUsuario").innerText = params.get("nombreUsuario");
document.getElementById("pdfFechaInicial").innerText = params.get("fechaInicial");
document.getElementById("pdfFechaFinal").innerText = params.get("fechaFinal");

document.getElementById("pdfEficienciaGlobal").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfProspectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("pdfProspectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("pdfActividades").innerText = params.get("actividades");
document.getElementById("pdfTasaExito").innerText = params.get("tasaExito");

document.getElementById("pdfActividadPorProspecto").innerText = params.get("actividadPorProspecto");
document.getElementById("pdfTasaCierre").innerText = params.get("tasaCierre");

document.getElementById("pdfEficienciaGlobalKPI").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfEficienciaSeguimiento").innerText = params.get("eficienciaSeguimiento");
document.getElementById("pdfEficienciaTrabajo").innerText = params.get("eficienciaTrabajo");
document.getElementById("pdfEficienciaCierre").innerText = params.get("eficienciaCierre");

document.getElementById("pdfMomentum").innerText = params.get("PipelineMomentum");
document.getElementById("pdfTextoMomentum").innerText = params.get("TextoPipelineMomentum");

document.getElementById("pdfHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("pdfHealthTexto").innerText = params.get("PipelineHealthTexto");

document.getElementById("pdfForecast").innerText = params.get("ForecastCierres");
document.getElementById("pdfForecastTexto").innerText = params.get("ForecastCierresTexto");

/* PDF GENERATOR */
document.getElementById("btnGenerarPDF").addEventListener("click", () => {

    const pdfContainer = document.getElementById("pdfContainer");
    pdfContainer.style.display = "block";

    const opt = {
        margin: 0.5,
        filename: "Reporte-Ejecutivo-Pipeline.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opt).from(pdfContainer).save().then(() => {
        pdfContainer.style.display = "none";
    });
});
