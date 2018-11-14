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

describe('Reserva: Calculo precio base.', function () {
    it('Se desestiman reservas sin cantidad de personas, fecha o precio base', function () {
        var reserva1 = new Reserva(null, 8, 350, "");
        var reserva2 = new Reserva(new Date(2018, 7, 24, 11, 00), 0, 350, "");
        var reserva3 = new Reserva(new Date(2018, 7, 24, 11, 00), null, 350, "");
        var reserva4 = new Reserva(new Date(2018, 7, 24, 11, 00), "hello", 350, "");
        var reserva5 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 0, "");
        var reserva6 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, null, "");
        expect(reserva2.determinarPrecioBase()).to.be.equal("Precio invalido");
        expect(reserva3.determinarPrecioBase()).to.be.equal("Precio invalido");
        expect(reserva4.determinarPrecioBase()).to.be.equal("Precio invalido");
        expect(reserva5.determinarPrecioBase()).to.be.equal("Precio invalido");
        expect(reserva1.determinarPrecioBase()).to.be.equal("Precio invalido");
        expect(reserva6.determinarPrecioBase()).to.be.equal("Precio invalido");
    });

    it('Se calcula correctamente precio reservas validas', function () {
        var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 7, 24, 14, 100), 2, 150, "DES200");
        expect(reserva1.determinarPrecioBase()).to.be.equal(2800);
        expect(reserva2.determinarPrecioBase()).to.be.equal(300);
    });
});

