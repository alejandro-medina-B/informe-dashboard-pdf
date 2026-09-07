const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

setValue("nombreUsuario", "nombreUsuario");
setValue("fechaInicial", "fechaInicial");
setValue("fechaFinal", "fechaFinal");

setValue("prospectosNuevos", "prospectosNuevos");
setValue("prospectosEnSeguimiento", "prospectosEnSeguimiento");
setValue("actividades", "actividades");
setValue("tasaExito", "tasaExito");

document.getElementById("eficienciaGlobal").innerText =
    params.get("eficienciaGlobal") ? params.get("eficienciaGlobal") + " %" : "—";

document.getElementById("eficienciaSeguimiento").innerText =
    params.get("eficienciaSeguimiento") ? params.get("eficienciaSeguimiento") + "% de seguimiento" : "";

document.getElementById("eficienciaTrabajo").innerText =
    params.get("eficienciaTrabajo") ? params.get("eficienciaTrabajo") + "% de trabajo" : "";

document.getElementById("eficienciaCierre").innerText =
    params.get("eficienciaCierre") ? params.get("eficienciaCierre") + "% de cierre" : "";

setValue("PipelineMomentum", "PipelineMomentum");
setValue("TextoPipelineMomentum", "TextoPipelineMomentum");

setValue("PipelineHealthScore", "PipelineHealthScore");
setValue("PipelineHealthTexto", "PipelineHealthTexto");

setValue("ForecastCierres", "ForecastCierres");
setValue("ForecastCierresTexto", "ForecastCierresTexto");

/* PDF VALUES */
document.getElementById("pdfUsuario").innerText = params.get("nombreUsuario");
document.getElementById("pdfFechaInicial").innerText = params.get("fechaInicial");
document.getElementById("pdfFechaFinal").innerText = params.get("fechaFinal");

document.getElementById("pdfProspectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("pdfProspectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("pdfActividades").innerText = params.get("actividades");
document.getElementById("pdfTasaExito").innerText = params.get("tasaExito");

document.getElementById("pdfEficienciaGlobal").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfEficienciaSeguimiento").innerText = params.get("eficienciaSeguimiento");
document.getElementById("pdfEficienciaTrabajo").innerText = params.get("eficienciaTrabajo");
document.getElementById("pdfEficienciaCierre").innerText = params.get("eficienciaCierre");

document.getElementById("pdfMomentum").innerText = params.get("PipelineMomentum");
document.getElementById("pdfTextoMomentum").innerText = params.get("TextoPipelineMomentum");

document.getElementById("pdfHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("pdfHealthTexto").innerText = params.get("PipelineHealthTexto");

document.getElementById("pdfForecast").innerText = params.get("ForecastCierres");
document.getElementById("pdfForecastTexto").innerText = params.get("ForecastCierresTexto");

/* GENERAR PDF */
document.getElementById("btnGenerarPDF").onclick = () => {

    const element = document.getElementById("pdfContainer");

    const opciones = {
        margin: 0.5,
        filename: "Reporte-Pipeline.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opciones).from(element).save();
};
