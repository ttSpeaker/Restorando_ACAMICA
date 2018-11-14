var Restaurant = function (id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

function sumatoria(sumar) {
    return sumar.reduce((total, element) => total + element);
}
function promedio(promediar) {
    return Math.round((sumatoria(promediar) / promediar.length) * 10) / 10;
}
Restaurant.prototype.reservarHorario = function (horarioReservado) {
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios = this.horarios.filter(element => element != horarioReservado);
            return;
        }
    }
}

Restaurant.prototype.calificar = function (nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function () {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }

}

