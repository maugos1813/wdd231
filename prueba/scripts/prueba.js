const h1 = document.querySelector("h1");
h1.innerHTML = "Hola patrón";

const nuevaPalabra = () => {
  const h2 = document.createElement("h2");
  h2.innerHTML = "Estoy sentado en una silla xd";

  const div = document.querySelector("#prueba")
  div.appendChild(h2)
};

nuevaPalabra();
