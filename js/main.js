var miInventario = new Inventario();

var modoOscuro = false;

function cambiarTema() {
    modoOscuro = !modoOscuro;

    var body = document.body;
    var titulo = document.querySelector("h1");
    var btn = document.getElementById("btnTema");
    var tabla = document.getElementById("tablaProductos");
    var parrafo = document.getElementById("parrafoTotal");

    if (modoOscuro) {
        body.classList.remove("bg-light");
        body.classList.add("bg-dark", "text-light");
        titulo.classList.remove("text-dark");
        titulo.classList.add("text-light");
        tabla.classList.add("table-dark");
        parrafo.style.color = "#f8f9fa";
        btn.textContent = "Modo Claro";
    } else {
        body.classList.add("bg-light");
        body.classList.remove("bg-dark", "text-light");
        titulo.classList.add("text-dark");
        titulo.classList.remove("text-light");
        tabla.classList.remove("table-dark");
        parrafo.style.color = "";
        btn.textContent = "Modo Oscuro";
    }
}

function mostrarError(mensaje) {
    var contenedorError = document.getElementById("mensajeError");
    var textoError = document.getElementById("textoError");
    textoError.innerHTML = mensaje;
    contenedorError.style.display = "block";
    setTimeout(function () {
        contenedorError.style.display = "none";
    }, 4000);
}

function ocultarError() {
    document.getElementById("mensajeError").style.display = "none";
}

function agregarProducto() {
    var nom = document.getElementById("txtproducto").value.trim();
    var pre = document.getElementById("txtprecio").value.trim();
    var can = document.getElementById("txtcantidad").value.trim();
    var fileInput = document.getElementById("txtimagen");

    var regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
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
    if (can.includes(".")) {
        mostrarError("No se admiten decimales en la cantidad. Ingresa un número entero.");
        return;
    }
    if (!regexNumero.test(can) || parseInt(can) <= 0) {
        mostrarError("La cantidad debe ser un número entero mayor a cero (sin letras).");
        return;
    }
    if (!fileInput.files || fileInput.files.length === 0) {
        mostrarError("Debes subir una foto de la prenda.");
        return;
    }

    ocultarError();

    var reader = new FileReader();
    reader.onload = function (e) {
        var dataURL = e.target.result;

        var nuevo = new Producto(nom, pre, can, dataURL);
        miInventario.agregarProducto(nuevo);

        document.getElementById("txtproducto").value = "";
        document.getElementById("txtprecio").value = "";
        document.getElementById("txtcantidad").value = "";
        fileInput.value = "";

        mostrarEnPantalla(true);
    };
    reader.readAsDataURL(fileInput.files[0]);
}

function mostrarEnPantalla(nuevaAgregada) {
    var tbody = document.getElementById("detallevendedores");
    var totalSpan = document.getElementById("total");
    var misProductos = miInventario.obtenerProductos();

    tbody.innerHTML = "";

    if (misProductos.length === 0) {
        tbody.innerHTML = "<tr><td colspan='7' class='text-center'>No hay prendas aún.</td></tr>";
        totalSpan.innerHTML = "0.00";
        actualizarEstiloTotal(0);
        return;
    }

    var contenido = "";
    for (var i = 0; i < misProductos.length; i++) {
        var producto = misProductos[i];
        var claseAnim = (nuevaAgregada && i === misProductos.length - 1) ? "fade-in-row" : "";

        contenido += "<tr class='" + claseAnim + "'>";
        contenido += "<td><img src='" + producto.getImagen() + "' alt='" + producto.nombre + "' style='width:60px;height:60px;object-fit:cover;border-radius:6px;'></td>";
        contenido += "<td>" + producto.nombre + "</td>";
        contenido += "<td>" + producto.getDescripcion() + "</td>";
        contenido += "<td>$" + producto.precio.toFixed(2) + "</td>";
        contenido += "<td>" + producto.cantidad + "</td>";
        contenido += "<td>$" + producto.getValorTotal().toFixed(2) + "</td>";
        contenido += "<td><button onclick='eliminarProducto(" + i + ")' class='btn btn-sm btn-danger'>Eliminar</button></td>";
        contenido += "</tr>";
    }

    tbody.innerHTML = contenido;

    var total = miInventario.calcularValorInventario();
    totalSpan.innerHTML = total.toFixed(2);
    actualizarEstiloTotal(total);

    if (nuevaAgregada) {
        tbody.style.backgroundColor = "#d4edda";
        setTimeout(function () {
            tbody.style.backgroundColor = "";
        }, 2000);
    }
}

function actualizarEstiloTotal(total) {
    var parrafo = document.getElementById("parrafoTotal");
    if (total > 500) {
        parrafo.style.color = "green";
        parrafo.style.scale = "1.2";
        parrafo.style.fontWeight = "bold";
    } else {
        parrafo.style.color = "";
        parrafo.style.scale = "";
        parrafo.style.fontWeight = "";
    }
}

function eliminarProducto(indice) {
    miInventario.productos.splice(indice, 1);
    mostrarEnPantalla(false);
}

function eliminarTodos() {
    miInventario.productos = [];
    mostrarEnPantalla(false);
}

mostrarEnPantalla(false);
