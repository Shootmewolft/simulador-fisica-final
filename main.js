const btnIniciarSimulación = document.getElementById("iniciarSimulacion");
btnIniciarSimulación.addEventListener("click", (e) => {
  e.preventDefault();
  iniciarSimulacion();
});

let animacion;

function iniciarSimulacion() {
  if (animacion) {
    clearInterval(animacion);
  }

  const n = parseInt(document.getElementById("numOnda").value);
  const f = 1.5;
  const A = 2;
  const L = parseInt(document.getElementById("longitudCuerda").value);
  const omega = 2 * Math.PI * f;


  const x = [];
  const y = [];
  const numPuntos = 500;
  for (let i = 0; i < numPuntos; i++) {
    x.push((i * L) / (numPuntos - 1));
    y.push(0);
  }

  const data = [
    {
      x: x,
      y: y,
      mode: "lines",
      line: { color: "#fff" },
      name: "Onda estacionaria",
    },
  ];

  const layout = {
    xaxis: {
      range: [0, L],
      title: { text: "Eje X", font: { color: "#ffffff" } },
      tickfont: { color: "#ffffff" },
      gridcolor: "#121212",
    },
    yaxis: {
      range: [-2 * A, 2 * A],
      title: { text: "Eje Y", font: { color: "#ffffff" } },
      tickfont: { color: "#ffffff" },
      gridcolor: "#121212",
    },
    dragmode: false,
    hovermode: "closest",
    margin: {
      l: 50,
      r: 38,
      t: 40,
      b: 40,
    },
    paper_bgcolor: "#121212",
    plot_bgcolor: "#121212",
  };

  const config = {
    displayModeBar: false,
    scrollZoom: false,
    responsive: true,
  };

  Plotly.newPlot("grafico", data, layout, config);

  let tiempo = 0;
  const intervalo = 30;
  const deltaT = intervalo / 1000;

  animacion = setInterval(function () {
    tiempo += deltaT;
    const yActualizada = [];
    for (let i = 0; i < numPuntos; i++) {
      const xi = x[i];
      const yi =
        2 * A * Math.sin((n * Math.PI * xi) / L) * Math.cos(omega * tiempo);
      yActualizada.push(yi);
    }

    Plotly.update("grafico", { y: [yActualizada] });
  }, intervalo);
}
