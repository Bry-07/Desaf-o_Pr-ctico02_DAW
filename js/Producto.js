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

    // CRITERIO 2b 
    // getValorTotal(): calcula cuánto vale este producto en inventario.
    // Multiplica el precio por la cantidad.
    getValorTotal() {
        return this.precio * this.cantidad;
    }
    
    // CRITERIO 2c 
    // getDescripcion(): devuelve un texto legible con los datos del producto.
    // El formato es exactamente: "Nombre: X | Precio: $Y | Stock: Z unidades".
    getDescripcion() {
        return "Nombre: " + this.nombre + " | Precio: $" + this.precio.toFixed(2) + " | Stock: " + this.cantidad + " unidades";
    }
    
    // CRITERIO 2d 
    // getImagen(): retorna la data URL guardada en este producto.
    // Este valor se pasa como src de la etiqueta <img> para mostrar la foto.
    getImagen() {
        return this.imagen;
    }
}