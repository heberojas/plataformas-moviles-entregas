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
  data.municipios.forEach(municipio => {
    const columna = document.createElement('div');
    columna.classList.add('col-12', 'col-md-6', 'col-lg-4');
    columna.innerHTML = `
      <div class="tarjeta">
        <h3>${municipio.nombre}</h3>
        <a href="https://www.google.com/maps?q=${municipio.centroide.lat},${municipio.centroide.lon}" target="_blank">Ver en el mapa →</a>
      </div>`;
    contenedor.appendChild(columna);
  });
}

selectProvincias.addEventListener('change', () => {
  cargarMunicipios(selectProvincias.value);
});
cargarProvincias();
