// ===============================
// CARGA DE PARÁMETROS DESDE URL
// ===============================
const params = new URLSearchParams(window.location.search);
 
// Función segura para asignar valores
function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value ?? "";
}
 
// ===============================
// ASIGNACIÓN DE VALORES AL DASHBOARD
// ===============================
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
 
 
// ===============================
// ASIGNACIÓN DE VALORES AL PDF
// ===============================
setValue("pdfUsuario", params.get("nombreUsuario"));
 
// Periodo combinado: "fechaInicial - fechaFinal"
const fechaIni = params.get("fechaInicial");
const fechaFin = params.get("fechaFinal");
setValue("pdfPeriodo", (fechaIni && fechaFin) ? `${fechaIni} - ${fechaFin}` : "");
 
setValue("pdfEficienciaGlobal", params.get("eficienciaGlobal"));
setValue("pdfEficienciaGlobal2", params.get("eficienciaGlobal")); // se repite en la sección de KPIs
setValue("pdfProspectosNuevos", params.get("prospectosNuevos"));
setValue("pdfProspectosEnSeguimiento", params.get("prospectosEnSeguimiento"));
setValue("pdfActividades", params.get("actividades"));
setValue("pdfTasaExito", params.get("tasaExito"));
 
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
 
// ===============================
// DETALLE DE ACTIVIDADES (tabla)
// ===============================
// Formato esperado del parámetro "actividadesDetalle" (construido en AppSheet
// a partir de la lista de OportunidadesActividades YA FILTRADA con los mismos
// criterios del dashboard — fecha inicial/final y usuario):
//
//   "Fecha|Oportunidad|Actividad|Comentario;;Fecha|Oportunidad|Actividad|Comentario;;..."
//
// Filas separadas por ";;", campos separados por "|". Si el comentario puede
// contener "|" o ";;", hay que limpiarlos en AppSheet antes de concatenar
// (por ejemplo con SUBSTITUTE) para no romper el formato.
(function renderActividadesDetalle() {
    const raw = params.get("actividadesDetalle");
    const cuerpo = document.getElementById("pdfActividadesBody");
    const tabla = document.getElementById("pdfTablaActividades");
    const vacio = document.getElementById("pdfActividadesVacio");
    const nota = document.getElementById("pdfActividadesNota");
 
    if (!cuerpo || !tabla || !vacio) return;
 
    const filas = (raw ?? "")
        .split(";;")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);
 
    if (filas.length === 0) {
        tabla.style.display = "none";
        vacio.style.display = "block";
        if (nota) nota.textContent = "";
        return;
    }
 
    tabla.style.display = "table";
    vacio.style.display = "none";
 
    // Límite de filas para evitar reportes excesivamente largos / cortes de
    // página poco prolijos (el PDF se arma capturando la página como imagen,
    // así que una tabla muy larga puede partirse a la mitad entre páginas).
    const LIMITE_FILAS = 40;
    const filasAMostrar = filas.slice(0, LIMITE_FILAS);
 
    filasAMostrar.forEach((fila) => {
        const campos = fila.split("|");
        const [fecha, oportunidad, actividad, comentario] = [
            campos[0] ?? "",
            campos[1] ?? "",
            campos[2] ?? "",
            campos[3] ?? "",
        ];
 
        const tr = document.createElement("tr");
        [fecha, oportunidad, actividad, comentario].forEach((valor) => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });
        cuerpo.appendChild(tr);
    });
 
    if (nota) {
        nota.textContent =
            filas.length > LIMITE_FILAS
                ? `Mostrando las primeras ${LIMITE_FILAS} de ${filas.length} actividades del periodo.`
                : `${filas.length} actividad(es) en el periodo seleccionado.`;
    }
})();
 
// Pie de página: fecha y hora en que se generó el PDF
const ahora = new Date();
const fechaGeneracion = ahora.toLocaleString("es-MX", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
});
setValue("pdfFechaGeneracion", `Generado el ${fechaGeneracion}`);
 
 
// ===============================
// GENERAR PDF
// ===============================
document.getElementById("btnGenerarPDF").addEventListener("click", (evt) => {
 
    const boton = evt.currentTarget;
    const element = document.getElementById("pdfContainer");
 
    // Nombre de archivo seguro (sin espacios ni caracteres raros)
    const nombreArchivo = (params.get("nombreUsuario") || "Usuario")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
 
    boton.disabled = true;
    const textoOriginal = boton.innerText;
    boton.innerText = "Generando PDF...";
 
    // Capturamos el reporte directamente con html2canvas (control total,
    // sin pasar por el envoltorio automático de html2pdf.js que causaba
    // los recortes). Luego solo usamos html2pdf.js para armar el PDF a
    // partir de esa imagen ya capturada.
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY
    }).then((canvas) => {
        const opt = {
            margin: 0.5,
            filename: `Reporte-Pipeline-${nombreArchivo}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };
        return html2pdf().set(opt).from(canvas, "canvas").toPdf().save();
    }).catch((err) => {
        console.error("Error al generar el PDF:", err);
        alert("Ocurrió un error generando el PDF. Revisa la consola del navegador para más detalles.");
    }).finally(() => {
        boton.disabled = false;
        boton.innerText = textoOriginal;
    });
});
 

