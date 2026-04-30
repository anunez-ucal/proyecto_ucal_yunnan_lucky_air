// ===== ESTADO =====
let usuarioLogueado = false;

// ===== PAQUETES =====
const paquetes = {
    basico: { nombre: "Básico", equipaje: "Mochila", asiento: "Aleatorio", comida: "No", cambios: "No", extra: 0 },
    light: { nombre: "Light", equipaje: "Mano", asiento: "Costo", comida: "Snack", cambios: "Penalidad", extra: 30 },
    standard: { nombre: "Standard", equipaje: "Maleta", asiento: "Incluido", comida: "Sí", cambios: "Sí", extra: 60 },
    premium: { nombre: "Premium", equipaje: "2 maletas", asiento: "Amplio", comida: "Premium", cambios: "Flexible", extra: 120 },
    business: { nombre: "Business", equipaje: "VIP", asiento: "Cama", comida: "Gourmet", cambios: "Gratis", extra: 300 }
};

// ===== GENERAR VUELOS (10 resultados por búsqueda) =====
function generarVuelos(origen, destino) {

    const vuelos = [];

    const preciosBase = {
        LIM: 700,
        LAX: 600,
        JFK: 650,
        NRT: 300
    };

    const base = preciosBase[destino] || 150;

    for (let i = 0; i < 10; i++) {

        const horaSalida = 6 + i;
        const duracion = Math.floor(Math.random() * 5) + 1;

        vuelos.push({
            codigo: "LA" + (100 + i),
            origen: origen,
            destino: destino,
            salida: horaSalida + ":00",
            llegada: (horaSalida + duracion) + ":00",
            duracion: duracion + "h",
            precio: base + Math.floor(Math.random() * 100)
        });
    }

    return vuelos;
}

// ===== BUSCAR VUELOS =====
function buscarVuelos() {

    const tipo = document.getElementById("tipo").value;
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const ida = document.getElementById("fecha-ida").value;
    const vuelta = document.getElementById("fecha-vuelta").value;
    const pasajeros = document.getElementById("pasajeros").value;
    const paqueteKey = document.getElementById("paquete").value;

    if (!tipo || !origen || !destino || !ida || !vuelta || !pasajeros || !paqueteKey) {
        alert("Completa todos los campos");
        return;
    }

    const paquete = paquetes[paqueteKey];
    const tabla = document.getElementById("resultados");

    // MOSTRAR TABLA
    document.getElementById("seccion-resultados").classList.remove("oculto");

    tabla.innerHTML = "";

    const vuelos = generarVuelos(origen, destino);

    if (vuelos.length === 0) {
        tabla.innerHTML = "<tr><td colspan='7'>No hay vuelos disponibles</td></tr>";
        return;
    }

    vuelos.forEach(v => {

        const precioFinal = (v.precio + paquete.extra) * pasajeros;

        tabla.innerHTML += `
        <tr>
            <td>${v.codigo}</td>
            <td>🛫 ${v.origen} → ${v.destino}</td>
            <td>${v.salida} - ${v.llegada}</td>
            <td>⏱ ${v.duracion}</td>
            <td>$${precioFinal}</td>
            <td>
                ${paquete.nombre}<br>
                🧳 ${paquete.equipaje}<br>
                💺 ${paquete.asiento}<br>
                🍽 ${paquete.comida}<br>
                🔄 ${paquete.cambios}
            </td>
            <td>
                <button onclick='comprar(${JSON.stringify(v)})'>Comprar</button>
            </td>
        </tr>
        `;
    });

    // SCROLL automático (opcional pero pro)
    document.getElementById("seccion-resultados").scrollIntoView({ behavior: "smooth" });
}

// ===== COMPRAR =====
function comprar(vuelo) {

    if (!usuarioLogueado) {
        localStorage.setItem("vueloPendiente", JSON.stringify(vuelo));
        window.location.href = "../pages/login.html";
        return;
    }

    localStorage.setItem("vueloSeleccionado", JSON.stringify(vuelo));

    window.location.href = "asientos.html";
}

// ===== LOGIN =====
function mostrarLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function login() {
    usuarioLogueado = true;
    alert("Sesión iniciada");

    cerrarLogin();

    // continuar compra automáticamente
    const vuelo = JSON.parse(localStorage.getItem("vueloPendiente"));
    if (vuelo) {
        localStorage.removeItem("vueloPendiente");
        comprar(vuelo);
    }
}

function cerrarLogin() {
    document.getElementById("loginModal").style.display = "none";
}