const preloadState = {
    producto: {},
    productos: []
}
const store = Redux.createStore(reducer, preloadState);

let latestState;
const unsuscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        ui.renderFormProducto(currentState.producto);
        ui.renderTableProductos(currentState.productos);
    }
});

ui.onFormSubmit = (producto) => {
    if (producto.codigo) {
        store.dispatch(productoModificado(producto));
    }
    else {
        store.dispatch(productoAgregado(producto));
    }
    store.dispatch(productoSeleccionado(null));
}

ui.OnEliminarClick = (codigo) =>  store.dispatch(productoEliminado(codigo));
ui.OnEditarClick = (codigo) => store.dispatch(productoStore.productoSeleccionado(codigo));
