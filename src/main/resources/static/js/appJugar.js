var APIuseful = apimockJugar;
//var APIuseful=apiclientJugar;

var appJugar = (function () {

	var stompClient = null;
	var idJugador=null;
	var idSala=1;//por ahora una sola sala
	var numJugadores=0;
	var jugadorListo=false;

	/**
	 * función que realiza la conexión STOMP
	 */
	var connectAndSubscribe = function () {
		console.info('Connecting to WS...');
		var socket = new SockJS('/stompendpoint');
		stompClient = Stomp.over(socket);
		
		//subscribe to /topic/TOPICXX when connections succeed
		stompClient.connect({}, function (frame) {
			console.log('Conectado: ' + frame);

			//especificamos que estamos atentos de nuevos jugadores que entren
			stompClient.subscribe('/topic/JugadoresQuierenJugar.'+idSala, function (eventbody) {
				callback_JugadoresQuierenJugar(eventbody);
			});

			//especificamos que estamos atentos de que cumpla el mínimo de jugadores
			stompClient.subscribe('/topic/ListoMinimoJugadores.'+idSala, function (eventbody) {
				callback_ListoMinimoJugadores(eventbody);
			});
			
			//reportamos que este usuario quiere entrar al juego
			stompClient.send("/app/EntrarAJuego."+idSala, {}, idJugador);
		});
	};

	/**
	 * cada vez que hay un jugador nuevo esta función recibe TODOS los que quieren jugar (incluido el nuevo y los que ya están listos!)
	 * y los coloca en la tabla de jugadores
	 * @param {*} message 
	 */
	var callback_JugadoresQuierenJugar=function(message) {
		var jugadores=JSON.parse(message.body);
		var botonHTML=jugadorListo?"":"<input type='button' value='Ya estoy listo!' onclick='appJugar.estoyListo();'>";
		var mjTiempo=jugadorListo?"Esperando mínimo de jugadores":"";
		//borramos y armamos tabla con jugadores actuales y listos
		$("#antesDeEmpezar").html(botonHTML+"<div id='tiempo'>"+mjTiempo+"</div><br><br><table id='listaJugadores'><thead><th>#</th><th>Nombre</th><th>Record</th><th>&nbsp;</th></thead><tbody></tbody></table>");
		//agregamos TODOS los jugadores a la tabla
		numJugadores=0;
		jugadores.map(function(jugador){
			numJugadores++;
			var listo=jugador.listo===true?"LISTO":"";
			var filasHTML="<tr><td>"+numJugadores+"</td><td>"+jugador.nombre+"</td><td>"+jugador.record+"</td><td>"+listo+"</td></tr>";
			$("#listaJugadores > tbody").append(filasHTML);
		});
	};

	var callback_ListoMinimoJugadores=function(message) {
		var segundosRestantes=message.body;
		var mjTiempo=jugadorListo?"Esperando algunos jugadores":"Mínimos jugadores requeridos listos apúrate te quedan";
		$("#tiempo").html(mjTiempo+": <span id='segundos'>"+segundosRestantes+"</span> segundos.");
		var restarSegundos=function() {
			$("#segundos").text($("#segundos").text()-1);
			setTimeout(restarSegundos,1000);
		};
		setTimeout(restarSegundos,1000);
	}

	return {
		/**
		 * encargado de realizar la conexión con STOMP
		 */
		init: function(){
			//definimos el id del usuario
			idJugador=$("#id_jugador").val();
			//verificamos que el usuario haya iniciado
			if(isNaN(idJugador) || idJugador<0){
				alert("Inicia sesión por favor");
				return false;
			}
			$("#antesDeEmpezar").text("Cargando Jugadores...");
			//INICIAMOS CONEXIÓN
			connectAndSubscribe();
		},
		/**
		 * desconecta del STOMP
		 */
		disconnect: function () {
			if (stompClient !== null) {
				stompClient.disconnect();
			}
			//setConnected(false);
			console.log("Desconectado");
		},
		estoyListo:function() {
			jugadorListo=true;
			$("#antesDeEmpezar > input[type=button]").remove();
			//reportamos que este usuario quiere entrar al juego
			stompClient.send("/app/JugadorListo."+idSala, {}, idJugador);
		},
		
		login: function () {


			var correo = $("#nombreusuario").val();
			var clave = $("#contrasena").val();

			var datosInicio = {correo: correo, clave: clave};

			console.info("datos de inicio: " + correo);
		
			$.get("/users/" + correo + "/" + clave,
					function (data) {
						console.info("sersio: ok = "+data);
						
						if(data){
							alert("Sesion iniciada :)");
						}
						
					}
			).fail(
					function (data) {
						alert("User: " + correo + " no existe " + data["responseText"]);
					}

			);
		}
    };
})();

//PARA EMPEZAR EJECUTAR ESTA FUNCION DESDE CONSOLA: appJugar.init(); 