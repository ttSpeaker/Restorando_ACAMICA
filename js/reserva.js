var Reserva = function (fecha, cantPersonas, precioPersona, codDescuento) {
    this.fecha = fecha;
    this.cantPersonas = cantPersonas;
    this.precioPersona = precioPersona;
    this.codDescuento = codDescuento;

}

Reserva.prototype.determinarPrecioBase = function () {
    if (this.cantPersonas <= 0 || !Number.isInteger(this.cantPersonas) || this.fecha == null || this.precioPersona <= 0 || !Number.isInteger(this.precioPersona)) {
        return "Precio invalido";
    } else {
        return this.cantPersonas * this.precioPersona;
    }
}
Reserva.prototype.descuentoPorCantidadGrupo = function (precio) {
    // var descMenos4 = 1;
    // var desc4a6 = 0.95;
    // var desc7a8 = 0.90;
    // var descMas8 = 0.85;
    switch (true) {
        case (this.cantPersonas < 4):
            return precio * 1;
        case (this.cantPersonas >= 4 && this.cantPersonas <= 6):
            return precio * 0.95;
        case (this.cantPersonas >= 7 && this.cantPersonas <= 8):
            return precio * 0.90;
        case (this.cantPersonas > 8):
            return precio * 0.85;
    };
}
Reserva.prototype.descuentoPorCodigo = function (precio) {
    switch (this.codDescuento) {
        case "":
            return precio;
        case "DES1":
            return precio - this.precioPersona;
        case "DES15":
            return precio * 0.85;
        case "DES200":
            return precio <= 200 ? 0 : precio - 200;
    };
}
Reserva.prototype.adicionalHorarioYFecha = function (precio) {
    if ( this.fecha.getDay() == 0 || this.fecha.getDay() == 5 || this.fecha.getDay() == 6 ){
        return this.fecha.getHours() == 13 || this.fecha.getHours() == 20 ? precio * 1.15 : precio * 1.10;
    } else {
        return this.fecha.getHours() == 13 || this.fecha.getHours() == 20 ? precio * 1.05 : precio;
    }
}

Reserva.prototype.adicionalFinDeSemana = function (precio) {
    return this.fecha.getDay() == 0 || this.fecha.getDay() == 5 || this.fecha.getDay() == 6 ? precio * 1.10 : precio;
}

Reserva.prototype.determinarPrecioFinal = function () {
    var precio = this.determinarPrecioBase();
    precio = this.adicionalHorarioYFecha(precio);
    precio = this.descuentoPorCodigo(precio);
    precio = this.descuentoPorCantidadGrupo(precio);
    return precio;
}