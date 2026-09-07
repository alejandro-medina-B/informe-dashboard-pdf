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

/* GRÁFICAS SVG */

// Funnel
const prospectosTotales =
    Number(params.get("prospectosNuevos")) +
    Number(params.get("prospectosEnSeguimiento"));

const svgFunnel = `
<svg width="420" height="300">
  <polygon points="50,30 370,30 320,90 100,90" fill="#0057B8"></polygon>
  <text x="210" y="65" font-size="18" fill="white" text-anchor="middle">
    Prospectos Totales: ${prospectosTotales}
  </text>

  <polygon points="100,110 320,110 280,170 140,170" fill="#444"></polygon>
  <text x="210" y="145" font-size="18" fill="white" text-anchor="middle">
    Seguimiento: ${params.get("prospectosEnSeguimiento")}
  </text>

  <polygon points="140,190 280,190 240,240 180,240" fill="#2ECC71"></polygon>
  <text x="210" y="220" font-size="18" fill="white" text-anchor="middle">
    Cierre: ${params.get("tasaExito")}
  </text>
</svg>
`;

document.getElementById("svgFunnel").innerHTML = svgFunnel;

// Eficiencias
const svgEficiencias = `
<svg width="450" height="250">
  <rect x="30" y="200" width="100" height="-${params.get("eficienciaSeguimiento")}" fill="#0057B8"></rect>
  <text x="80" y="220" font-size="14" text-anchor="middle">Seguimiento</text>
  <text x="80" y="180" font-size="16" text-anchor="middle">${params.get("eficienciaSeguimiento")}%</text>

  <rect x="170" y="200" width="100" height="-${params.get("eficienciaTrabajo")}" fill="#F28C28"></rect>
  <text x="220" y="220" font-size="14" text-anchor="middle">Trabajo</text>
  <text x="220" y="180" font-size="16" text-anchor="middle">${params.get("eficienciaTrabajo")}%</text>

  <rect x="310" y="200" width="100" height="-${params.get("eficienciaCierre")}" fill="#E74C3C"></rect>
  <text x="360" y="220" font-size="14" text-anchor="middle">Cierre</text>
  <text x="360" y="180" font-size="16" text-anchor="middle">${params.get("eficienciaCierre")}%</text>
</svg>
`;

document.getElementById("svgEficiencias").innerHTML = svgEficiencias;

/* GENERAR PDF */
document.getElementById("btnGenerarPDF").onclick = () => {

    const pdf = document.getElementById("pdfContainer");

    pdf.style.visibility = "visible";

    setTimeout(() => {

        const opciones = {
            margin: 0.5,
            filename: "Reporte-Ejecutivo-Pipeline.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };

        html2pdf().set(opciones).from(pdf).save().then(() => {
            pdf.style.visibility = "hidden";
        });

    }, 600);
};
