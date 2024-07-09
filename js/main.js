// Mesas
let mesasDisponibles = [1,2,3,4,5];
let mesasUtilizadas = [];

// Menú de la cafetería
const productos = [
    {id: 1, nombre: "Café Americano", precio: 1500},
    {id: 2, nombre: "Chocolate Caliente", precio: 2000},
    {id: 3, nombre: "Capuccino vainilla", precio: 1800},
];

// Array para ordenes
const ordenes = [];

// Crear Orden / Pedido
class Orden {
    constructor (mesa, orden){
        this.id = this.generarId();
        this.mesa = mesa;
        this.orden = orden;
        ordenes.push(this);
    }
    generarId(){
        let max = 0;
        ordenes.forEach(orden => {
            if(orden.id > max){
                max = orden.id;
            }
        });
        return max + 1;
    }
    listarProductos(){
        let salida = "";
        for (const productoId of this.orden) {
            const producto = productos.find(prod => prod.id === productoId);
            if (producto) {
                salida += `ID: ${producto.id} | ${producto.nombre} - $${producto.precio}\n`;
            }
        }
        return salida;
    }
    calcularSubTotal(){
        let subtotal = 0;
        for (const productoId of this.orden) {
            const producto = productos.find(item => item.id === productoId)
            if(producto){
                subtotal += producto.precio;
            }
        }
        return subtotal;
    }
    sumarIva(){
        let subtotal = this.calcularSubTotal();
        return subtotal + (subtotal * 0.19);
    }
    mostrarComanda(){
        let textoSalida = `Orden N°: ${this.id} \nMesa: ${this.mesa} \nPEDIDO: \n${this.listarProductos()} \nSubtotal: $${this.calcularSubTotal()} \nTOTAL A PAGAR: $${this.sumarIva()}`;
        alert(textoSalida);
    }
}

// FUNCIÓN REVISAR ORDENES
const ordenesMesa = (nMesa) => {
    const listaOrdenes = ordenes.filter(item => item.mesa === nMesa);
    let textoOrdenes = `ORDENES MESA N° ${nMesa}: \n`;
    while(!isNaN(nMesa) && nMesa !== null){
        if(listaOrdenes.length > 0){
            for (const orden of listaOrdenes) {
                textoOrdenes += `Orden N° ${orden.id} - Cantidad de pedidos: ${orden.orden.length} - Total: $${orden.sumarIva()} \n`;
            }
        } else{
            textoOrdenes = `No hay ordenes en la mesa N° ${nMesa}`;
        }
        alert(textoOrdenes);
        break;
    }
}


// INGRESO DE DATOS
let mesa = parseInt(prompt(`NUEVA ORDEN Cafetería Tous L' Jours \n\nMesas disponibles: ${mesasDisponibles.join(", ")} \n\nIndique n° mesa: `));

// PROCESAMIENTO DATOS
while(!isNaN(mesa) && mesa !== null){
    // ACTUALIZACIÓN DE MESAS DISPONIBLES
    while(mesasDisponibles.includes(mesa)){
        mesasDisponibles.splice(mesasDisponibles.indexOf(mesa), 1);
        mesasUtilizadas.push(mesa);
        break;
    }
    
    // Recorrer y Mostrar menú 
    let salida = "MENÚ DISPONIBLE: \n";
    for (const producto of productos) {
        salida += `ID: ${producto.id} | ${producto.nombre} - $${producto.precio} \n`;
    }
    
    // Array para Productos solicitados
    const pedido = [];

    // Solicitar producto
    let producto = prompt(salida += "\nIngresa el ID del producto (ESC para finalizar orden): ");
    while(producto.toUpperCase() != "ESC" && producto !== ""){
        pedido.push(parseInt(producto));
        producto = prompt(salida);
    }

    // GENERAR ORDEN CON LOS DATOS OBTENIDOS
    const orden = new Orden(mesa, pedido);
    orden.mostrarComanda();

    // SALIDA
    mesa = parseInt(prompt(`NUEVA ORDEN Cafetería Tous L' Jours \n\nMesas disponibles: ${mesasDisponibles.join(", ")} \nMesas Utilizadas: ${mesasUtilizadas.join(", ")} \n\nIndique nuevo n° mesa o agrega nueva orden a una mesa: `));
}

// REVISAR Y BUSCAR ORDENES POR MESA
let mesaOrden = parseInt(prompt("Buscar ordenes por n° de mesa:"));
while(!isNaN(mesaOrden) && mesaOrden !== null){
    ordenesMesa(mesaOrden);
    mesaOrden = parseInt(prompt("Buscar otras ordenes por n° de mesa:"));
}