//*---------------------------------------------------------------------------------
// Función encargada de hacer la peticion get
const getData = async () =>{
  try{
    // Hacer peticion fecth a json server
    const respuesta = await fetch("http://localhost:3000/casas");
    const casas = await respuesta.json(); //!Devuelve un array
    return casas;
  }
  catch(err){
    console.error(err);
  }   
}
//*---------------------------------------------------------------------------------


//*-----------------------------------------------------------------------------
// Función encargada de insertar los datos al DOM
const insertarData = (array) =>{

  // Seleccionamos el contenedor
  const contenedorCard = document.getElementById('contenedorCards');
    
  // Iteramos el array devuelto por la api
  let datos = ``;
  array.forEach((casa)=>{
    let card = `
    <div id="${casa.id}" class="properties-card-container">
      <div class="properties-card properties-card1">
        <img src="${casa.imagen}" class="imgCard" />
        <span class="primary-span tag-span house-span">${casa.tipo}</span>
        <span class="secondary-span tag-span sale-span">${casa.estado}</span>
        <button onclick="agregarFavorito(this)" class="primary-span tag-span fast-span ${casa.id}"></button>
        <span class="white-span tag-span price-span">${casa.precio}</span>
        <span class="black-span tag-span like-span"></span>
        <span class="black-span tag-span exchange-span"></span>
      </div>
      <div class="properties-card-info pd-all-25">
        <div>
          <span class="card-location">${casa.ciudad}</span>
        </div>
        <span class="card-adress mg-t-16">${casa.direccion}</span>
        <div class="card-info-row mg-t-16">
          <div class="card-owner-container">
            <div class="card-owner"></div>
            <span class="card-avatar mg-l-6">${casa.propietario}</span>
          </div>
          <div>
            <span class="card-date">4 months ago</span>
          </div>
        </div>
        <div class="line-div mg-t-8"></div>
        <div class="card-info-row mg-t-8">
          <div>
            <img src="img/card-square.svg" alt="">
            <span class="card-square mg-l-6">${casa.area}</span>
          </div>
          <div>
            <img src="img/card-parking.svg" alt="">
            <span class="card-qty">${casa.parqueadero}</span>
            <img src="img/card-bathroom.svg" alt="" class="mg-l-6">
            <span class="card-qty">${casa.baños}</span>
            <img src="img/card-bedroom.svg" alt="" class="mg-l-6">
            <span class="card-qty">${casa.habitaciones}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 w-50">
      <h1 class="text-center">Descripcion del inmueble</h1>
      <p>${casa.descripcion}</p>
    </div>
    `;

    // Concatenamos las cards
    datos += card;
  });

  // Introducir todos los datos al DOM
  contenedorCard.innerHTML = datos;

}
//*-----------------------------------------------------------------------------



//*---------------------------------------------------------------------------------
// Función encargada de obtener los detalles del inmueble del usuario
const getDetails = async ()=>{
  try{
    // Hacemos la peticion get
    let data = await getData();
    
    // Accedemos al id del inmueble almacenado en local
    let idInmueble = JSON.parse(localStorage.getItem('id'));

    // Fitramos la data para acceder al inmueble que el usuario desea
    let filtroInmueble = data.filter((casa)=>{
      return casa.id == idInmueble;
    });
    
    // Invocamos la funcion encargada de imprimir los elemento en el DOM 
    insertarData(filtroInmueble); 
  }
  catch(err){
    console.error(err);
  }
}
//*---------------------------------------------------------------------------------

let favorites = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : [];

//*----------------------------------------------------------------------------------
// Esta función se encarga de agregar a favoritos algún inmueble en especifico
const agregarFavorito = async(event)=>{
  
  // Accedemos al identificador del inmueble
  let clases = event.classList;
  let idInmueble = clases[3];
  
  // Le pedimos al usuario que confirme si desea añadir a favoritos el inmueble
  const confirmarFavorito = confirm(`Desea agregar el inmueble a favoritos?`);

  if(confirmarFavorito){

    // Pedimos los inmuebles mendiante fecth
    let data = await getData();

    // Buscamos el inmueble que desea el usuario
    const encontrado = data.find((casa)=>{
      return casa.id == idInmueble;
    }); 

    // Introducimos el elemento encontrado a favoritos
    favorites.push(encontrado);
    localStorage.setItem('favorite', JSON.stringify(favorites));

    //Vamos a deshabilitar el boton de añadir a favoritos
    event.setAttribute("disabled", '');
  }

}
//*----------------------------------------------------------------------------------