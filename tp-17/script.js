const API = 'https://apis.datos.gob.ar/georef/api/';
const selectProvincias = document.querySelector('#provincias');
const mensaje = document.querySelector('#mensaje');
const contenedor = document.querySelector('#municipios');

async function cargarProvincias() {
  const response = await fetch(API + 'provincias?orden=nombre');
  const data = await response.json();

  selectProvincias.innerHTML = '<option>Elegí una provincia</option>';

  data.provincias.forEach(provincia => {
    const opcion = document.createElement('option');
    opcion.value = provincia.id;
    opcion.textContent = provincia.nombre;
    selectProvincias.appendChild(opcion);
  });
}

async function cargarMunicipios(idProvincia) {
  const response = await fetch(API + 'municipios?provincia=' + idProvincia + '&orden=nombre&max=1000');
  const data = await response.json();

  mensaje.textContent = data.total + ' municipios';
  contenedor.innerHTML = '';
  document.querySelector('#mapa').innerHTML = '';

  data.municipios.forEach(municipio => {
    const columna = document.createElement('div');
    columna.classList.add('col-12', 'col-md-6', 'col-lg-4');

    columna.innerHTML = `
      <div class="tarjeta">
        <h3>${municipio.nombre}</h3>
        <a href="#" onclick="mostrarMapa(${municipio.centroide.lat}, ${municipio.centroide.lon}); return false;">Ver en el mapa →</a>
      </div>`;

    contenedor.appendChild(columna);
  });
}

function mostrarMapa(lat, lon) {
  const mapa = document.querySelector('#mapa');

  mapa.innerHTML = `
    <iframe
      src="https://maps.google.com/maps?q=${lat},${lon}&z=14&output=embed"
      width="100%"
      height="350"
      style="border:0;"
      allowfullscreen
      loading="lazy">
    </iframe>
  `;

  mapa.scrollIntoView({ behavior: 'smooth' });
}

selectProvincias.addEventListener('change', () => {
  cargarMunicipios(selectProvincias.value);
});

cargarProvincias();
