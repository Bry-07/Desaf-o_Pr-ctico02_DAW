// ============================================================
// CRITERIO 3 (20%): Clase Inventario en archivo js/Inventario.js
// ============================================================

class Inventario {
    constructor() {

        // CRITERIO 3a 
        // El inventario guarda todos los productos en un arreglo vacío.
        // Este arreglo se va llenando cuando el usuario agrega prendas.
        this.productos = [];
    }
    
    // CRITERIO 3b 
    // agregarProducto(producto): recibe un objeto Producto y lo añade al inventario.
    // .push() agrega el producto al final del arreglo this.productos.
    agregarProducto(producto) {
        this.productos.push(producto);
    }
    
    // CRITERIO 3c 
    // obtenerProductos(): retorna el arreglo completo de productos.
    // Se usa en main.js para renderizar la lista actualizada de la tabla.
    obtenerProductos() {
        return this.productos;
    }
    
    // CRITERIO 3d 
    // calcularValorInventario(): suma el valor total de cada producto.
    // Recorre el arreglo y acumula getValorTotal() de cada Producto.
    calcularValorInventario() {
        var total = 0;
        for (var i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].getValorTotal();
        }
        return total; // Retorna el valor total del inventario completo.
    }
}
