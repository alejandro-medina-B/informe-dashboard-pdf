/* ============================
   LECTURA DE PARÁMETROS
   ============================ */

const params = new URLSearchParams(window.location.search);

/* ============================
   LLENADO DEL DASHBOARD
   ============================ */

// Panel izquierdo
document.getElementById("nombreUsuario").innerText = params.get("nombreUsuario");
document.getElementById("fechaInicial").innerText = params.get("fechaInicial");
document.getElementById("fechaFinal").innerText = params.get("fechaFinal");

// Pipeline
document.getElementById("prospectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("prospectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("actividades").innerText = params.get("actividades");
document.getElementById("tasaExito").innerText = params.get("tasaExito");

// KPIs
document.getElementById("eficienciaGlobal").innerText = params.get("eficienciaGlobal");
document.getElementById("eficienciaSeguimiento").innerText = params.get("eficienciaSeguimiento");
document.getElementById("eficienciaTrabajo").innerText = params.get("eficienciaTrabajo");
document.getElementById("eficienciaCierre").innerText = params.get("eficienciaCierre");

// Momentum
document.getElementById("PipelineMomentum").innerText = params.get("PipelineMomentum");
document.getElementById("TextoPipelineMomentum").innerText = params.get("TextoPipelineMomentum");

// Salud del pipeline
document.getElementById("PipelineHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("PipelineHealthTexto").innerText = params.get("PipelineHealthTexto");

// Forecast
document.getElementById("ForecastCierres").innerText = params.get("ForecastCierres");
document.getElementById("ForecastCierresTexto").innerText = params.get("ForecastCierresTexto");

/* ============================
   LLENADO DEL PDF
   ============================ */

// Usuario y fechas
document.getElementById("pdfUsuario").innerText = params.get("nombreUsuario");
document.getElementById("pdfFechaInicial").innerText = params.get("fechaInicial");
document.getElementById("pdfFechaFinal").innerText = params.get("fechaFinal");

// KPIs principales
document.getElementById("pdfEficienciaGlobal").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfProspectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("pdfProspectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("pdfActividades").innerText = params.get("actividades");
document.getElementById("pdfTasaExito").innerText = params.get("tasaExito");

// Derivados
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

// Salud
document.getElementById("pdfHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("pdfHealthTexto").innerText = params.get("PipelineHealthTexto");

// Forecast
document.getElementById("pdfForecast").innerText = params.get("ForecastCierres");
document.getElementById("pdfForecastTexto").innerText = params.get("ForecastCierresTexto");

/* ============================
   GENERAR PDF
   ============================ */

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
