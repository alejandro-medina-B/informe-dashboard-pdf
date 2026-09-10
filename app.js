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

// Periodo combinado: "fechaInicial - fechaFinal"
const fechaIni = params.get("fechaInicial");
const fechaFin = params.get("fechaFinal");
setValue("pdfPeriodo", (fechaIni && fechaFin) ? `${fechaIni} - ${fechaFin}` : "");

setValue("pdfEficienciaGlobal", params.get("eficienciaGlobal"));
setValue("pdfEficienciaGlobal2", params.get("eficienciaGlobal")); // se repite en la sección de KPIs
setValue("pdfProspectosNuevos", params.get("prospectosNuevos"));
setValue("pdfProspectosEnSeguimiento", params.get("prospectosEnSeguimiento"));
setValue("pdfActividades", params.get("actividades"));
setValue("pdfTasaExito", params.get("tasaExito"));

setValue("pdfCierreGanado", params.get("cierreGanado"));
setValue("pdfCierrePerdido", params.get("cierrePerdido"));

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
document.getElementById("btnGenerarPDF").addEventListener("click", (evt) => {

    const boton = evt.currentTarget;
    const element = document.getElementById("pdfContainer");

    // Nombre de archivo seguro (sin espacios ni caracteres raros)
    const nombreArchivo = (params.get("nombreUsuario") || "Usuario")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

    boton.disabled = true;
    const textoOriginal = boton.innerText;
    boton.innerText = "Generando PDF...";

    // Capturamos el reporte directamente con html2canvas (control total,
    // sin pasar por el envoltorio automático de html2pdf.js que causaba
    // los recortes). Luego solo usamos html2pdf.js para armar el PDF a
    // partir de esa imagen ya capturada.
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY
    }).then((canvas) => {
        const opt = {
            margin: 0.5,
            filename: `Reporte-Pipeline-${nombreArchivo}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };
        return html2pdf().set(opt).from(canvas, "canvas").toPdf().save();
    }).catch((err) => {
        console.error("Error al generar el PDF:", err);
        alert("Ocurrió un error generando el PDF. Revisa la consola del navegador para más detalles.");
    }).finally(() => {
        boton.disabled = false;
        boton.innerText = textoOriginal;
    });
});
