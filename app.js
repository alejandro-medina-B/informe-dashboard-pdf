// ===============================
// CARGA DE PARÁMETROS DESDE URL
// ===============================
const params = new URLSearchParams(window.location.search);

// Función segura para asignar valores
function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value ?? "";
}

// ===============================
// ASIGNACIÓN DE VALORES AL DASHBOARD
// ===============================
setValue("nombreUsuario", params.get("nombreUsuario"));
setValue("fechaInicial", params.get("fechaInicial"));
setValue("fechaFinal", params.get("fechaFinal"));

setValue("prospectosNuevos", params.get("prospectosNuevos"));
setValue("prospectosEnSeguimiento", params.get("prospectosEnSeguimiento"));
setValue("actividades", params.get("actividades"));
setValue("actividadPromedio", params.get("actividadPorProspecto"));

setValue("cierreGanado", params.get("cierreGanado"));
setValue("cierrePerdido", params.get("cierrePerdido"));

setValue("eficienciaGlobal", params.get("eficienciaGlobal"));
setValue("eficienciaSeguimiento", params.get("eficienciaSeguimiento"));
setValue("eficienciaTrabajo", params.get("eficienciaTrabajo"));
setValue("eficienciaCierre", params.get("eficienciaCierre"));

setValue("PipelineMomentum", params.get("PipelineMomentum"));
setValue("TextoPipelineMomentum", params.get("TextoPipelineMomentum"));

setValue("PipelineHealthScore", params.get("PipelineHealthScore"));
setValue("PipelineHealthTexto", params.get("PipelineHealthTexto"));

setValue("ForecastCierres", params.get("ForecastCierres"));
setValue("ForecastCierresTexto", params.get("ForecastCierresTexto"));


// ===============================
// ASIGNACIÓN DE VALORES AL PDF
// ===============================
setValue("pdfUsuario", params.get("nombreUsuario"));
setValue("pdfFechaInicial", params.get("fechaInicial"));
setValue("pdfFechaFinal", params.get("fechaFinal"));

setValue("pdfEficienciaGlobal", params.get("eficienciaGlobal"));
setValue("pdfProspectosNuevos", params.get("prospectosNuevos"));
setValue("pdfProspectosEnSeguimiento", params.get("prospectosEnSeguimiento"));
setValue("pdfActividades", params.get("actividades"));
setValue("pdfTasaExito", params.get("tasaExito"));

setValue("pdfActividadPorProspecto", params.get("actividadPorProspecto"));
setValue("pdfTasaCierre", params.get("tasaCierre"));

setValue("pdfEficienciaSeguimiento", params.get("eficienciaSeguimiento"));
setValue("pdfEficienciaTrabajo", params.get("eficienciaTrabajo"));
setValue("pdfEficienciaCierre", params.get("eficienciaCierre"));

setValue("pdfMomentum", params.get("PipelineMomentum"));
setValue("pdfTextoMomentum", params.get("TextoPipelineMomentum"));

setValue("pdfHealthScore", params.get("PipelineHealthScore"));
setValue("pdfHealthTexto", params.get("PipelineHealthTexto"));

setValue("pdfForecast", params.get("ForecastCierres"));
setValue("pdfForecastTexto", params.get("ForecastCierresTexto"));


// ===============================
// GENERAR PDF
// ===============================
document.getElementById("btnGenerarPDF").addEventListener("click", () => {

    const element = document.getElementById("pdfContainer");

    const opt = {
        margin:       0.5,
        filename:     `Reporte-Pipeline-${params.get("nombreUsuario")}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
});
