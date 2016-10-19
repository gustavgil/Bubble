/*
Creado por Gustavo Gil.
Licencia Creative Commons (CC) 3.0 Venezuela.
Si está utilizando este archivo...

    Usted es libre para:

Compartir — copiar y redistribuir el material en cualquier medio o formato
Adaptar — remezclar, transformar y crear a partir del material para cualquier propósito, incluso comercialmente
El licenciante no puede revocar estas libertades en tanto usted siga los términos de la licencia
Bajo los siguientes términos:

Atribución — Usted debe darle crédito a esta obra de manera adecuada, proporcionando un enlace a la licencia, e indicando si se han realizado cambios. Puede hacerlo en cualquier forma razonable, pero no de forma tal que sugiera que usted o su uso tienen el apoyo del licenciante.
Compartir Igual — Si usted mezcla, transforma o crea nuevo material a partir de esta obra, usted podrá distribuir su contribución siempre que utilice la misma licencia que la obra original.
No hay restricciones adicionales — Usted no puede aplicar términos legales ni medidas tecnológicas que restrinjan legalmente a otros hacer cualquier uso permitido por la licencia.

Aviso:
Usted no tiene que cumplir con la licencia para los materiales en el dominio público o cuando su uso esté permitido por una excepción o limitación aplicable.
No se entregan garantías. La licencia podría no entregarle todos los permisos que necesita para el uso que tenga previsto. Por ejemplo, otros derechos como relativos a publicidad, privacidad, o derechos morales pueden limitar la forma en que utilice el material.
*/
/* 
	Ver. 1.0.
    Creado el : 12/10/2016.
    Autor     : Gustavo Gil.
    Email     : gustavgil@gmail.com
*/

