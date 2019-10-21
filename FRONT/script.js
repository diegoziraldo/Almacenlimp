AOS.init();

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

function precionarBoton(indice){
    document.getElementById("boton1").className = "nav-link";
    document.getElementById("boton2").className = "nav-link";
    document.getElementById("boton3").className = "nav-link";

    document.getElementById("boton"+indice).className = "nav-link active";
}







/* AOS.init({delay: 1000, duration: 1000});

window.onscroll = function() {
    if (window.pageYOffset > 10) {
        // Agregar clase nav
        // .menu-scroll
        //document.getElementsByTagName('nav')[0].className = '';
        document.getElementById('menu').className = 'row fixed-top menu-scroll';
    } else {
        // Sacar clase del nav
        document.getElementById('menu').className = 'row fixed-top';
    }
    //console.log(window.pageYOffset);
} */