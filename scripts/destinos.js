const destinos = {

    canton: {
        titulo: "Cantón - Aventura en el Sur",
        img: "../assets/images/canton1.jpg",
        ruta: "PEK → CAN",
        fechas: "12 Jul - 19 Jul 2026",
        tipo: "Ida y Vuelta",
        duracion: "3h 10min",
        precio: "$199 USD",
        precio2: "¥1,359 CNY",
        descripcion: "Ciudad vibrante del sur de China.",
        lugares: ["Torre de Cantón", "Isla Shamian", "Templo Banyanos"],
        incluye: ["Vuelo", "Equipaje", "Asiento"]
    },

    chengdu: {
        titulo: "Chengdú - Naturaleza Pura",
        img: "../assets/images/chengdu1.jpg",
        ruta: "PVG → CTU",
        fechas: "18 Jul - 25 Jul 2026",
        tipo: "Ida y Vuelta",
        duracion: "3h 05min",
        precio: "$159 USD",
        precio2: "¥1,088 CNY",
        descripcion: "Famosa por los pandas y su gastronomía.",
        lugares: ["Pandas", "Calle Jinli", "Templo Wuhou", "Parques"],
        incluye: ["Vuelo", "Equipaje", "Asiento"]
    },

    chongqing: {
        titulo: "Chongqing - Ciudad Futurista",
        img: "../assets/images/chongqing1.jpg",
        ruta: "PEK → CKG",
        fechas: "10 Ago - 17 Ago 2026",
        tipo: "Ida y Vuelta",
        duracion: "3h",
        precio: "$180 USD",
        precio2: "¥1,230 CNY",
        descripcion: "Metrópolis moderna con arquitectura impresionante.",
        lugares: ["Hongya Cave", "Río Yangtsé", "Metro elevado"],
        incluye: ["Vuelo", "Equipaje"]
    },

    guilin: {
        titulo: "Guilin - Paisajes de Ensueño",
        img: "../assets/images/guilin1.jpg",
        ruta: "CAN → KWL",
        fechas: "5 Sep - 12 Sep 2026",
        tipo: "Ida y Vuelta",
        duracion: "2h",
        precio: "$140 USD",
        precio2: "¥950 CNY",
        descripcion: "Paisajes naturales únicos con montañas kársticas.",
        lugares: ["Río Li", "Montañas", "Cuevas"],
        incluye: ["Vuelo", "Equipaje"]
    },

    hangzhou: {
        titulo: "Hangzhou - Belleza Natural",
        img: "../assets/images/hangzhou1.jpg",
        ruta: "PVG → HGH",
        fechas: "20 Ago - 27 Ago 2026",
        tipo: "Ida y Vuelta",
        duracion: "1h 30min",
        precio: "$130 USD",
        precio2: "¥880 CNY",
        descripcion: "Famosa por el Lago del Oeste.",
        lugares: ["Lago Oeste", "Pagodas", "Templos"],
        incluye: ["Vuelo", "Equipaje"]
    },

    nanjing: {
        titulo: "Nanjing - Historia Viva",
        img: "../assets/images/nanjing1.jpg",
        ruta: "PEK → NKG",
        fechas: "1 Sep - 8 Sep 2026",
        tipo: "Ida y Vuelta",
        duracion: "2h",
        precio: "$150 USD",
        precio2: "¥1020 CNY",
        descripcion: "Antigua capital con gran historia.",
        lugares: ["Murallas", "Templos", "Museos"],
        incluye: ["Vuelo", "Equipaje"]
    },

    pekin: {
        titulo: "Pekín - Capital Imperial",
        img: "../assets/images/beijing1.jpg",
        ruta: "PVG → PEK",
        fechas: "10 Oct - 17 Oct 2026",
        tipo: "Ida y Vuelta",
        duracion: "2h 10min",
        precio: "$170 USD",
        precio2: "¥1150 CNY",
        descripcion: "Centro político y cultural de China.",
        lugares: ["Gran Muralla", "Ciudad Prohibida", "Templo del Cielo"],
        incluye: ["Vuelo", "Equipaje"]
    },

    qingdao: {
        titulo: "Qingdao - Ciudad Costera",
        img: "../assets/images/qingdao.jpg",
        ruta: "PEK → TAO",
        fechas: "15 Sep - 22 Sep 2026",
        tipo: "Ida y Vuelta",
        duracion: "1h 40min",
        precio: "$135 USD",
        precio2: "¥920 CNY",
        descripcion: "Hermosas playas y arquitectura europea.",
        lugares: ["Playas", "Puerto", "Cervecería"],
        incluye: ["Vuelo", "Equipaje"]
    },

    shanghai: {
        titulo: "Shanghái - Modernidad Total",
        img: "../assets/images/shanghai1.jpg",
        ruta: "PEK → PVG",
        fechas: "5 Oct - 12 Oct 2026",
        tipo: "Ida y Vuelta",
        duracion: "2h",
        precio: "$160 USD",
        precio2: "¥1080 CNY",
        descripcion: "Centro financiero y tecnológico.",
        lugares: ["Bund", "Torre Shanghái", "Nanjing Road"],
        incluye: ["Vuelo", "Equipaje"]
    },

    suzhou: {
        titulo: "Suzhou - Jardines Clásicos",
        img: "../assets/images/suzhou1.jpg",
        ruta: "PVG → SZV",
        fechas: "12 Sep - 19 Sep 2026",
        tipo: "Ida y Vuelta",
        duracion: "1h",
        precio: "$120 USD",
        precio2: "¥820 CNY",
        descripcion: "Famosa por sus jardines tradicionales.",
        lugares: ["Jardines", "Canales", "Puentes"],
        incluye: ["Vuelo", "Equipaje"]
    },

    xian: {
        titulo: "Xi'an - Tierra de Emperadores",
        img: "../assets/images/xian1.jpg",
        ruta: "TSN → XIY",
        fechas: "15 Jul - 22 Jul 2026",
        tipo: "Ida y Vuelta",
        duracion: "2h 15min",
        precio: "$169 USD",
        precio2: "¥1,156 CNY",
        descripcion: "Historia imperial de China.",
        lugares: ["Guerreros Terracota", "Muralla", "Barrio musulmán"],
        incluye: ["Vuelo", "Equipaje"]
    },

    zhangjiajie: {
        titulo: "Zhangjiajie - Montañas Avatar",
        img: "../assets/images/zhangjiajie1.jpg",
        ruta: "CAN → DYG",
        fechas: "25 Sep - 2 Oct 2026",
        tipo: "Ida y Vuelta",
        duracion: "2h 20min",
        precio: "$190 USD",
        precio2: "¥1290 CNY",
        descripcion: "Paisajes que inspiraron la película Avatar.",
        lugares: ["Parque Nacional", "Montañas flotantes", "Puente de vidrio"],
        incluye: ["Vuelo", "Equipaje"]
    }

};





const params = new URLSearchParams(window.location.search);
const destinoKey = params.get("destino");

const d = destinos[destinoKey];

if (d) {

    document.getElementById("titulo").textContent = d.titulo;
    document.getElementById("imgDestino").src = d.img;

    document.getElementById("info").innerHTML = `
<div><span>🛫 Ruta</span><p>${d.ruta}</p></div>
<div><span>📅 Fechas</span><p>${d.fechas}</p></div>
<div><span>💺 Tipo</span><p>${d.tipo}</p></div>
<div><span>⏱ Duración</span><p>${d.duracion}</p></div>
`;

    document.getElementById("precio").textContent = d.precio;
    document.getElementById("precio2").textContent = d.precio2;
    document.getElementById("descripcion").textContent = d.descripcion;

    document.getElementById("lugares").innerHTML =
        d.lugares.map(l => `<li>✈️ ${l}</li>`).join("");

    document.getElementById("incluye").innerHTML =
        d.incluye.map(i => `<li>✔ ${i}</li>`).join("");

}
