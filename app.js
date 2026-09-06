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

// ===============================
// 5. Enviar PDF por email (solo pruebas)
// ===============================
document.getElementById("btnEmail").addEventListener("click", async () => {

    // 1. Generar el PDF en memoria
    const element = document.getElementById("content");

    const opt = {
        margin: 0.5,
        filename: "InformeDashboard.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    // Convertir a PDF en memoria
    const pdfBlob = await html2pdf().set(opt).from(element).outputPdf("blob");

    // Convertir a base64
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);

    reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];

        // 2. Enviar al endpoint de Apps Script
        const response = await fetch(
            https://script.google.com/macros/s/AKfycbx0a92d7GMiqcdb9tB-7gsJWm_icVDY9JGQatBp6hzUQ0B1oGXK-WCa8-TuPHhtCNJG/exec
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pdfBase64: base64,
                    fileName: "InformeDashboard.pdf",
                    emailDestino: "alejandro@randompos.com"
                })
            }
        );

        const result = await response.json();
        alert("Correo enviado: " + result.status);
    };
});

