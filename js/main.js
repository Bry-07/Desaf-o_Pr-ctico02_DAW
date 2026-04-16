
// Creamos la única instancia del inventario que usará toda la app.
// Al ser "var" en el scope global, todas las funciones pueden accederla.
var miInventario = new Inventario();

// Variable global que recuerda si el tema oscuro está activado o no.
// false = modo claro (estado inicial), true = modo oscuro.
var modoOscuro = false;


// ============================================================
// CRITERIO 6f (10%): Botón "Cambiar Tema" que alterna entre
// modo claro y oscuro modificando propiedades del DOM.
// ============================================================
function cambiarTema() {
    modoOscuro = !modoOscuro; // Invierte el valor: false --> true, true --> false.
    
    // Seleccionamos los elementos del DOM que vamos a actualizar.
    var body    = document.body;                          // Elemento <body> completo
    var titulo  = document.querySelector("h1");         // El título principal
    var btn     = document.getElementById("btnTema");   // El botón de cambiar tema
    var tabla   = document.getElementById("tablaProductos"); // La tabla de productos
    var parrafo = document.getElementById("parrafoTotal");   // El párrafo del total

    if (modoOscuro) {
        // Activar modo oscuro 
        body.classList.remove("bg-light");           // Quitamos el fondo claro
        body.classList.add("bg-dark", "text-light"); // Ponemos fondo oscuro y texto claro

        titulo.classList.remove("text-dark");        // Quitamos texto oscuro del h1
        titulo.classList.add("text-light");          // Ponemos texto claro en el h1

        tabla.classList.add("table-dark");           // Cambiamos la tabla a estilo oscuro

        // El texto del párrafo se pone claro para que contraste con el fondo oscuro.
        parrafo.style.color = "#f8f9fa";
        btn.textContent = "Modo Claro";              // Actualizamos el texto del botón

    } else {
        // Volver a modo claro 
        body.classList.add("bg-light");              // Restauramos el fondo claro
        body.classList.remove("bg-dark", "text-light");

        titulo.classList.add("text-dark");           // Restauramos texto oscuro en el h1
        titulo.classList.remove("text-light");

        tabla.classList.remove("table-dark");        // Quitamos el estilo oscuro de la tabla

        parrafo.style.color = "";                    // Dejamos el color por defecto
        btn.textContent = "Modo Oscuro";             // Cambiamos el texto del botón de nuevo
    }
}

// ============================================================
// CRITERIO 4e-f: Mostrar y ocultar el mensaje de error en rojo.
// El div #mensajeError ya tiene clase "alert-danger" (rojo Bootstrap).
// ============================================================


// Muestra el div de error con el mensaje dado y lo oculta automáticamente a los 4 segundos.
function mostrarError(mensaje) {
    var contenedorError = document.getElementById("mensajeError");
    var textoError      = document.getElementById("textoError");
    textoError.innerHTML          = mensaje;        // Escribimos el mensaje en el span interno.
    contenedorError.style.display = "block";       // Hacemos visible el mensaje de error.
    setTimeout(function() {
        contenedorError.style.display = "none";    // Lo ocultamos después de 4 segundos.
    }, 4000);
}

// Oculta el div de error inmediatamente cuando no hay ningún fallo.
function ocultarError() {
    document.getElementById("mensajeError").style.display = "none";
}

// ============================================================
// CRITERIO 4 (20%): Función principal del formulario.
// Lee inputs, valida con regex y agrega la prenda al inventario.
// ============================================================
function agregarProducto() {
    // Leemos el valor de cada input y quitamos espacios extra con .trim().
    var nom       = document.getElementById("txtproducto").value.trim();
    var pre       = document.getElementById("txtprecio").value.trim();
    var can       = document.getElementById("txtcantidad").value.trim();
    var fileInput = document.getElementById("txtimagen"); // Input file de la foto

    // CRITERIO 4d: Validación con expresiones regulares 
    // regexNombre permite solo letras, espacios y tildes.
    var regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // regexNumero permite dígitos y opcionalmente decimales con punto.
    var regexNumero = /^[0-9]+(\.[0-9]+)?$/;

    if (nom === "") {
        mostrarError("El campo 'Producto' no puede estar vacío.");
        return;
    }
    if (!regexNombre.test(nom)) {
        mostrarError("El nombre solo puede contener letras, espacios y tildes.");
        return;
    }
    if (pre === "") {
        mostrarError("El campo 'Precio' no puede estar vacío.");
        return;
    }
    if (!regexNumero.test(pre) || parseFloat(pre) <= 0) {
        mostrarError("El precio debe ser un número mayor a cero (sin letras).");
        return;
    }
    if (can === "") {
        mostrarError("El campo 'Cantidad' no puede estar vacío.");
        return;
    }
    if (!regexNumero.test(can) || parseInt(can) <= 0) {
        mostrarError("La cantidad debe ser un número entero mayor a cero.");
        return;
    }
    if (!fileInput.files || fileInput.files.length === 0) {
        mostrarError("Debes subir una foto de la prenda.");
        return;
    }

    // Si todo es válido, ocultamos cualquier mensaje de error previo.
    ocultarError();

    // CRITERIO 4b + 2a: Leer la imagen como data URL usando FileReader.
    var reader = new FileReader();
    reader.onload = function(e) {
        var dataURL = e.target.result; // Data URL lista para almacenarse.

        // CRITERIO 2a: Creamos el objeto Producto con los datos del formulario.
        var nuevo = new Producto(nom, pre, can, dataURL);

        // CRITERIO 3b: Agregamos el producto al inventario.
        miInventario.agregarProducto(nuevo);

        // CRITERIO 4d: Limpiamos todos los campos del formulario.
        document.getElementById("txtproducto").value = "";
        document.getElementById("txtprecio").value   = "";
        document.getElementById("txtcantidad").value = "";
        fileInput.value = ""; // Resetea el input file para permitir subir otra imagen.

        // CRITERIO 5a: Actualizamos la interfaz con la nueva prenda.
        mostrarEnPantalla(true);
    };

    // Iniciamos la lectura del archivo seleccionado.
    reader.readAsDataURL(fileInput.files[0]);
}

