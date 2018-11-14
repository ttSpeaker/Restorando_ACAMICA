var expect = chai.expect;
var restaurantTest = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
var restaurantTestVacios = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", [], "../img/asiatica1.jpg", []);


var listadoTest = new Listado(listadoDeRestaurantes);

describe('Funcion reservar horario', function () {
    it('Se reserva: el array debe tener un elemento menos y el horario pedido no existir en el array cuando se reserva.', function () {
        var cantidadHorariosAntesDeReservar = restaurantTest.horarios.length;
        restaurantTest.reservarHorario('13:00');
        expect(restaurantTest.horarios.length).to.equal(cantidadHorariosAntesDeReservar - 1);
        expect(restaurantTest.horarios).to.not.contain('15:00');
    });
    it('Cuando el horario no existe el array se mantiene igual', function () {
        var arrayHorariosAntesDeReservar = restaurantTest.horarios;
        restaurantTest.reservarHorario('11:00');
        expect(restaurantTest.horarios).to.equal(arrayHorariosAntesDeReservar);
    });
    it('Cuando no se pasa ningun parametro el array se mantiene igual', function () {
        var arrayHorariosAntesDeReservar = restaurantTest.horarios;
        restaurantTest.reservarHorario();
        expect(restaurantTest.horarios).to.equal(arrayHorariosAntesDeReservar);
    });
});

describe('Obtener Puntuacion', function () {
    it('Se calcula correctamente el promedio', function () {
        expect(restaurantTest.obtenerPuntuacion()).to.equal((6 + 7 + 9 + 10 + 5) / 5);
    });
    it('Devuelve 0 si no existen puntuaciones', function () {
        expect(restaurantTestVacios.obtenerPuntuacion()).to.equal(0);
    });
});

describe('Funcion Calificar', function () {
    afterEach(function () {
        restaurantTest.calificaciones = [6, 7, 9, 10, 5];
    });
    it('La calificacion no es entero o no esta entre 1 y 10 el array se mantiene igual', function () {
        var calificacionesAntesDeCalificar = restaurantTest.calificaciones;
        restaurantTest.calificar("a");
        expect(restaurantTest.calificaciones).to.equal(calificacionesAntesDeCalificar);
        restaurantTest.calificar();
        expect(restaurantTest.calificaciones).to.equal(calificacionesAntesDeCalificar);
        restaurantTest.calificar("0");
        expect(restaurantTest.calificaciones).to.equal(calificacionesAntesDeCalificar);
        restaurantTest.calificar("-5");
        expect(restaurantTest.calificaciones).to.equal(calificacionesAntesDeCalificar);
        restaurantTest.calificar("11");
        expect(restaurantTest.calificaciones).to.equal(calificacionesAntesDeCalificar);
    });
    it('Se agrega un item al arreglo cuando se califica un numero valido', function () {
        var cantidadCalificacionesAntesDeCalificar = restaurantTest.calificaciones.length;
        restaurantTest.calificar(2);
        expect(cantidadCalificacionesAntesDeCalificar + 1).to.equal(restaurantTest.calificaciones.length);
    });
});

describe('Buscar restaurante por ID', function () {
    it('Devuelve el resturant con el ID elegido', function () {
        expect(listadoTest.buscarRestaurante(3)).to.eql(listadoTest.restaurantes[2]);
    });
    it('Si no existe el ID o es un dato invalido devuelve error', function () {
        expect(listadoTest.buscarRestaurante(0)).to.equal("No se ha encontrado ningún restaurant");
        expect(listadoTest.buscarRestaurante("Hola Mundo")).to.equal("No se ha encontrado ningún restaurant");
        expect(listadoTest.buscarRestaurante(-5)).to.equal("No se ha encontrado ningún restaurant");
        expect(listadoTest.buscarRestaurante(undefined)).to.equal("No se ha encontrado ningún restaurant");
    });
});

describe('Obtener restaurante', function () {
    it('Devuelve toda la lista si no se ingresa ningun parametro', function () {
        var resultadoSinParametros = listado.obtenerRestaurantes(null, null, null);
        expect(listado.restaurantes).to.eql(resultadoSinParametros);
    });
    it('Devuelve lista valida con 3 parametros', function () {
        var resultado3Parametros1 = listado.obtenerRestaurantes("Asiática", "Nueva York", "13:00");
        var resultadoEsperado = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
        ]
        expect(resultado3Parametros1).to.eql(resultadoEsperado);
    });
    it('Devuelve lista valida con 2 parametros', function () {
        var resultado2Parametros1 = listado.obtenerRestaurantes("Ensalada", "Nueva York", null);
        var resultadoEsperado = [
            new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
            new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7])
        ]
        expect(resultado2Parametros1).to.eql(resultadoEsperado);
    });
    it('Devuelve lista valida con 1 parametro', function () {
        var resultado1Parametro1 = listado.obtenerRestaurantes(null, "Berlín", null);
        var resultadoEsperado = [
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
            new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
            new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
            new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7])
        ]
        expect(resultado1Parametro1).to.eql(resultadoEsperado);
    });
});

