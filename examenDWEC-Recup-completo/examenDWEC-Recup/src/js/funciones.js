function rutaCarta(index){
    return "assets/img/cartas/" + cartas[index] + ".png";
}

function valorCarta(numeroLetra){
    let cartavalor = numeroLetra.substring(0,1); //se coge num
    return ordenValores.indexOf(cartavalor)+1; // A=1, 2=2, 3=3... 
}


function voltearCarta(i, etqCarta){
    if (etqCarta.src.includes("red") && estado === CARTA){
        etqCarta.src = rutaCarta(i);

        cartaSeleccionada = i;
        estado = PILA;

        etqSiguiente.innerText = "Seleccione pila:";

        enJuego.cartas = cartas;
        enJuego.estado = estado;
        enJuego.pila1 = pila1;
        enJuego.pila2 = pila2;
        enJuego.puntosPila1 = puntosPila1;
        enJuego.puntosPila2 = puntosPila2;
        enJuego.cartaSeleccionada = cartaSeleccionada;
        localStorage.setItem('enJuego', JSON.stringify(enJuego));


    }
}

function clickPila(pila, indice){
    //si es el momento de seleccionar pila
    if (estado === PILA){
        //se declaran y despues se actualizan dependiendo de la pila
        let etqPila, puntosPila;

        if (pila === 1){
            etqPila = etqPila1;
            puntosPila = puntosPila1;
            pila1.push(cartas[indice]);
        } else {
            etqPila = etqPila2;
            puntosPila = puntosPila2;
            pila2.push(cartas[indice]);
        }

        //si es la primera carta en la pila, se sustituye la gris
        if (puntosPila === 0){
            etqPila.children[0].src = rutaCarta(indice);

            //si no es la primera carta
        } else { 
            //se crea img y se coloca en la pila
            const etqNuevaCarta = document.createElement("img");
            etqNuevaCarta.src = rutaCarta(indice);
            etqPila.appendChild(etqNuevaCarta);
        }

        estado = CARTA; //toca seleccionar carta

        //se actualizan puntos
        puntosPila += valorCarta(cartas[indice]);

        if (pila === 1){
            etqContadorA.innerText = puntosPila;
            puntosPila1 = puntosPila;
        } else {
            etqContadorB. innerText = puntosPila;
            puntosPila2 = puntosPila;
        }

        //se pone carta gris abajo
        const etqCarta = document.getElementById("carta"+indice);
        etqCarta.src = "assets/img/cartas/grey_back.png";

        etqSiguiente.innerText = "Seleccione carta: ";

        //si no quedan mas cartas
        if (pila1.length + pila2.length >= 12){
            juegosAcabados+=1;
            player.juegosAcabados = juegosAcabados;
            localStorage.setItem('jugador', JSON.stringify(player));

            etqSiguiente.innerText = "Juego acabado";
            estado = FIN;
        }

        enJuego.cartas = cartas;
        enJuego.estado = estado;
        enJuego.pila1 = pila1;
        enJuego.pila2 = pila2;
        enJuego.puntosPila1 = puntosPila1;
        enJuego.puntosPila2 = puntosPila2;
        enJuego.cartaSeleccionada = cartaSeleccionada;
        localStorage.setItem('enJuego', JSON.stringify(enJuego));

    }
}

function login(jug){
    etqConsultar.hidden = true;
    etqCerrar.hidden = false;
    etqLogin.hidden = true;
    etqPassword.hidden = true;
    etqZonaJuego.hidden = false;

    etqNombreUsuario.innerText = "Hola, " + jug.nombre;

    cargar_player(jug.id, jug.nombre, jug.juegosAcabados);
}

function logout(){
    etqConsultar.hidden = false;
    etqCerrar.hidden = true;
    etqLogin.hidden = false;
    etqPassword.hidden = false;
    etqZonaJuego.hidden = true;

    etqNombreUsuario.innerText = "";
}

function juegoNuevo(){
    for(let i = 0; i <12; i++){
        const etqCarta = document.getElementById('carta'+i);
        etqCarta.src = "assets/img/cartas/red_back.png";
    }

    etqPila1.innerText = "";
    etqPila2.innerText = "";

    const etqCartaGris = document.createElement("img");
    etqCartaGris.src = "assets/img/cartas/grey_back.png";

    const etqCartaGris2 = document.createElement("img");
    etqCartaGris2.src = "assets/img/cartas/grey_back.png";

    etqPila1.appendChild(etqCartaGris);
    etqPila2.appendChild(etqCartaGris2);

    cartas= [];
    estado= 0;
    pila1= [];
    pila2= [];
    puntosPila1= 0;
    puntosPila2= 0;
    cartaSeleccionada= -1;

}