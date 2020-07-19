function desactivaBoton(id) {
    document.getElementById(id).disabled=true;
    document.all["formulario"].submit();
}