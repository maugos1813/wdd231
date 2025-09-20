const div = document.querySelector("#prueba")

const h1 = document.querySelector("h1");
h1.innerHTML = "Hola patrón";

const nuevaPalabra = () => {
  const h2 = document.createElement("h2");
  h2.innerHTML = "Estoy sentado en una silla xd";

  div.appendChild(h2)
};

const nuevaFrase = () => {
  const p = document.createElement("p")
  p.innerText = "Y nacesito mejorar en mis estudios de programación"
  div.appendChild(p)
}

const nuevaCaja = () => {
  const caja = document.createElement("div")
  // caja.classList.add("caja")
  caja.innerHTML = "Soy una caja"
  caja.style.border = "2px solid black"

  div.appendChild(caja)
}

nuevaPalabra();
nuevaFrase();
nuevaCaja()