describe('Reserva: Calculo precio final.', function () {

    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos < 4 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 3, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 2, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 1, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(3 * 350 - 350);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(2 * 150 - 200);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(1 * 250 * 0.85);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos < 4 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 3, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 2, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 1, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((3 * 350) * 1.05 - 350);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((2 * 150) * 1.05 - 200);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(((1 * 250) * 1.05) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos < 4 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 3, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 2, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 1, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(3 * 350 * 1.10 - 350);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(2 * 150 * 1.10 - 200);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(1 * 250 * 1.10 * 0.85);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos < 4 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 3, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 20), 2, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 30), 1, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((3 * 350) * 1.15 - 350);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((2 * 150) * 1.15 - 200);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(((1 * 250) * 1.15) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos < 4 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 3, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 2, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 1, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(3 * 350);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(2 * 150);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(1 * 250);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos < 4 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 3, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 2, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 1, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((3 * 350) * 1.05);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((2 * 150) * 1.05);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(((1 * 250) * 1.05));
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos < 4 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 3, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 2, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 1, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(3 * 350 * 1.10);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(2 * 150 * 1.10);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(1 * 250 * 1.10);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos < 4 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 3, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 00), 2, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 00), 1, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(3 * 350 * 1.15);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(2 * 150 * 1.15);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(1 * 250 * 1.15);
    });


    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos 4 a 6 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 4, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 6, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 4, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((4 * 350 - 350) * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((6 * 150 - 200) * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((4 * 250 * 0.85) * 0.95);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos 4 a 6 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 4, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 00), 6, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 00), 4, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((4 * 350) * 1.05 - 350) * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((6 * 150) * 1.05 - 200) * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((4 * 250) * 1.05) * 0.85) * 0.95);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos 4 a 6 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 4, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 6, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 4, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((4 * 350 * 1.10 - 350) * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((6 * 150 * 1.10 - 200) * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((4 * 250 * 1.10 * 0.85) * 0.95);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos 4 a 6 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 4, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 10), 6, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 15), 4, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((4 * 350) * 1.15 - 350) * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((6 * 150) * 1.15 - 200) * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((4 * 250) * 1.15) * 0.85) * 0.95);
    });
    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos 4 a 6 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 4, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 6, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 4, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(4 * 350 * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(6 * 150 * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(4 * 250 * 0.95);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos 4 a 6 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 4, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 6, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 4, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((4 * 350) * 1.05 * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((6 * 150) * 1.05 * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(((4 * 250) * 1.05) * 0.95);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos 4 a 6 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 4, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 6, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 4, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(4 * 350 * 1.10 * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(6 * 150 * 1.10 * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(4 * 250 * 1.10 * 0.95);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos 4 a 6 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 4, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 10), 6, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 10), 4, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(4 * 350 * 1.15 * 0.95);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(6 * 150 * 1.15 * 0.95);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(4 * 250 * 1.15 * 0.95);
    });


    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos 7 y 8 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 7, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 8, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 7, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((7 * 350 - 350) * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((8 * 150 - 200) * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((7 * 250 * 0.85) * 0.90);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos 7 y 8 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 7, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 8, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 7, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((7 * 350) * 1.05 - 350) * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((8 * 150) * 1.05 - 200) * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((7 * 250) * 1.05) * 0.85) * 0.90);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos 7 y 8 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 7, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 8, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 7, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((7 * 350 * 1.10 - 350) * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((8 * 150 * 1.10 - 200) * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((7 * 250 * 1.10 * 0.85) * 0.90);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos 7 y 8  c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 7, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 10), 8, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 10), 7, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((7 * 350) * 1.15 - 350) * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((8 * 150) * 1.15 - 200) * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((7 * 250) * 1.15) * 0.85) * 0.90);
    });
    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos 7 y 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 7, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 8, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 7, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(7 * 350 * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(8 * 150 * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(7 * 250 * 0.90);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos 7 y 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 7, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 8, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 7, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((7 * 350) * 1.05) * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((8 * 150) * 1.05) * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((7 * 250) * 1.05)) * 0.90);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos 7 y 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 7, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 8, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 7, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(7 * 350 * 1.10 * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(8 * 150 * 1.10 * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(7 * 250 * 1.10 * 0.90);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos 7 y 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 7, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 10), 8, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 10), 7, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(7 * 350 * 1.15 * 0.90);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(8 * 150 * 1.15 * 0.90);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(7 * 250 * 1.15 * 0.90);
    });


    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos > 8 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 9, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 9, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 9, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((9 * 350 - 350) * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((9 * 150 - 200) * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((9 * 250 * 0.85) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos > 8 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 9, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 9, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 9, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((9 * 350) * 1.05 - 350) * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((9 * 150) * 1.05 - 200) * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((9 * 250) * 1.05) * 0.85) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos > 8 c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 9, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 9, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 9, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal((9 * 350 * 1.10 - 350) * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal((9 * 150 * 1.10 - 200) * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((9 * 250 * 1.10 * 0.85) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos > 8  c/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 9, 350, "DES1");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 10), 9, 150, "DES200");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 10), 9, 250, "DES15");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((9 * 350) * 1.15 - 350) * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((9 * 150) * 1.15 - 200) * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((9 * 250) * 1.15) * 0.85) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia de semana hora no pico grupos > 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 11, 00), 9, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 15, 100), 9, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 16, 100), 9, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(9 * 350 * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(9 * 150 * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(9 * 250 * 0.85);
    });
    it('Se calcula correctamente precio reservas dia de semana hora pico grupos > 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 24, 13, 00), 9, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 24, 13, 10), 9, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 24, 20, 10), 9, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(((9 * 350) * 1.05) * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(((9 * 150) * 1.05) * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal((((9 * 250) * 1.05)) * 0.85);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora no pico grupos > 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 11, 00), 9, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 15, 100), 9, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 16, 100), 9, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(9 * 350 * 1.10 * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(9 * 150 * 1.10 * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(9 * 250 * 1.10 * 0.85);
    });
    it('Se calcula correctamente precio reservas dia fin de semana hora pico grupos > 8 s/ desc.', function () {
        var reserva1 = new Reserva(new Date(2018, 6, 22, 13, 00), 9, 350, "");
        var reserva2 = new Reserva(new Date(2018, 6, 22, 13, 10), 9, 150, "");
        var reserva3 = new Reserva(new Date(2018, 6, 22, 20, 10), 9, 250, "");
        expect(reserva1.determinarPrecioFinal()).to.be.equal(9 * 350 * 1.15 * 0.85);
        expect(reserva2.determinarPrecioFinal()).to.be.equal(9 * 150 * 1.15 * 0.85);
        expect(reserva3.determinarPrecioFinal()).to.be.equal(9 * 250 * 1.15 * 0.85);
    });
});

