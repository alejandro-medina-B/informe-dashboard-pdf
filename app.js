document.addEventListener("DOMContentLoaded", async () => {

    /* ============================
       LECTURA DE PARÁMETROS
       ============================ */

    const params = new URLSearchParams(window.location.search);

    function getParam(name) {
        return params.get(name) || "";
    }

    const filtroID = getParam("filtroID"); // NUEVO: solo recibimos el ID del filtro


    /* ============================
       DESCARGAR ACTIVIDADES DESDE APPSHEET API
       ============================ */

    async function cargarActividadesDesdeAPI(filtroID) {

        const url = `https://api.appsheet.com/api/v2/apps/<APP_ID>/tables/DBFiltrado/records/${filtroID}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "ApplicationAccessKey": "<API_KEY>"
                }
            });

            const data = await res.json();

            if (!data || !data.ActividadesJSON) {
                console.error("No se encontró ActividadesJSON en el registro.");
                return [];
            }

            return JSON.parse(data.ActividadesJSON);

        } catch (error) {
            console.error("Error al obtener actividades desde AppSheet API:", error);
            return [];
        }
    }


    /* ============================
       LLENADO DE CAMPOS DEL PDF
       ============================ */

    document.getElementById("pdfUsuario").innerText = getParam("usuario");
    document.getElementById("pdfFechaInicial").innerText = getParam("fechaInicial");
    document.getElementById("pdfFechaFinal").innerText = getParam("fechaFinal");

    document.getElementById("pdfEficienciaGlobal").innerText = getParam("eficienciaGlobal");
    document.getElementById("pdfProspectosNuevos").innerText = getParam("prospectosNuevos");
    document.getElementById("pdfProspectosEnSeguimiento").innerText = getParam("prospectosEnSeguimiento");
    document.getElementById("pdfActividades").innerText = getParam("actividades");
    document.getElementById("pdfTasaExito").innerText = getParam("tasaExito");
    document.getElementById("pdfActividadPorProspecto").innerText = getParam("actividadPorProspecto");
    document.getElementById("pdfTasaCierre").innerText = getParam("tasaCierre");

    document.getElementById("pdfEficienciaGlobalKPI").innerText = getParam("eficienciaGlobal");
    document.getElementById("pdfEficienciaSeguimiento").innerText = getParam("eficienciaSeguimiento");
    document.getElementById("pdfEficienciaTrabajo").innerText = getParam("eficienciaTrabajo");
    document.getElementById("pdfEficienciaCierre").innerText = getParam("eficienciaCierre");

    document.getElementById("pdfMomentum").innerText = getParam("PipelineMomentum");
    document.getElementById("pdfTextoMomentum").innerText = getParam("TextoPipelineMomentum");

    document.getElementById("pdfHealthScore").innerText = getParam("PipelineHealthScore");
    document.getElementById("pdfHealthTexto").innerText = getParam("PipelineHealthTexto");

    document.getElementById("pdfForecast").innerText = getParam("ForecastCierres");
    document.getElementById("pdfForecastTexto").innerText = getParam("ForecastCierresTexto");


    /* ============================
       ACTIVIDADES POR OPORTUNIDAD (API)
       ============================ */

    const actividades = await cargarActividadesDesdeAPI(filtroID);

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

    Object.keys(actividadesPorOportunidad).forEach(opID => {
        actividadesPorOportunidad[opID].actividades.sort((a, b) => {
            const fechaA = new Date(`${a.fecha} ${a.hora}`);
            const fechaB = new Date(`${b.fecha} ${b.hora}`);
            return fechaA - fechaB;
        });
    });

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

    document.getElementById("pdfContainer").innerHTML += htmlActividades;


    /* ============================
       GENERAR PDF
       ============================ */

    document.getElementById("btnGenerarPDF").addEventListener("click", () => {

        const element = document.getElementById("pdfContainer");

        element.style.display = "block";

        const opt = {
            margin: 0.5,
            filename: "Reporte-Ejecutivo-Pipeline.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.style.display = "none";
        });
    });

});
