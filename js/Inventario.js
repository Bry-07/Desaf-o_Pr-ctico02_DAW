class Inventario {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    obtenerProductos() {
        return this.productos;
    }

    calcularValorInventario() {
        var total = 0;
        for (var i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].getValorTotal();
        }
        return total;
    }
}
