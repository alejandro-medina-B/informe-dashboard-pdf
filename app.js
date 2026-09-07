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

    const url =
        "https://alejandro-medina-b.github.io/informe-dashboard-pdf/" +
        "?fechaInicial=" + encodeURIComponent(params.get("fechaInicial")) +
        "&fechaFinal=" + encodeURIComponent(params.get("fechaFinal")) +
        "&usuario=" + encodeURIComponent(params.get("usuario")) +
        "&nombreUsuario=" + encodeURIComponent(params.get("nombreUsuario")) +
        "&prospectosNuevos=" + encodeURIComponent(params.get("prospectosNuevos")) +
        "&prospectosEnSeguimiento=" + encodeURIComponent(params.get("prospectosEnSeguimiento")) +
        "&actividades=" + encodeURIComponent(params.get("actividades")) +
        "&tasaExito=" + encodeURIComponent(params.get("tasaExito")) +
        "&eficienciaGlobal=" + encodeURIComponent(params.get("eficienciaGlobal")) +
        "&eficienciaSeguimiento=" + encodeURIComponent(params.get("eficienciaSeguimiento")) +
        "&eficienciaTrabajo=" + encodeURIComponent(params.get("eficienciaTrabajo")) +
        "&eficienciaCierre=" + encodeURIComponent(params.get("eficienciaCierre")) +
        "&PipelineMomentum=" + encodeURIComponent(params.get("PipelineMomentum")) +
        "&TextoPipelineMomentum=" + encodeURIComponent(params.get("TextoPipelineMomentum")) +
        "&PipelineHealthScore=" + encodeURIComponent(params.get("PipelineHealthScore")) +
        "&PipelineHealthTexto=" + encodeURIComponent(params.get("PipelineHealthTexto")) +
        "&ForecastCierres=" + encodeURIComponent(params.get("ForecastCierres")) +
        "&ForecastCierresTexto=" + encodeURIComponent(params.get("ForecastCierresTexto"));

    window.open(url, "_blank");
};
