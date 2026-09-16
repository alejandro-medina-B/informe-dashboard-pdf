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
setValue("ForecastCierresValor", params.get("ForecastCierresValor"));
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
// (pdfTasaExito se asigna más abajo junto con el resto de Conversión y Éxito)
 
setValue("pdfCierreGanado", params.get("cierreGanado"));
setValue("pdfCierrePerdido", params.get("cierrePerdido"));
 
setValue("pdfActividadPorProspecto", params.get("actividadPorProspecto"));
setValue("pdfTasaCierre", params.get("tasaCierre"));
 
// Valor del Pipeline (dinero) — Fase 5: los valores ya llegan formateados
// desde AppSheet (ej. "$27,000.00", "100.00%"), no requieren formateo aquí.
setValue("pdfValorEnProceso", params.get("valorEnProceso"));
setValue("pdfValorGanado", params.get("valorGanado"));
setValue("pdfValorPerdido", params.get("valorPerdido"));
setValue("pdfTasaGanadas", params.get("tasaGanadas"));
 
setValue("pdfEficienciaSeguimiento", params.get("eficienciaSeguimiento"));
setValue("pdfEficienciaTrabajo", params.get("eficienciaTrabajo"));
setValue("pdfEficienciaCierre", params.get("eficienciaCierre"));
 
setValue("pdfMomentum", params.get("PipelineMomentum"));
setValue("pdfTextoMomentum", params.get("TextoPipelineMomentum"));
 
setValue("pdfHealthScore", params.get("PipelineHealthScore"));
setValue("pdfHealthTexto", params.get("PipelineHealthTexto"));
 
setValue("pdfForecast", params.get("ForecastCierres"));
setValue("pdfForecastValor", params.get("ForecastCierresValor"));
setValue("pdfForecastTexto", params.get("ForecastCierresTexto"));
 
// Conversión y Éxito (Fase 4c)
setValue("pdfTasaExito", params.get("tasaExito"));
setValue("pdfTextoTasaExito", params.get("textoTasaExito"));
 
setValue("pdfConversionGlobal", params.get("conversionGlobal"));
setValue("pdfTextoConversionGlobal", params.get("textoConversionGlobal"));
 
setValue("pdfConversionPorUsuario", params.get("conversionPorUsuario"));
setValue("pdfTextoConversionPorUsuario", params.get("textoConversionPorUsuario"));
 
// Ritmo de Actividades (Fase 4g) — los valores numéricos ya llegan
// formateados como texto "dd:hh:mm" desde AppSheet (mismas columnas
// *DD:HH:MM confirmadas en el dashboard), no requieren formateo aquí.
setValue("pdfTiempoEntreActividades", params.get("tiempoEntreActividades"));
setValue("pdfTextoTiempoEntreActividades", params.get("textoTiempoEntreActividades"));
 
setValue("pdfInactividadEntreActividades", params.get("inactividadEntreActividades"));
setValue("pdfTextoInactividadEntreActividades", params.get("textoInactividadEntreActividades"));
 
setValue("pdfTiempoEnEtapas", params.get("tiempoEnEtapas"));
setValue("pdfTextoTiempoEnEtapas", params.get("textoTiempoEnEtapas"));
 
setValue("pdfTiempoPromedioCierre", params.get("tiempoPromedioCierre"));
setValue("pdfTextoTiempoPromedioCierre", params.get("textoTiempoPromedioCierre"));
 
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
 
// ===============================
// RESUMEN EJECUTIVO GENERADO POR IA (Claude, vía Cloudflare Worker)
// ===============================
// La clave de Anthropic NUNCA vive aquí ni en ningún archivo de este repo
// (es público) — vive solo como secreto cifrado dentro del Worker en
// Cloudflare, que actúa de intermediario. Este código solo le manda datos
// ya calculados (los mismos KPIs que ya se muestran en el reporte) y recibe
// de vuelta el texto del resumen. Si el Worker falla, tarda demasiado, o no
// responde, el PDF se genera igual SIN esta sección — nunca bloquea al
// usuario.
const RESUMEN_IA_WORKER_URL = "https://resumen-ejecutivo-random.scanapp246.workers.dev";
const RESUMEN_IA_TIMEOUT_MS = 20000;
 
