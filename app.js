/* ============================
   LECTURA DE PARÁMETROS
   ============================ */

const params = new URLSearchParams(window.location.search);

/* ============================
   LLENADO DE CAMPOS DEL PDF
   ============================ */

// Usuario y fechas
document.getElementById("pdfUsuario").innerText = params.get("usuario");
document.getElementById("pdfFechaInicial").innerText = params.get("fechaInicial");
document.getElementById("pdfFechaFinal").innerText = params.get("fechaFinal");

// KPIs principales
document.getElementById("pdfEficienciaGlobal").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfProspectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("pdfProspectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("pdfActividades").innerText = params.get("actividades");
document.getElementById("pdfTasaExito").innerText = params.get("tasaExito");
document.getElementById("pdfActividadPorProspecto").innerText = params.get("actividadPorProspecto");
document.getElementById("pdfTasaCierre").innerText = params.get("tasaCierre");

// KPIs secundarios
document.getElementById("pdfEficienciaGlobalKPI").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfEficienciaSeguimiento").innerText = params.get("eficienciaSeguimiento");
document.getElementById("pdfEficienciaTrabajo").innerText = params.get("eficienciaTrabajo");
document.getElementById("pdfEficienciaCierre").innerText = params.get("eficienciaCierre");

// Momentum
document.getElementById("pdfMomentum").innerText = params.get("PipelineMomentum");
document.getElementById("pdfTextoMomentum").innerText = params.get("TextoPipelineMomentum");

// Salud del Pipeline
document.getElementById("pdfHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("pdfHealthTexto").innerText = params.get("PipelineHealthTexto");

// Forecast
document.getElementById("pdfForecast").innerText = params.get("ForecastCierres");
document.getElementById("pdfForecastTexto").innerText = params.get("ForecastCierresTexto");

/* ============================
   GENERAR PDF
   ============================ */

document.getElementById("btnGenerarPDF").addEventListener("click", () => {
    const element = document.getElementById("pdfContainer");

    const opt = {
        margin: 0.5,
        filename: "Reporte-Ejecutivo-Pipeline.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
});
