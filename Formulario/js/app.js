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

ui.onFormSubmit = (payload) => {
    if (payload.codigo) {
        store.dispatch({
            type: "producto-modificado",
            payload
        });
    }
    else {
        store.dispatch({
            type: "producto-agregado",
            payload
        });
    }
    store.dispatch({
        type: "producto-seleccionado",
        payload: {
            codigo: null
        }
    });
}

ui.OnEliminarClick = (codigo) => {
    store.dispatch({
        type: "producto-eliminado",
        payload: { codigo }
    });
}

ui.OnEditarClick = (codigo) => {
    store.dispatch({
        type: "producto-seleccionado",
        payload: { codigo }
    });
}