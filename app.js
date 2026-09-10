document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    function setValue(id, value) {
        const el = document.getElementById(id);
        if (el) el.innerText = value ?? "";
    }

    // DASHBOARD
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

    // PDF
    setValue("pdfUsuario", params.get("nombreUsuario"));

    const fechaIni = params.get("fechaInicial");
    const fechaFin = params.get("fechaFinal");
    setValue("pdfPeriodo", `${fechaIni} - ${fechaFin}`);

    setValue("pdfEficienciaGlobal", params.get("eficienciaGlobal"));
    setValue("pdfEficienciaGlobal2", params.get("eficienciaGlobal"));

    setValue("pdfProspectosNuevos", params.get("prospectosNuevos"));
    setValue("pdfProspectosEnSeguimiento", params.get("prospectosEnSeguimiento"));
    setValue("pdfActividades", params.get("actividades"));

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

    // PDF GENERATION
    const btn = document.getElementById("btnGenerarPDF");
    const element = document.getElementById("pdfContainer");

    btn.addEventListener("click", () => {

        const nombreUsuario = params.get("nombreUsuario") || "Usuario";
        const nombreArchivo = nombreUsuario
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");

        const opt = {
            margin: 0.5,
            filename: `Reporte-Pipeline-${nombreArchivo}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    });

});
