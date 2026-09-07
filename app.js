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

document.getElementById("btnGenerarPDF").onclick = () => {

    const element = document.body;

    const opciones = {
        margin: 0.5,
        filename: "Reporte-Pipeline.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opciones).from(element).save();
};
