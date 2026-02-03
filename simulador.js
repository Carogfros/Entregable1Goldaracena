console.log("Comienza simulador nutricional");

// Constantes
const FACTORES_ACTIVIDAD = [1.2, 1.3, 1.4, 1.6];

// Paso 1: Pedir datos al usuario
function pedirDatosUsuario() {
    let nombre = prompt("Ingrese su nombre:");

    // Si el usuario presiona Cancel
    if (nombre === null) {
        return null;
    }

    let edad = Number(prompt("Ingrese su edad:"));
    let peso = Number(prompt("Ingrese su peso en kg:"));
    let altura = Number(prompt("Ingrese su altura en cm:"));

    return { nombre, edad, peso, altura };
}

// Paso 2: Solicitar el sexo del usuario
function obtenerSexo() {
   
    let sexo = prompt("Ingrese su sexo (1 = Mujer, 2 = Hombre)");

    while (sexo !== "1" && sexo !== "2") {
        sexo = prompt("Opción inválida. Ingrese 1 para Mujer o 2 para Hombre");
    }

    return sexo === "1"; // Devuelve true si es mujer, false si es hombre
   
}

// Paso 3: Calcular el metabolismo basal según sexo (utilizando ecuación Harris-Benedict)
function calcularMetabolismoBasal(peso, altura, edad, esMujer) {
    let metabolismo;

    if (esMujer) {
        // Fórmula Harris-Benedict para mujeres
        metabolismo = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad);
    } else {
        // Fórmula Harris-Benedict para hombres
        metabolismo = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad);
    }

    return metabolismo;
}

// Paso 4: Determinar el nivel de actividad física
function seleccionarActividad() {
    let opcion = Number(
        prompt(
            "Seleccione su nivel de actividad física. " +
            "1 Sedentario, " +
            "2 Actividad ligera, " +
            "3 Actividad moderada, " +
            "4 Actividad intensa"
        )
    );

    while (opcion < 1 || opcion > 4 || isNaN(opcion)) {
        opcion = Number(
            prompt(
                "Opción inválida. " +
                "1 Sedentario, " +
                "2 Actividad ligera, " +
                "3 Actividad moderada, " +
                "4 Actividad intensa"
            )
        );
    }

    return FACTORES_ACTIVIDAD[opcion - 1];
}

// Paso 5: Mostrar resultados al usuario
function mostrarResultados(nombre, calorias) {
    let caloriasMostradas = calorias * 100;
    caloriasMostradas = parseInt(caloriasMostradas);
    caloriasMostradas = caloriasMostradas / 100;

    alert(
        "Hola " + nombre + ". " +
        "Tu requerimiento energético diario estimado es de " +
        caloriasMostradas + " kcal."
    );
}

// Programa principal
function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
        let datos = pedirDatosUsuario();

    if (datos === null) {
    alert("Sin datos no hay requerimiento energético estimado");
    return;
}
        let esMujer = obtenerSexo();

        let metabolismo = calcularMetabolismoBasal(
            datos.peso,
            datos.altura,
            datos.edad,
            esMujer
        );

        let factorActividad = seleccionarActividad();
        let caloriasDiarias = metabolismo * factorActividad;

        console.log("Nombre:", datos.nombre);
        console.log("Sexo:", esMujer ? "Mujer" : "Hombre");
        console.log("Metabolismo basal:", metabolismo);
        console.log("Factor de actividad:", factorActividad);
        console.log("Calorías diarias:", caloriasDiarias);

        mostrarResultados(datos.nombre, caloriasDiarias);

        continuar = confirm("¿Desea realizar otro requerimiento calórico?");
    }

    alert("Gracias por utilizar el simulador nutricional");
}

// Invocación del simulador
iniciarSimulador();