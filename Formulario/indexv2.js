const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];

const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

/**@type {HTMLInputElement}*/
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/**  @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/**@type {HTMLInputElement}*/
const inputCantidad = document.getElementById("cantidad");
/**@type {HTMLInputElement}*/
const selectCategoria = document.getElementById("categoria");

const calcularTotalProducto = (cantidad,precio)=>cantidad*precio; 

const preloadState = {
    producto: {},
    productos: []
}

let codigo = 0;
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
const store = Redux.createStore(reducer, preloadState);

let latestState;
const unsuscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        renderFormProducto(currentState.producto);
        renderTableProductos(currentState.productos);
    }
    console.log(currentState);
});

function renderFormProducto(producto) {
    inputCodigo.value = producto.codigo ||"";
    inputNombre.value = producto.nombre || "";
    inputCantidad.value = producto.cantidad || "";
    inputPrecio.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}

function renderTableProductos(productos) {
    const trProductos = productos.map(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}</td>
        <td>${producto.categoria}</td>
        <td>${producto.total}</td>
        <td>
        <div class="btn-group">
        <a title="Editar" href="#"  class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-pencil-square"></i>
        </a> 
        <a title="Eliminar" href="#"  class="btn btn-sm btn-outline-danger" >
        <i class="bi bi-trash"></i>
        </a></td>
        </div>
        `;
        const [editar, eliminar]=tr.getElementsByTagName("a");

        eliminar.addEventListener("click", (event)=>{
            event.preventDefault();
            store.dispatch({
                type: "producto-eliminado",
                payload:{
                    codigo: producto.codigo
                }
            });
        });

        editar.addEventListener("click", (event)=>{
            event.preventDefault();
            store.dispatch({
                type: "producto-seleccionado",
                payload:{
                    codigo: producto.codigo
                }
            });
        });   
        return tr;
    })

    tbody.innerHTML = "";
    trProductos.forEach(tr => {
        tbody.appendChild(tr);
    });

    function sumar(elementos,selector){
      return  elementos.map(selector)
        .reduce((a,b)=>a+b,0);
    }

    cantidadTotalElement.innerText = sumar(productos,x=>x.cantidad);
    precioTotalElement.innerText = sumar(productos,x=>x.precio);
    granTotalElement.innerText = sumar(productos,x=>x.total);;

}

form.addEventListener("submit", onSubmit)

/** @param {Event} event */
function onSubmit(event) {
    event.preventDefault();

    const data = new FormData(form);

    const values = Array.from(data.entries());
    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    const codigo = frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = parseInt(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = frmCategoria[1];

    if (codigo) {
        store.dispatch({
            type: "producto-modificado",
            payload: {
                codigo,
                nombre,
                cantidad,
                precio,
                categoria,
            }
        });
    }
    else {
        store.dispatch({
            type: "producto-agregado",
            payload: {
                codigo,
                nombre,
                cantidad,
                precio,
                categoria,
            }
        });
    }
    form.reset();
    store.dispatch({
        type: "producto-seleccionado",
        payload:{
            codigo: null
        }
    });
}

// store.dispatch({
//     type: "producto-agregado",
//     payload: {
//         codigo: 1,
//         nombre: "pantalon",
//         cantidad: 2,
//         precio: 3,
//         categoria: 3,
      

//     }
// });

// store.dispatch({
//     type: "producto-agregado",
//     payload: {
//         codigo: 2,
//         nombre: "camisa",
//         cantidad: 3,
//         precio: 5,
//         categoria: 3,

//     }
// });
// store.dispatch({
//     type: "producto-agregado",
//     payload: {
//         codigo: 3,
//         nombre: "gorra",
//         cantidad: 2,
//         precio: 7,
//         categoria: 3,
      
//     }
// });

// store.dispatch({
//     type: "producto-modificado",
//     payload: {
//         codigo: 2,
//         nombre: "camisa de cuadros",
//         cantidad: 2,
//         precio: 8,
//         categoria: 3,
      
//     }
// });

// store.dispatch({
//     type: "producto-eliminado",
//     payload: {
//         codigo: 1,
//     }
// });



