/* ============================
   LECTURA DE PARÁMETROS
   ============================ */

const params = new URLSearchParams(window.location.search);

/* ============================
   LLENADO DE CAMPOS DEL PDF
   ============================ */

// Usuario y fechas
document.getElementById("pdfUsuario").innerText = params.get("usuario");
document.getElementById("pdfFechaInicial").innerText = params.get("fechaInicial");
document.getElementById("pdfFechaFinal").innerText = params.get("fechaFinal");

// KPIs principales
document.getElementById("pdfEficienciaGlobal").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfProspectosNuevos").innerText = params.get("prospectosNuevos");
document.getElementById("pdfProspectosEnSeguimiento").innerText = params.get("prospectosEnSeguimiento");
document.getElementById("pdfActividades").innerText = params.get("actividades");
document.getElementById("pdfTasaExito").innerText = params.get("tasaExito");
document.getElementById("pdfActividadPorProspecto").innerText = params.get("actividadPorProspecto");
document.getElementById("pdfTasaCierre").innerText = params.get("tasaCierre");

// KPIs secundarios
document.getElementById("pdfEficienciaGlobalKPI").innerText = params.get("eficienciaGlobal");
document.getElementById("pdfEficienciaSeguimiento").innerText = params.get("eficienciaSeguimiento");
document.getElementById("pdfEficienciaTrabajo").innerText = params.get("eficienciaTrabajo");
document.getElementById("pdfEficienciaCierre").innerText = params.get("eficienciaCierre");

// Momentum
document.getElementById("pdfMomentum").innerText = params.get("PipelineMomentum");
document.getElementById("pdfTextoMomentum").innerText = params.get("TextoPipelineMomentum");

// Salud del Pipeline
document.getElementById("pdfHealthScore").innerText = params.get("PipelineHealthScore");
document.getElementById("pdfHealthTexto").innerText = params.get("PipelineHealthTexto");

// Forecast
document.getElementById("pdfForecast").innerText = params.get("ForecastCierres");
document.getElementById("pdfForecastTexto").innerText = params.get("ForecastCierresTexto");

/* ============================
   ACTIVIDADES POR OPORTUNIDAD
   ============================ */

const actividadesJSON = params.get("actividadesJSON");

let actividades = [];
try {
    actividades = JSON.parse(actividadesJSON);
} catch (e) {
    console.error("Error al parsear actividadesJSON:", e);
}

/* Agrupar por oportunidad */
const actividadesPorOportunidad = {};

actividades.forEach(act => {
    const opID = act.oportunidadID;

    if (!actividadesPorOportunidad[opID]) {
        actividadesPorOportunidad[opID] = {
            nombre: act.oportunidadNombre,
            actividades: []
        };
    }

    actividadesPorOportunidad[opID].actividades.push(act);
});

/* Ordenar cada grupo por fecha + hora */
Object.keys(actividadesPorOportunidad).forEach(opID => {
    actividadesPorOportunidad[opID].actividades.sort((a, b) => {
        const fechaA = new Date(`${a.fecha} ${a.hora}`);
        const fechaB = new Date(`${b.fecha} ${b.hora}`);
        return fechaA - fechaB;
    });
});

/* Construir HTML dinámico */
let htmlActividades = `
<h2 style="font-size:26px; border-bottom:2px solid #ddd; padding-bottom:8px; margin-top:50px;">
    ACTIVIDADES POR OPORTUNIDAD
</h2>
<div style="margin-top:25px; font-size:16px; line-height:1.45;">
`;

Object.keys(actividadesPorOportunidad).forEach(opID => {
    const grupo = actividadesPorOportunidad[opID];

    htmlActividades += `
        <h3 style="margin-top:30px; font-size:20px; font-weight:600;">
            ${grupo.nombre}
        </h3>
    `;

    grupo.actividades.forEach(act => {
        htmlActividades += `
            <p style="margin:8px 0;">
                <strong>${act.fecha} ${act.hora}</strong> — 
                <em>${act.actividad}</em><br>
                ${act.comentario || ""}
            </p>
        `;
    });
});

htmlActividades += `</div>`;

/* Insertar en el PDF */
document.getElementById("pdfContainer").innerHTML += htmlActividades;

/* ============================
   GENERAR PDF
   ============================ */

document.getElementById("btnGenerarPDF").addEventListener("click", () => {
    const element = document.getElementById("pdfContainer");

    const opt = {
        margin: 0.5,
        filename: "Reporte-Ejecutivo-Pipeline.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
});
