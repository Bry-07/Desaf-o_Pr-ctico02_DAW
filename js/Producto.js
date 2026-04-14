class Producto {
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