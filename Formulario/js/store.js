let codigo = 0;
const calcularTotalProducto = (cantidad,precio)=>cantidad*precio; 
const reducer = (state, action) => {
    if (action.type == "producto-agregado") {
        codigo++;
        const producto = action.payload;
        const total = calcularTotalProducto(producto.cantidad, producto.precio);
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    ...producto,
                    codigo,
                    total
                }
            ]
        };
    }
    if (action.type == "producto-modificado") { 
        const producto=action.payload;
        const total = calcularTotalProducto(producto.cantidad, producto.precio);
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const old = productos.find(p => p.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = { ...producto,total };
        return{
            ...state,
            productos
        }
    }
    if (action.type == "producto-eliminado") {
        const codigo = action.payload.codigo;
        const productos = state.productos.filter(p => p.codigo != codigo);
        return{
            ...state,
            productos
        }
    }

    if(action.type=="producto-seleccionado"){
        return{
            ...state,
            producto: state.productos.find(p=>p.codigo==action.payload.codigo) ||{}
        }
    }
    return state;
}

const productoSeleccionado=(codigo)=>({
    type:"producto-seleccionado",
    payload:{codigo}
})

const productoEliminado=(codigo)=>({
    type:"producto-eliminado",
    payload:{codigo}
})

const productoModificado = (payload) => ({
    type: "producto-modificado",
    payload
})

const productoAgregado= (payload)=>({
    type: "producto-agregado",
    payload
})

const productoStore={
    reducer,
    productoSeleccionado
}