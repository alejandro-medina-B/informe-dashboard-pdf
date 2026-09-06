// ===============================
// 1. Leer parámetros desde la URL
// ===============================
const params = new URLSearchParams(window.location.search);

function getParam(name) {
    return params.get(name) || "—";
}

// ===============================
// 2. Insertar valores en los KPIs
// ===============================
document.getElementById("fechaInicial").innerText = getParam("fechaInicial");
document.getElementById("fechaFinal").innerText = getParam("fechaFinal");
document.getElementById("usuario").innerText = getParam("usuario");
document.getElementById("totalOportunidades").innerText = getParam("totalOportunidades");
document.getElementById("actividades").innerText = getParam("actividades");
document.getElementById("eficienciaGlobal").innerText = getParam("eficienciaGlobal") + "%";
document.getElementById("eficienciaSeguimiento").innerText = getParam("eficienciaSeguimiento") + "%";
document.getElementById("eficienciaCierre").innerText = getParam("eficienciaCierre") + "%";
document.getElementById("eficienciaTrabajo").innerText = getParam("eficienciaTrabajo") + "%";
document.getElementById("tiempoInactividad").innerText = getParam("tiempoInactividad");
document.getElementById("ritmo").innerText = getParam("ritmo");
document.getElementById("tasaExito").innerText = getParam("tasaExito") + "%";
document.getElementById("velocity").innerText = getParam("velocity");
document.getElementById("momentum").innerText = getParam("momentum");
document.getElementById("pipelineHealth").innerText = getParam("pipelineHealth");
document.getElementById("forecast").innerText = getParam("forecast");

// ===============================
// 3. Gráfica de Actividades
// ===============================
const ctx = document.getElementById("chartActividades");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Oportunidades", "Actividades"],
        datasets: [{
            label: "Totales",
            data: [
                Number(getParam("totalOportunidades")),
                Number(getParam("actividades"))
            ],
            backgroundColor: ["#3b82f6", "#10b981"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});

// ===============================
// 4. Generar PDF
// ===============================
document.getElementById("btnPDF").addEventListener("click", () => {
    const element = document.getElementById("content");

    const options = {
        margin: 0.5,
        filename: "InformeDashboard.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
});
