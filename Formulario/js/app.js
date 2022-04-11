const preloadState = {
    producto: {},
    productos: []
}
const middlewares = Redux.applyMiddleware(
    loggerMiddleware,
    agregaroModificarProductoMiddleware,
    generadorCodigoProductoBuilder(0),
);
const store = Redux.createStore(reducer, preloadState, middlewares);

let latestState;
const unsuscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        ui.renderFormProducto(currentState.producto);
        ui.renderTableProductos(currentState.productos);
    }
});

store.subscribe(dispatchOnChange(store,(state)=>{
    ui.renderFormProducto(state.producto);
    ui.renderTableProductos(state.productos);
}));

ui.onFormSubmit = producto => store.dispatch(agregarOModificarProducto(producto));
ui.OnEliminarClick = codigo => store.dispatch(productoEliminado(codigo));
ui.OnEditarClick = codigo => store.dispatch(productoStore.productoSeleccionado(codigo));

function dispatchOnChange(store, dispatch) {
    let latestState;
    return function () {
        let currentState = store.getState();
        if (currentState != latestState) {
            latestState = currentState;
            dispatch(currentState);
        }
    }
}