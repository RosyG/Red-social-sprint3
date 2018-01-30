//login, la var provider provera el servicio para logear.
var provider = new firebase.auth.GoogleAuthProvider();
//Se llama al botón login para darle el evento click.
$('#login').click(serviceGoogle);
//Guardando datos en Firebase cuando se da click en Guardar.
$('#guardar').click(saveFirebase);



function serviceGoogle () {
  firebase.auth()//Mandando a llamar a Firebase.
  .signInWithPopup(provider)//Ventana popup para logearse con la var provider (con google).
  .then(function(result) {
    //En este momento el us ya accedio.
    $('.login').hide();//Ocultado la ventana de logear.
    $('#welcome').show('slow');//Mostrando la pantalla principal.
    $('#welcome-user').text('Bienvenid@ ' + result.user.displayName);//Añadiendo nombre de usuario para concatenar.
    //Guardando la información del usuario en la base de datos de Firebase.
//    saveUs (result.user);//Guada la información del usuario de manera automatica.
    paintProfile (result.user);//Pinta los datos del usuario en su perfil.
    saveData (result.user)
  });
};
//Función que guarda automaticamente.
function saveUs(user) {
//  saveText();
  console.log(publications);
  var InfUser = {
    uid:user.uid,
    name:user.displayName,
    email:user.email,
    photo:user.photoURL,
    sexo: 'Fem'
  }
  firebase.database().ref('usuarios/'+user.uid)//Se guarda en la rama que tiene al identificador unico UID.
    .set(InfUser);//Set modifica a la llave especificada por el uid, push() solo agreda de nuevo.
}

function paintProfile (user) {
  var imgUser = user.photoURL;//Variable que contine toda la inf del usuario.
  var nameUser = user.displayName;
  var email = user.email;
  var uid= user.uid;
  console.log(imgUser);
  $('#container-profile').append("<img  class = 'img-us' src = '"+imgUser+"' />");
  console.log(nameUser);
  console.log(email);
  $('#name').text(nameUser);
  $('#email').text(email);
}

//Función que guarda datos al hacer click en guardar.
function saveFirebase () {
  console.log($('#text-area').val());
  firebase.database().ref('us1')
    .set({
          edad:'15años',
          sexo: 'Feme'
          })//Escribiendo en la base de datos.

  //text area
  var textarea = $('#text-area').val();
  saveText(textarea);//Ejecutando la función que guarda la publicación en Firebase.
  cleanText ();
}

function saveText (textPublication) {
  firebase.database().ref('publications')
    .push(textPublication)//Añadiendo la publicación en la rama 'publications'.
  paintTextPublication (textPublication);//Ejecutando la función que pintará las publicationes guardadas en Firebase.
  dataPublications.push(textPublication);//Guardando la publicación en la data.

}
function cleanText () {
  $('#text-area').val(' ');//limpiando el campo del text área.
}
//Función que lee la base de datos que alguien más inicia sesión AUTOMÁTICO.
firebase.database().ref('usuarios')
//Cuando alguien agregue algo en la rama usuarios, se ejecutará la función anónima.
.on('child_added', function(s){//s contiene los datos.
  var user = s.val();//Se guardan los datos en una variable.
  $('#root').append("<img src='"+user.photo+"'>");//De los datos se toman los datos del usuario que añadio su información.
})

///--------------------------publicación de las actividades del usuario.
function paintTextPublication (text) {
  //Función que publica en la zona de las publicaciones de los usuarios.
    $('#container-follows').append("<div  id = 'container-text' />");
    $('#container-text').append('<label id = "text-us" />');
    var paintText = $('#text-us');
    //$('#text-us').text(text);

    var database = firebase.database().ref('publications').child('-L44GKvTNdg8fNVvyVW7');//Tengo que especificar a su hijo, como iterar para q lo entienda firebase.
      database.on('value', function (snapshot) {
        paintText.text(snapshot.val());
        console.log(paintText);
      })




    console.log($('#container-follows'));

}
function saveData (user) {
  var objUser = {
    uid:user.uid,
    name:user.displayName,
    email:user.email,
    photo:user.photoURL,
  }
  dataUsers.push(objUser);
  console.log(dataUsers);
  console.log(objUser);
  console.log('data impresa');
}
