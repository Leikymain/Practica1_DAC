let puntosBanca = 0;
let puntosJugador = 0;
let turnoJugador = false;
let nombreJugador ="";

crearBaraja(); 

function mostrarCarta(carta, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  const cartaDiv = document.createElement("div");
  cartaDiv.className = "carta";

  const imagen = document.createElement("img");
  imagen.src = `./utils/img/${carta.imagen}`; 
  imagen.alt = carta.nombre;
  cartaDiv.appendChild(imagen);

  contenedor.appendChild(cartaDiv);
}

function actualizarPuntos(jugador, puntos) {
  const contenedorPuntos = document.getElementById(
    jugador === "banca" ? "puntosBanca" : "puntosJugador"
  );
  contenedorPuntos.textContent =
    jugador === "banca"
      ? `Puntos banca: ${puntos}`
      : `Puntos ${nombreJugador}: ${puntos}`;
}

function turnoBanca() {
  const cartasBanca = document.getElementById("cartasBanca");

  function sacarCarta() {
    const carta = baraja.pop();
    puntosBanca += carta.valor;

    mostrarCarta(carta, "cartasBanca");
    actualizarPuntos("banca", puntosBanca);

    if (puntosBanca >= 22) {
      terminarJuego("La banca pierde. ¡Has ganado!");
      return;
    }

    if (puntosBanca >= 17) {
      turnoJugador = true;
      turnoJugadorFunc(); 
      return;
    }

    setTimeout(sacarCarta, 1000); 
  }

  sacarCarta();
}

function turnoJugadorFunc() {
  const pedirCartaBtn = document.getElementById("pedirCarta");
  const plantarseBtn = document.getElementById("plantarse");

  pedirCartaBtn.disabled = false;
  plantarseBtn.disabled = false;

  pedirCartaBtn.onclick = () => {
    const carta = baraja.pop();
    puntosJugador += carta.valor;

    mostrarCarta(carta, "cartasJugador");
    actualizarPuntos("jugador", puntosJugador);

    if (puntosJugador >= 22) {
      terminarJuego("Has perdido. Tus puntos superan 21.");
    }
  };

  plantarseBtn.onclick = () => {
    decidirGanador();
  };
}

function decidirGanador() {
  const pedirCartaBtn = document.getElementById("pedirCarta");
  const plantarseBtn = document.getElementById("plantarse");

  pedirCartaBtn.disabled = true;
  plantarseBtn.disabled = true;

  if (puntosBanca > 21) {
    terminarJuego("La banca pierde. ¡Has ganado!");
  } else if (puntosJugador > 21) {
    terminarJuego("Has perdido. Tus puntos superan 21.");
  } else if (puntosJugador === puntosBanca) {
    terminarJuego("Empate.");
  } else if (puntosJugador > puntosBanca) {
    terminarJuego("¡Has ganado!");
  } else {
    terminarJuego("Has perdido. La banca tiene más puntos.");
  }
}

function terminarJuego(mensaje) {
  document.getElementById("pedirCarta").disabled = true;
  document.getElementById("plantarse").disabled = true;
  const resultadoDiv = document.createElement("div");
  resultadoDiv.textContent = mensaje;
  resultadoDiv.className = "alert alert-success text-center w-25 mx-auto";
  document.body.appendChild(resultadoDiv);
}

function iniciarJuego() {
  nombreJugador = prompt("Introduce tu nombre:");
  const bienvenida = document.createElement("div");
  bienvenida.textContent = `Bienvenido, ${nombreJugador}!`;
  bienvenida.className = "alert alert-primary text-center w-25 mx-auto";
  document.body.insertBefore(bienvenida, document.body.firstChild);

  turnoBanca(); 
}

iniciarJuego();
