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
