const actionTypes = {
    PRODUCTO_AGREGADO: "producto-agregado",
    PRODUCTO_ELIMINADO: "producto-eliminado",
    PRODUCTO_MODIFICADO: "producto-modificado",
    PRODUCTO_SELECCIONADO: "producto-seleccionado",
    PRODUCTO_AGREGADO_MODIFICADO: "producto_agregado-o-modificado"
};

const calcularTotalProducto = (cantidad, precio) => cantidad * precio;

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTO_AGREGADO:
            return productoAgregadoReducer(state, action);
        case actionTypes.PRODUCTO_MODIFICADO:
            return productoModificadoReducer(state, action);
        case actionTypes.PRODUCTO_ELIMINADO:
            return productoEliminadoReducer(state, action);
        case actionTypes.PRODUCTO_SELECCIONADO:
            return productoSeleccionadoReducer(state, action);
        default:
            return state;
    }
};

const productoSeleccionado = (codigo) => ({
    type: actionTypes.PRODUCTO_SELECCIONADO,
    payload: { codigo }
})

const productoEliminado = (codigo) => ({
    type: actionTypes.PRODUCTO_ELIMINADO,
    payload: { codigo }
})

const productoModificado = (payload) => ({
    type: actionTypes.PRODUCTO_MODIFICADO,
    payload
});

const productoAgregado = (payload) => ({
    type: actionTypes.PRODUCTO_AGREGADO,
    payload
});

const agregarOModificarProducto = (payload) => ({
    type: actionTypes.PRODUCTO_AGREGADO_MODIFICADO,
    payload
});


const productoStore = {
    reducer,
    productoSeleccionado
}

const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    console.log("next state", store.getState());
    return next(action);
}

const agregaroModificarProductoMiddleware = store => next => action => {
    if (action.type != actionTypes.PRODUCTO_AGREGADO_MODIFICADO) {
        return next(action);
    }
    const producto = action.payload;
    const actionToDispatch = (producto.codigo) ?
        productoModificado(producto) :
        productoAgregado(producto);

    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

function productoSeleccionadoReducer(state, action) {
    return {
        ...state,
        producto: state.productos.find(p => p.codigo == action.payload.codigo) || {}
    };
}

function productoEliminadoReducer( state,action) {
    const codigo = action.payload.codigo;
    const productos = state.productos.filter(p => p.codigo != codigo);
    return {
        ...state,
        productos
    };
}

function productoModificadoReducer( state,action) {
    const producto = action.payload;
    const total = calcularTotalProducto(producto.cantidad, producto.precio);
    const productos = state.productos.slice();
    const codigo = producto.codigo;
    const old = productos.find(p => p.codigo == codigo);
    const index = productos.indexOf(old);
    productos[index] = { ...producto, total };
    return {
        ...state,
        productos
    };
}

function productoAgregadoReducer(state,action) {
    const producto = action.payload;
    const total = calcularTotalProducto(producto.cantidad, producto.precio);
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...producto,
                total
            }
        ]
    };
}

function generadorCodigoProductoBuilder(codigoInicial) {
    let codigo = codigoInicial;
    return store => next => action => {
        if (action.type != actionTypes.PRODUCTO_AGREGADO) {
            return next(action);
        }
        codigo++;
        const actionToDispatch = {
            ...action,
            payload: { ...action.payload, codigo }
        };
        return next(actionToDispatch);
    };
}


