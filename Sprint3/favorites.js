//*---------------------------------------------------------------------------------
// Accedemos al almacenamiento local del dispositivo del usuario
let favorites = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : [];
//*----------------------------------------------------------------------------------



//*-----------------------------------------------------------------------------
// Funcion encargada de insertar los datos al DOM
const insertarData = (array) =>{

  // Seleccionamos el congtenedor
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
    `;

    // Concatenamos las cards
    datos += card;
  });

  // Introducir todos los datos al DOM
  contenedorCard.innerHTML = datos;

}
//*-------------------------------------------------------------------------------------


//*--------------------------------------------------------------------------------------
// Declaramos la funcion encargada de acceder al almacenamiento local del dispositivo y acceder por tanto a los favoritos del usuario
const getFavoritos = ()=>{
  insertarData(favorites); 
}
//*--------------------------------------------------------------------------------------