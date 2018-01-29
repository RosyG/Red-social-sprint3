//login, la var provider provera el servicio para logear.
var provider = new firebase.auth.GoogleAuthProvider();
//Se llama al botón login para darle el evento click.
$('#login').click(serviceGoogle);

function serviceGoogle () {
  firebase.auth()//Mandando a llamar a Firebase.
  .signInWithPopup(provider)//Ventana popup para logearse con la var provider (con google).
  .then(function(result) {
    //En este momento el us ya accedio.
    $('.login').hide();//Ocultado la ventana de logear.
    $('#welcome').show('slow');//Mostrando la pantalla principal.
    //Ejecutando Modal
    $('#modal1').modal()
    //Accediendo a la información del us,ie, result.
    var imgUser = result.user.photoURL;
    console.log(imgUser);
    $('#img-us').append("<img src='"+imgUser+"' />")
  });
};
