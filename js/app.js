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
  $('#container-profile').append("<img  class = 'img-us' src = '"+imgUser+"' />")
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
  $('#text-area').val();
}
/*function saveText () {
  var publications = $.post['text'];
  console.log(publications);

}*/