function buildDatosParaIA() {
    return {
        vendedor: params.get("nombreUsuario") || "",
        periodo: `${params.get("fechaInicial") || ""} - ${params.get("fechaFinal") || ""}`,
        prospectos_nuevos: params.get("prospectosNuevos"),
        prospectos_en_seguimiento: params.get("prospectosEnSeguimiento"),
        actividades_registradas: params.get("actividades"),
        actividad_promedio_por_prospecto: params.get("actividadPorProspecto"),
        cierres_ganados: params.get("cierreGanado"),
        cierres_perdidos: params.get("cierrePerdido"),
        tasa_cierre_pct: params.get("tasaCierre"),
        eficiencia_global_pct: params.get("eficienciaGlobal"),
        eficiencia_seguimiento_pct: params.get("eficienciaSeguimiento"),
        eficiencia_trabajo_pct: params.get("eficienciaTrabajo"),
        eficiencia_cierre_pct: params.get("eficienciaCierre"),
        pipeline_momentum: params.get("PipelineMomentum"),
        pipeline_momentum_texto: params.get("TextoPipelineMomentum"),
        salud_pipeline_score: params.get("PipelineHealthScore"),
        salud_pipeline_texto: params.get("PipelineHealthTexto"),
        forecast_cierres: params.get("ForecastCierres"),
        forecast_cierres_valor: params.get("ForecastCierresValor"),
        forecast_cierres_texto: params.get("ForecastCierresTexto"),
        tasa_exito_pct: params.get("tasaExito"),
        conversion_global_pct: params.get("conversionGlobal"),
        conversion_por_usuario_pct: params.get("conversionPorUsuario"),
        valor_en_proceso: params.get("valorEnProceso"),
        valor_ganado: params.get("valorGanado"),
        valor_perdido: params.get("valorPerdido"),
        tasa_ganadas_pct: params.get("tasaGanadas"),
        tiempo_entre_actividades: params.get("tiempoEntreActividades"),
        oportunidades_enfriandose: params.get("inactividadEntreActividades"),
        texto_oportunidades_enfriandose: params.get("textoInactividadEntreActividades"),
        tiempo_en_etapas: params.get("tiempoEnEtapas"),
        tiempo_promedio_cierre: params.get("tiempoPromedioCierre"),
        texto_tiempo_promedio_cierre: params.get("textoTiempoPromedioCierre")
    };
}
 
async function obtenerResumenIA(datos) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RESUMEN_IA_TIMEOUT_MS);
 
    try {
        const resp = await fetch(RESUMEN_IA_WORKER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ datos }),
            signal: controller.signal
        });
 
        if (!resp.ok) {
            console.warn("Resumen IA: el servidor respondió con error", resp.status);
            return null;
        }
 
        const body = await resp.json();
        return body.resumen || null;
    } catch (err) {
        console.warn("Resumen IA: no se pudo obtener, se continúa sin él:", err.message);
        return null;
    } finally {
        clearTimeout(timeoutId);
    }
}
 
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}
 
