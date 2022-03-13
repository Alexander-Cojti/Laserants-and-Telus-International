const ui = {
    OnEliminarClick: () => { },
    OnEditarClick: () => { },
    onFormSubmit: (data) => {

    },
    renderFormProducto,
    renderTableProductos,
};

const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];

const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputCantidad = document.getElementById("cantidad");
const selectCategoria = document.getElementById("categoria");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const values = Array.from(data.entries());
    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    const codigo = frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = parseInt(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = frmCategoria[1];
    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria
    });
});

function renderFormProducto(producto) {
    inputCodigo.value = producto.codigo || "";
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
        const [editar, eliminar] = tr.getElementsByTagName("a");

        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.OnEliminarClick(producto.codigo);

        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.OnEditarClick(producto.codigo);
        });
     
        return tr;
    })

    tbody.innerHTML = "";
    trProductos.forEach(tr => {
        tbody.appendChild(tr);
    });

    function sumar(elementos, selector) {
        return elementos.map(selector)
            .reduce((a, b) => a + b, 0);
    }

    cantidadTotalElement.innerText = sumar(productos, x => x.cantidad);
    precioTotalElement.innerText = sumar(productos, x => x.precio);
    granTotalElement.innerText = sumar(productos, x => x.total);;

}