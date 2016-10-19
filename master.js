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

var parseBol = function(string){
	switch(string){
		case 'false' :
			return false; 
		break;
		case 'true' :
			return true
		break;
		default : 
			return false; 
		break;
	}
};

function probar(){
    document.body.innerHTML = '<h1>Probando componentes</h1>'
    +'Tipo: Dialogo.<br />'
    +'<label for="id">ID:</label><input type="text" id="id" size="6" value="dialogo1" /> '
    +'<label for="titulo">Titulo:</label><input type="text" id="titulo" size="20" value="Ventana" /> '
    +'<label for="ancho">Ancho:</label><input type="text" id="ancho" maxlength="6" size="3" value="400px"  /> '
    +'<label for="alto">Alto:</label><input type="text" id="alto" maxlength="6" size="3" value="300px" /> '
    +'<label for="left">Left:</label><input type="number" id="left" maxlength="4" style="width:60px;" value="0" /><label for="top">Top:</label><input type="number" id="top" maxlength="4" style="width:60px;" value="0" /> <br />'
    +'<label for="color">Comb. Color de contenido</label><br /><select id="color">'
	+'<option value="gris">Gris</option>'
	+'<option value="celeste">Celeste</option>'
	+'<option value="azul2">Azul 2</option>'
	+'<option value="naranja">Naranja</option>'
	+'<option value="lima">Lima</option>'
	+'<option value="rojoClaro">Rojo Claro</option>'
	+'</select><br />'
    +'<label for="ajustable">¿Ajustable?</label><br /><select id="ajustable">'
	+'<option value="true">true</option>'
	+'<option value="false">false</option>'
	+'</select><br />'
	+'<label for="minimizable">¿Minimizable?</label><br /><select id="minimizable">'
	+'<option value="true">true</option>'
	+'<option value="false">false</option>'
	+'</select><br />'
	+'<label for="desplazable">¿Desplazable?</label><br /><select id="desplazable">'
	+'<option value="true">true</option>'
	+'<option value="false">false</option>'
	+'</select><br />'
    +'<span onClick="creaDialogo();" style="cursor:pointer; color:green;">Crear Ventana <i class="fa fa-square-o"></i></span>'
    +'<br /><span id="datos"></span>';
};

function creaDialogo(){
	var color = document.querySelector('#color').value;
	var conten = '<article class="box1 '+color+'">'
    +'<header><i class="fa fa-fire"></i>ENCABEZADO</header>'
    +'<h2>Este es un subtítulo</h2>'
    +'<p>Este es un párrafo Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    +'<footer>Este es el pie de página.</footer>'
    +'</article>';
    var id = document.querySelector('#id').value;
	var tit = document.querySelector('#titulo').value;
	var alto = document.querySelector('#alto').value;
	var ancho = document.querySelector('#ancho').value;
	var left = document.querySelector('#left').value;
	var top = document.querySelector('#top').value;
	var ajustable = parseBol(document.querySelector('#ajustable').value);
	var minimizable = parseBol(document.querySelector('#minimizable').value);
	var desplazable = parseBol(document.querySelector('#desplazable').value);
	var d = new Dialogo(id,conten,alto,ancho,left,top,0,tit,"","dialogo",ajustable,minimizable,desplazable);
};

window.addEventListener('load',function(){
	probar();
});