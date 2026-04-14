// ============================================================
// CRITERIO 2 (20%): Clase Producto en archivo js/Producto.js
// ============================================================


class Producto {
    // CRITERIO 2a
    // Este constructor recibe los datos del formulario y los guarda en el objeto:
    //   nombre   nombre de la prenda como texto
    //   precio   precio unitario convertido a número decimal
    //   cantidad cantidad disponible convertida a número entero
    //   imagen   cadena data URL con la foto para mostrarla en el navegador
    
    constructor(nombre, precio, cantidad, imagen) {
        this.nombre   = nombre;
        this.precio   = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.imagen   = imagen;
    }

    getValorTotal() {
        return this.precio * this.cantidad;
    }

    getDescripcion() {
        return "Nombre: " + this.nombre +
               " | Precio: $" + this.precio.toFixed(2) +
               " | Stock: " + this.cantidad + " unidades";
    }

    getImagen() {
        return this.imagen;
    }
}