var posicion = 0;
function evitaEventos(event){
    if(window.event){
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
    else event.preventDefault();
};
 
function desplazar(event, id){
    elemento = document.querySelector('#'+id);
    iniX = event.clientX + window.scrollX;
    iniY = event.clientY + window.scrollY;
    document.addEventListener("mousemove", desplazando, true);
    document.addEventListener("mouseup", fin, true);
    iniEX = parseInt(elemento.style.left);
    iniEY = parseInt(elemento.style.top);
    elemento.style.zIndex = ++posicion;
    evitaEventos(event);
};
 
function desplazando(event){ 
    var xActual = event.clientX + window.scrollX;
    var yActual = event.clientY + window.scrollY;
    if((iniEX + xActual - iniX) >= 0){
    	elemento.style.left = (iniEX + xActual - iniX)+"px";
    }
    if((iniEY + yActual - iniY) >= 0){
    	elemento.style.top = (iniEY + yActual - iniY)+"px";
	}
    evitaEventos(event);
};

function cambiarTam(event,id){
	var elemento = document.querySelector('#'+id);
	// Hallamos la posición relativa |posición elemento - posición real|
	var x = elemento.offsetLeft - event.pageX;
	var y = elemento.offsetTop - event.pageY;
	// Hacemos el valor absoluto
	x = Math.abs(x);
	y = Math.abs(y);
	//Encontrar los bordes inferior, derecho y esquina inferior derecha, colocar los respectivos cursores y asignar la función cambiar cuando se presione el mouse.
	if(x > 0 && y > 0){
		elemento.style.cursor = 'default';
		elemento.setAttribute("onMouseDown","");
	}
	if(x >= parseInt(elemento.style.width)-6 && y > 0){
		elemento.style.cursor = 'e-resize';
		elemento.setAttribute("onMouseDown","cambiar(event, '"+elemento.id+"','x');");
	}
	if(x > 0 && y >= parseInt(elemento.style.height)-6){
		elemento.style.cursor = 'n-resize';
		elemento.setAttribute("onMouseDown","cambiar(event, '"+elemento.id+"','y');");
	}
	if(x >= parseInt(elemento.style.width)-6 && y >= parseInt(elemento.style.height)-6){
		elemento.style.cursor = 'nw-resize';
		elemento.setAttribute("onMouseDown","cambiar(event, '"+elemento.id+"','xy');");
	}

};

var direccion = '';
function cambiar(event, id, dir){
	direccion = dir;
    elemento = document.querySelector('#'+id);
    iniX = event.clientX + window.scrollX;
    iniY = event.clientY + window.scrollY;
    document.addEventListener("mousemove", cambiandoTam, true);
    document.addEventListener("mouseup", fin, true);
    iniAncho = parseInt(elemento.style.width);
    iniAlto = parseInt(elemento.style.height);
    elemento.style.zIndex = ++posicion;
    evitaEventos(event);
};

function cambiandoTam(event){
    var xActual = event.clientX + window.scrollX;
    var yActual = event.clientY + window.scrollY;
    if((iniAncho + xActual - iniX) >= 200 && direccion.indexOf('x') != -1){
    	elemento.style.width = (iniAncho + xActual - iniX)+"px";
    	var dialogoTit = elemento.querySelector(".dialogoTit");
		var anchoTit = parseInt(elemento.style.width)-120;
		dialogoTit.style.width = anchoTit+'px';
    }
    if((iniAlto + yActual - iniY) >= 100  && direccion.indexOf('y') != -1){
    	var dialogConten = elemento.querySelector(".dialogConten");
    	elemento.style.height = (iniAlto + yActual - iniY)+"px";
    	var maxAltoConten = (iniAlto + yActual - iniY) - 40;
		dialogConten.style.maxHeight = maxAltoConten+'px';
	}
    evitaEventos(event);
};
 
function fin(event){
    document.removeEventListener("mousemove", desplazando, true);
    document.removeEventListener("mousemove", cambiandoTam, true);
    document.removeEventListener("mouseup", fin, true);
};

function restaurar(id,alto,ancho){
	var e = document.querySelector('#'+id);
	e.style.height = alto;
	e.style.width = ancho;
	var top = (parseInt(window.innerHeight)/2)-(parseInt(alto)/2);
	var left = (parseInt(window.innerWidth)/2)-(parseInt(ancho)/2);
	var dialogConten = e.querySelector(".dialogConten");
	if(dialogConten.style.visibility == 'hidden'){
		dialogConten.style.position = 'static';
		dialogConten.style.visibility = 'visible';
	}else{
		e.style.left = left+"px";
		e.style.top = top+"px";
	}
	if(alto.indexOf('%') == -1){
		var maxAltoConten = parseInt(alto) - 40;
		dialogConten.style.maxHeight = maxAltoConten+'px';
	}else{
		dialogConten.style.maxHeight = this.alto;
	}
	var btnExpan = e.querySelector(".fa-compress") || e.querySelector(".fa-expand");
	if(btnExpan){
		btnExpan.setAttribute("class","fa fa-expand cuadroTam");
		btnExpan.setAttribute("onClick","expandir('"+id+"');");
		var padreBtn = btnExpan.parentNode;
		padreBtn.setAttribute("ondblclick","expandir('"+id+"');");
		e.setAttribute("onmousemove","cambiarTam(event,'"+caja.id+"');");
	}
	var btnMin = e.querySelector(".fa-angle-double-right") || e.querySelector(".fa-angle-double-left");
	if(btnMin){
		btnMin.setAttribute("class","fa fa-angle-double-left cuadroMinMax");
		btnMin.setAttribute("onClick","minimizar('"+id+"');");
	}
	var dialogoTit = e.querySelector(".dialogoTit");
	var anchoTit = parseInt(ancho)-120;
	dialogoTit.style.width = anchoTit+'px';
};

function minimizar(id){
	var e = document.querySelector('#'+id);
	var ancho = e.style.width;
	var alto = e.style.height;
	e.style.width = '200px';
	e.style.height = '30px';
	var dialogoTit = e.querySelector(".dialogoTit");
	dialogoTit.style.width = '100px';
	var dialogConten = e.querySelector(".dialogConten");
	dialogConten.style.position = 'fixed';
	dialogConten.style.visibility = 'hidden';
	var btnMin = e.querySelector(".fa-angle-double-left");
	if(btnMin){
		btnMin.setAttribute("class","fa fa-angle-double-right cuadroMinMax");
		btnMin.setAttribute("onClick","restaurar('"+id+"','"+alto+"','"+ancho+"');");
		var btnExpan = e.querySelector(".cuadroTam");
		if(btnExpan)btnExpan.setAttribute("onClick","");
		var padreBtn = btnExpan.parentNode;
		padreBtn.setAttribute("ondblclick","");
		e.setAttribute("onmousemove","");
	}
};

function expandir(id){
	var e = document.querySelector('#'+id);
	var ancho = e.style.width;
	var alto = e.style.height;
	e.style.height = '100%';
	e.style.width = '100%';
	e.style.left = 0;
	e.style.top = 0;
	var dialogConten = e.querySelector(".dialogConten");
	var maxAltoConten = parseInt(window.innerHeight) - 40;
	dialogConten.style.maxHeight = maxAltoConten+"px";
	var btnMinMax = e.querySelector(".cuadroMinMax");
	if(btnMinMax)btnMinMax.setAttribute("onClick","");
	e.setAttribute("onmousemove","");
	var btnExpan = e.querySelector(".fa-expand");
	if(btnExpan){
		var padreBtn = btnExpan.parentNode;
		btnExpan.setAttribute("class","fa fa-compress cuadroTam");
		btnExpan.setAttribute("onClick","restaurar('"+id+"','"+alto+"','"+ancho+"');");
		padreBtn.setAttribute("ondblclick","restaurar('"+id+"','"+alto+"','"+ancho+"');");
	}
};

function cerrar(id){
	var e = document.querySelector('#'+id);
	var padre = e.parentNode;
	padre.removeChild(e);
};

function Dialogo(id,contenido,alto,ancho,xIni,yIni,zIni,titulo,icono,clase,ajustable,minimizable,desplazable){
	var existe = document.querySelector('#'+id);
	if(existe == null){
		this.alto = alto;
		this.ancho = ancho;
		this.posX = xIni;
		this.posY = yIni;
		this.posZ = zIni;
		this.titulo = titulo;
		this.clase = clase;
		this.icono = icono;
		this.clase = clase;
		this.ajustable = ajustable;
		this.minimizable = minimizable;
		this.desplazable = desplazable;
		caja = document.createElement('section');
		caja.style.position = 'fixed';
		caja.style.height = this.alto;
		caja.style.width = this.ancho;
		caja.style.left = this.posX+'px';
		caja.style.top = this.posY+'px';
		caja.style.zIndex = this.posZ;
		caja.style.paddingTop = '30px';
		caja.id = id;
		var barraSuperior = document.createElement('div');
		barraSuperior.style.position = 'absolute';
		barraSuperior.style.width = '100%';
		barraSuperior.style.height = '26px';
		barraSuperior.style.top = '2px';
		barraSuperior.style.left = '0';
		barraSuperior.id = 'barDialogo_'+id;
		barraSuperior.setAttribute("class","barSupDialogos");
		var botonCerrar = document.createElement('i');
		botonCerrar.style.float = 'right';
		botonCerrar.setAttribute("class","fa fa-close cuadroCerrar");
		barraSuperior.appendChild(botonCerrar);
		botonCerrar.setAttribute("onClick","cerrar('"+id+"');");
		if(this.ajustable){
			var botonExpanCompr = document.createElement('i');
			botonExpanCompr.style.float = 'right';
			botonExpanCompr.setAttribute("class","fa fa-expand cuadroTam");
			barraSuperior.appendChild(botonExpanCompr);
			botonExpanCompr.setAttribute("onClick","expandir('"+id+"');");
			barraSuperior.setAttribute("ondblclick","expandir('"+id+"');");
			caja.setAttribute("onmousemove","cambiarTam(event,'"+id+"');");
		}
		if(this.minimizable){
			var botonMinMax = document.createElement('i');
			botonMinMax.style.float = 'right';
			botonMinMax.setAttribute("class","fa fa-angle-double-left cuadroMinMax");
			botonMinMax.setAttribute("onClick","minimizar('"+id+"');");
			barraSuperior.appendChild(botonMinMax);
		}
		if(this.titulo){
			var tit = document.createElement('div');
			tit.style.float = 'left';
			var anchoTit = parseInt(ancho) - 120;
			tit.style.width = anchoTit+'px';
			tit.setAttribute("class","dialogoTit");
			tit.innerHTML = this.titulo;
			barraSuperior.appendChild(tit);
		}

		if(this.clase)caja.setAttribute("class",this.clase);

		if(desplazable){
			barraSuperior.setAttribute("onMouseOver","this.style.cursor='move';");
			barraSuperior.setAttribute("onMouseDown","desplazar(event, '"+id+"');");
		}
		var contenedor = document.createElement('div');
		contenedor.setAttribute("class","dialogConten");
		if(this.alto.indexOf('%') == -1){
			var maxAltoConten = parseInt(this.alto) - 40;
			contenedor.style.maxHeight = maxAltoConten+'px';
		}else{
			contenedor.style.maxHeight = this.alto;
		}
		contenedor.innerHTML = contenido;
		caja.setAttribute("onClick","this.style.zIndex = ++posicion;");
		caja.appendChild(barraSuperior);
		caja.appendChild(contenedor);
		document.body.appendChild(caja);
	}
};