function renderResumenIA(textoCrudo) {
    const contenedor = document.getElementById("resumenIAContenido");
    const card = document.getElementById("resumenIACard");
    const titulo = document.getElementById("resumenIATitulo");
    const linea = document.getElementById("resumenIALinea");
    if (!contenedor || !card) return;
 
    // Limpieza defensiva por si el modelo agrega formato Markdown (**negritas**,
    // encabezados con #, etc.) aunque el prompt le pide texto plano.
    const texto = textoCrudo
        .replace(/^#+\s*/gm, "")
        .replace(/\*\*/g, "")
        .trim();
 
    // Separa el párrafo principal de la sección "Sugerencias:"
    const partes = texto.split(/sugerencias:?/i);
    const parrafo = (partes[0] || "").trim();
    const sugerenciasTexto = (partes[1] || "").trim();
 
    let html = "";
    parrafo.split(/\n+/).filter((p) => p.trim().length > 0).forEach((p) => {
        html += `<p class="resumen-ia-texto">${escaparHTML(p.trim())}</p>`;
    });
 
    if (sugerenciasTexto) {
        const items = sugerenciasTexto
            .split(/\n+/)
            .map((l) => l.replace(/^[-•*]\s*/, "").trim())
            .filter((l) => l.length > 0);
 
        if (items.length > 0) {
            html += `<div class="resumen-ia-subtitulo">Sugerencias</div>`;
            html += `<ul class="resumen-ia-lista">`;
            items.forEach((item) => {
                html += `<li>${escaparHTML(item)}</li>`;
            });
            html += `</ul>`;
        }
    }
 
    if (!html) return; // nada útil que mostrar — se deja oculto
 
    contenedor.innerHTML = html;
    card.style.display = "block";
    if (titulo) titulo.style.display = "block";
    if (linea) linea.style.display = "block";
}
 
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
document.getElementById("btnGenerarPDF").addEventListener("click", async (evt) => {
 
    const boton = evt.currentTarget;
    const element = document.getElementById("pdfContainer");
 
    // Nombre de archivo seguro (sin espacios ni caracteres raros)
    const nombreArchivo = (params.get("nombreUsuario") || "Usuario")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
 
    boton.disabled = true;
    const textoOriginal = boton.innerText;
 
    // Paso previo: intentar obtener el resumen ejecutivo generado por IA.
    // Si tarda m\u00e1s de RESUMEN_IA_TIMEOUT_MS o falla, seguimos sin bloquear
    // al usuario \u2014 el PDF se genera igual, solo que sin esa secci\u00f3n.
    try {
        boton.innerText = "Generando resumen ejecutivo...";
        const datos = buildDatosParaIA();
        const resumen = await obtenerResumenIA(datos);
        if (resumen) renderResumenIA(resumen);
    } catch (err) {
        console.warn("Resumen IA: error inesperado, se contin\u00faa sin \u00e9l:", err);
    }
 
    boton.innerText = "Generando PDF...";
 
    // Capturamos el reporte directamente con html2canvas (control total,
    // sin pasar por el envoltorio automático de html2pdf.js que causaba
    // los recortes). Luego solo usamos html2pdf.js para armar el PDF a
    // partir de esa imagen ya capturada.
    //
    // El PDF se arma como UNA sola página cuyo alto se calcula a partir del
    // alto real del contenido capturado (en vez de usar el tamaño fijo
    // "letter"). Con el reporte cada vez más largo (se le siguen agregando
    // secciones de KPIs), un tamaño de página fijo corta tarjetas a la mitad
    // en el límite entre una página y la siguiente — como pasó con las
    // tarjetas de "Ritmo de Actividades". Una sola página de alto variable
    // elimina ese problema de raíz, sin importar cuánto crezca el reporte
    // en el futuro. La contraparte es que no es ideal para imprimirse en
    // papel Carta físico; si en algún momento se necesita para impresión,
    // hay que rediseñarlo como paginado con saltos de página controlados.
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY
    }).then((canvas) => {
        const anchoPulgadas = 8.5;
        const margenPulgadas = 0.5;
        const anchoContenidoPulgadas = anchoPulgadas - margenPulgadas * 2;
        const altoPulgadas =
            anchoContenidoPulgadas * (canvas.height / canvas.width) + margenPulgadas * 2;
 
        const opt = {
            margin: margenPulgadas,
            filename: `Reporte-Pipeline-${nombreArchivo}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            jsPDF: { unit: "in", format: [anchoPulgadas, altoPulgadas], orientation: "portrait" }
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
 
