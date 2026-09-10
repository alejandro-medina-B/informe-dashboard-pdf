const params = new URLSearchParams(window.location.search);

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value ?? "";
}

/* ============================
   LLENADO DEL DASHBOARD
   ============================ */

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

/* ============================
   LLENADO DEL PDF
   ============================ */

function setPDF(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value ?? "";
}

setPDF("pdfUsuario", params.get("nombreUsuario"));
setPDF("pdfFechaInicial", params.get("fechaInicial"));
setPDF("pdfFechaFinal", params.get("fechaFinal"));

setPDF("pdfEficienciaGlobal", params.get("eficienciaGlobal"));
setPDF("pdfEficienciaGlobal2", params.get("eficienciaGlobal"));

setPDF("pdfProspectosNuevos", params.get("prospectosNuevos"));
setPDF("pdfProspectosEnSeguimiento", params.get("prospectosEnSeguimiento"));
setPDF("pdfActividades", params.get("actividades"));

setPDF("pdfCierreGanado", params.get("cierreGanado"));
setPDF("pdfCierrePerdido", params.get("cierrePerdido"));

setPDF("pdfActividadPorProspecto", params.get("actividadPorProspecto"));
setPDF("pdfTasaCierre", params.get("tasaCierre"));

setPDF("pdfEficienciaSeguimiento", params.get("eficienciaSeguimiento"));
setPDF("pdfEficienciaTrabajo", params.get("eficienciaTrabajo"));
setPDF("pdfEficienciaCierre", params.get("eficienciaCierre"));

setPDF("pdfMomentum", params.get("PipelineMomentum"));
setPDF("pdfTextoMomentum", params.get("TextoPipelineMomentum"));

setPDF("pdfHealthScore", params.get("PipelineHealthScore"));
setPDF("pdfHealthTexto", params.get("PipelineHealthTexto"));

setPDF("pdfForecast", params.get("ForecastCierres"));
setPDF("pdfForecastTexto", params.get("ForecastCierresTexto"));

/
