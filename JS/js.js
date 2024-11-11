// Elementos de la calculadora
const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const historialContainer = document.getElementById("historial");

// Inicialización del historial desde localStorage
let historial = JSON.parse(localStorage.getItem("historial")) || [];

// Array de botones de la calculadora
const botones = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '*',
    '0', 'C', '=', '/'
];

// Función para mostrar los botones en el DOM
function crearBotones() {
    botones.forEach(simbolo => {
        const boton = document.createElement("button");
        boton.textContent = simbolo;
        boton.classList.add("button");

        if (simbolo === 'C') {
            boton.classList.add("clear");
        } else if (['+', '-', '*', '/'].includes(simbolo)) {
            boton.classList.add("operation");
        }

        boton.addEventListener("click", () => manejarClick(simbolo));
        buttonsContainer.appendChild(boton);
    });
}

// Función para manejar clicks en los botones
let operadorActual = '';
let numeroAnterior = '';
let nuevaOperacion = false;

function manejarClick(simbolo) {
    if (!isNaN(simbolo)) { // Es un número
        if (nuevaOperacion) {
            display.textContent = simbolo;
            nuevaOperacion = false;
        } else {
            display.textContent = display.textContent === '0' ? simbolo : display.textContent + simbolo;
        }
    } else if (simbolo === 'C') { // Limpiar
        limpiar();
    } else if (simbolo === '=') { // Calcular
        calcular();
    } else { // Es un operador
        operadorActual = simbolo;
        numeroAnterior = display.textContent;
        nuevaOperacion = true;
    }
}

// Función para calcular y mostrar el resultado
function calcular() {
    if (!operadorActual || !numeroAnterior) return;

    const numeroActual = display.textContent;
    let resultado;

    switch (operadorActual) {
        case '+':
            resultado = parseFloat(numeroAnterior) + parseFloat(numeroActual);
            break;
        case '-':
            resultado = parseFloat(numeroAnterior) - parseFloat(numeroActual);
            break;
        case '*':
            resultado = parseFloat(numeroAnterior) * parseFloat(numeroActual);
            break;
        case '/':
            resultado = parseFloat(numeroActual) === 0 ? 'Error' : parseFloat(numeroAnterior) / parseFloat(numeroActual);
            break;
    }

    display.textContent = resultado;
    guardarEnHistorial(numeroAnterior, operadorActual, numeroActual, resultado);
    operadorActual = '';
    numeroAnterior = '';
    nuevaOperacion = true;
}

// Función para limpiar la pantalla
function limpiar() {
    display.textContent = '0';
    operadorActual = '';
    numeroAnterior = '';
}

// Función para guardar en el historial y en localStorage
function guardarEnHistorial(num1, oper, num2, resultado) {
    const operacion = `${num1} ${oper} ${num2} = ${resultado}`;
    historial.push(operacion);

    // Guardar historial en localStorage
    localStorage.setItem("historial", JSON.stringify(historial));

    mostrarHistorial();
}

// Función para mostrar el historial en el DOM
function mostrarHistorial() {
    historialContainer.innerHTML = '';
    historial.forEach(op => {
        const item = document.createElement("li");
        item.textContent = op;
        historialContainer.appendChild(item);
    });
}

// Inicializar la calculadora
crearBotones();
mostrarHistorial();