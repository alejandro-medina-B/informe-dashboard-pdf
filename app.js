const params = new URLSearchParams(window.location.search);

function setValue(id, param) {
    document.getElementById(id).innerText = params.get(param) || "—";
}

setValue("usuario", "usuario");
setValue("fechaInicial", "fechaInicial");
setValue("fechaFinal", "fechaFinal");

setValue("totalOportunidades", "totalOportunidades");
setValue("actividades", "actividades");
setValue("tasaExito", "tasaExito");

setValue("eficienciaGlobal", "eficienciaGlobal");
setValue("eficienciaSeguimiento", "eficienciaSeguimiento");
setValue("eficienciaCierre", "eficienciaCierre");
setValue("eficienciaTrabajo", "eficienciaTrabajo");

setValue("momentum", "momentum");
setValue("ritmo", "ritmo");

setValue("pipelineHealth", "pipelineHealth");
setValue("velocity", "velocity");

setValue("forecast", "forecast");

document.getElementById("btnGenerarPDF").onclick = () => {
    window.open(window.location.href, "_blank");
};