// ============================================================
// CRITERIO 5 (20%): Mostrar lista de prendas dinámicamente.
// ============================================================
function mostrarEnPantalla(nuevaAgregada) {
    var tbody        = document.getElementById("detallevendedores"); // Cuerpo de la tabla
    var totalSpan    = document.getElementById("total");             // Span donde va el valor total
    var misProductos = miInventario.obtenerProductos();              // Todos los productos actuales

    // Limpiamos el contenido previo para volver a dibujar la lista completa.
    tbody.innerHTML = "";

    if (misProductos.length === 0) {
        // CRITERIO 5c: Mensaje visible cuando no hay prendas en el inventario.
        // Si el inventario está vacío mostramos esta fila en la tabla.
        tbody.innerHTML = "<tr><td colspan='7' class='text-center'>No hay prendas aún.</td></tr>";
        // El total también se actualiza para reflejar inventario vacío.
        totalSpan.innerHTML = "0.00";
        actualizarEstiloTotal(0);
        return;
    }

    // Construimos el HTML de cada fila para mostrar la tabla completa.
    // 5b
    var contenido = "";
    for (var i = 0; i < misProductos.length; i++) {
        var producto = misProductos[i];
        var claseAnim = (nuevaAgregada && i === misProductos.length - 1) ? "fade-in-row" : "";

        contenido += "<tr class='" + claseAnim + "'>";
        // Aquí se cumple el criterio: la foto se muestra con <img src='data URL'>
        contenido += "<td><img src='" + producto.getImagen() + "' alt='" + producto.nombre + "' style='width:60px;height:60px;object-fit:cover;border-radius:6px;'></td>";
        contenido += "<td>" + producto.nombre + "</td>";
        // Aquí se cumple el criterio: la descripción se muestra usando getDescripcion()
        contenido += "<td>" + producto.getDescripcion() + "</td>";
        contenido += "<td>$" + producto.precio.toFixed(2) + "</td>";
        contenido += "<td>" + producto.cantidad + "</td>";
        contenido += "<td>$" + producto.getValorTotal().toFixed(2) + "</td>";
        contenido += "<td><button onclick='eliminarProducto(" + i + ")' class='btn btn-sm btn-danger'>Eliminar</button></td>";
        contenido += "</tr>";
    }
    // Colocamos todas las filas en el tbody.
    tbody.innerHTML = contenido;

    // CRITERIO 5d: Actualizamos el total acumulado del inventario.
    var total = miInventario.calcularValorInventario();
    totalSpan.innerHTML = total.toFixed(2);

    // CRITERIO 6c: Ajustamos el estilo del total según si supera $500.
    actualizarEstiloTotal(total);

    if (nuevaAgregada) {
        // CRITERIO 6a: Cambio temporal de fondo verde para feedback visual.
        // Aquí se colorea el contenedor de la lista (tbody) durante 2 segundos.
        tbody.style.backgroundColor = "#d4edda";
        setTimeout(function() {
            tbody.style.backgroundColor = "";
        }, 2000);
    }
}


// ============================================================
// CRITERIO 6c (10%): Cambiar estilo visual del total según monto.
// ============================================================
function actualizarEstiloTotal(total) {
    var parrafo = document.getElementById("parrafoTotal");
    if (total > 500) {
        parrafo.style.color      = "green";
        parrafo.style.fontSize   = "1.4rem";
        parrafo.style.fontWeight = "bold";
    } else {
        parrafo.style.color      = "";
        parrafo.style.fontSize   = "";
        parrafo.style.fontWeight = "";
    }
}


// Elimina una prenda por su índice en el arreglo.
function eliminarProducto(indice) {
    miInventario.productos.splice(indice, 1);
    mostrarEnPantalla(false);
}


// Elimina todas las prendas del inventario.
function eliminarTodos() {
    miInventario.productos = [];
    mostrarEnPantalla(false);
}


// Al cargar la página, mostramos el estado inicial del inventario.
mostrarEnPantalla(false);
