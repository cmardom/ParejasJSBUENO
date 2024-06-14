etqZonaJuego.hidden = true;

//ls
let lsPlayer = JSON.parse(localStorage.getItem('jugador'));
if (lsPlayer){
    cargar_player(lsPlayer.id, lsPlayer.nombre, lsPlayer.juegosAcabados);
    etqZonaJuego.hidden = false;
}

let lsEnJuego = JSON.parse(localStorage.getItem('enJuego'));
if (lsEnJuego){
    cartas = [...lsEnJuego.cartas];
    estado = lsEnJuego.estado;
    pila1 = lsEnJuego.pila1;
    pila2 = lsEnJuego.pila2;
    puntosPila1 = lsEnJuego.puntosPila1;
    puntosPila2 = lsEnJuego.puntosPila2;
    cartaSeleccionada = lsEnJuego.cartaSeleccionada;
    etqContadorA.innerText=puntosPila1;
    etqContadorB.innerText=puntosPila2;

    if (pila1.length > 0){
        etqPila1.innerText = "";

        for (c of pila1){
            const etqNuevaCarta = document.createElement("img");
            etqNuevaCarta.src = "assets/img/cartas/"+c+".png";
            etqPila1.appendChild(etqNuevaCarta);
        }
    }

    if (pila2.length > 0){
        etqPila2.innerText = "";

        for (c of pila2){
            const etqNuevaCarta = document.createElement("img");
            etqNuevaCarta.src = "assets/img/cartas/"+c+".png";
            etqPila2.appendChild(etqNuevaCarta);
        }
    }
}





//crear baraja
for (let palo of palos){
    cartasOrdenadas = cartasOrdenadas.concat("A"+palo);

    for (let i = 2; i < 10; i++){
        cartasOrdenadas = cartasOrdenadas.concat(""+i+palo);
    }

    for (let figura of ['J', 'Q', 'K']){
        cartasOrdenadas.concat(figura + palo);
    }
}

//barajar
cartas = _.shuffle(cartasOrdenadas);
console.log(cartas);

//event listners
for (let i = 0; i < 12; i++){
    const etqCarta = document.getElementById('carta'+i);
    etqCarta.addEventListener("click", ()=>{
        voltearCarta(i, etqCarta);
        console.log(etqCarta);

    });

    //retomar juego
    if (lsEnJuego){
        if (pila1.indexOf(cartas[i]) >= 0 || pila2.indexOf(cartas[i]) >= 0){
            etqCarta.src = "assets/img/cartas/grey_back.png";
        } else {
            if (estado===PILA && cartaSeleccionada === i){
                etqCarta.src = rutaCarta(i);
            }
        }
    }
}

etqPila1.addEventListener("click", ()=>{
    clickPila(1, cartaSeleccionada);
});

etqPila2.addEventListener("click", () =>{
    clickPila(2, cartaSeleccionada);
});


botonConsultar.addEventListener("click", ()=>{
    fetch('http://localhost:3000/players').then(resp =>{
        resp.json().then(listaJugadores =>{
            let encontrado = false;

          
            for (let jug of listaJugadores){
                if (jug.nombre === etqLogin.value && jug.passwd === etqPassword.value){
                    login(jug);
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado){
                alert('No existe el jugador');
            }
        })
       
    }).catch(error => alert("Error de servidor"));
});

botonCerrarSesion.addEventListener("click", ()=>{logout();});

botonJuegoNuevo.addEventListener("click", ()=>{juegoNuevo();});

