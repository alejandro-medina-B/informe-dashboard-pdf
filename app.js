const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

/* DASHBOARD */
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

/* PDF */
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

/* MÉTODO SEGURO */
document.getElementById("btnGenerarPDF").onclick = () => {

    const pdf = document.getElementById("pdfContainer");

    // 1️⃣ Mostrar el contenedor PDF
    pdf.style.top = "0px";
    pdf.style.left = "0px";
    pdf.style.position = "absolute";
    pdf.style.zIndex = "9999";

    // 2️⃣ Esperar a que el navegador lo pinte
    setTimeout(() => {

        const opciones = {
            margin: 0.5,
            filename: "Reporte-Ejecutivo-Pipeline.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };

        html2pdf().set(opciones).from(pdf).save().then(() => {

            // 3️⃣ Ocultar el contenedor PDF de nuevo
            pdf.style.top = "-9999px";
            pdf.style.left = "-9999px";
            pdf.style.zIndex = "-1";

        });

    }, 800); // 800ms garantiza que el navegador lo renderice
};
