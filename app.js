// Leer parámetros
const params = new URLSearchParams(window.location.search);
const get = n => params.get(n) || "--";

// Insertar valores
document.getElementById("fechaInicial").innerText = get("fechaInicial");
document.getElementById("fechaFinal").innerText = get("fechaFinal");
document.getElementById("usuario").innerText = get("usuario");
document.getElementById("totalOportunidades").innerText = get("totalOportunidades");
document.getElementById("actividades").innerText = get("actividades");
document.getElementById("eficienciaGlobal").innerText = get("eficienciaGlobal") + "%";
document.getElementById("eficienciaSeguimiento").innerText = get("eficienciaSeguimiento") + "%";
document.getElementById("eficienciaCierre").innerText = get("eficienciaCierre") + "%";
document.getElementById("eficienciaTrabajo").innerText = get("eficienciaTrabajo") + "%";
document.getElementById("tiempoInactividad").innerText = get("tiempoInactividad");
document.getElementById("ritmo").innerText = get("ritmo");
document.getElementById("tasaExito").innerText = get("tasaExito") + "%";
document.getElementById("velocity").innerText = get("velocity");
document.getElementById("momentum").innerText = get("momentum");
document.getElementById("pipelineHealth").innerText = get("pipelineHealth");
document.getElementById("forecast").innerText = get("forecast");

// Generar PDF
document.getElementById("btnPDF").addEventListener("click", () => {
    const element = document.getElementById("content");

    const opt = {
        margin: 0.5,
        filename: "InformeDashboard.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
});
