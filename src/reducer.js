export const initialState = {//para que se pueda consumir en index.js
    vendedor: null, //creamos un usuario vendedor que empieza siendo null, este lo podemos usar en todo el codigo
    idVendedor: 0,
    modalCrearYEditarProducto: false, //modal para crear el producto, distinta a la de editar, detelle y ventanas de confirmacion
    arrayProductos: [], //array que voy a cargar con los productos dependiendo el ID de vendedor que le pase, no el vendedor logueado. asi uso este array para el comprador
    eleccionDiseño: null, //variable que me sirve para que el vendedor eliga su diseño y cuando alguien entre a su sitio se ve
}

//basicamente, cuando en el catalogo de productos se aprieta el boton de agregar al carrito un producto, llamamos al checkoutpage mandandole un objeto agregado al array BASKET
//para que se mustre en el carrito


export const actionTypes = {
    SET_VENDEDOR: "SET_VENDEDOR",
    SET_ID_VENDEDOR: "SET_ID_VENDEDOR",
    SET_MODAL_CREAR_Y_EDITAR_PRODUCTO: "SET_MODAL_CREAR_Y_EDITAR_PRODUCTO",
    ADD_EN_ARRAY_PRODUCTOS: "ADD_EN_ARRAY_PRODUCTOS",
    MODIFICAR_PRODUCTO_EN_ARRAY: "MODIFICAR_PRODUCTO_EN_ARRAY",
    MODIFICAR_ELECCION_DISEÑO: "MODIFICAR_ELECCION_DISEÑO",
}



const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "SET_VENDEDOR"://desde login llenamos este con el dispatch
            return {
                ...state,
                vendedor: action.vendedor
            }

        case "SET_ID_VENDEDOR"://desde login llenamos este con el dispatch
            return {
                ...state,
                idVendedor: action.idVendedor
            }

        case "SET_MODAL_CREAR_Y_EDITAR_PRODUCTO"://desde login llenamos este con el dispatch
            return {
                ...state,
                modalCrearYEditarProducto: action.modalCrearYEditarProducto
            }

        case "ADD_EN_ARRAY_PRODUCTOS":
            return { //tenemos que retornar esto. cambiamos el estado inicial
                ...state, //deja esto igual
                arrayProductos: [...state.arrayProductos, action.item], //pero en el array agrega al array lo que estemos inyectando, el nuevo producto.
            };

        case "MODIFICAR_ELECCION_DISEÑO"://desde login llenamos este con el dispatch
            return {
                ...state,
                eleccionDiseño: action.eleccionDiseño
            }


        // case "MODIFICAR_PRODUCTO_EN_ARRAY":
        //     let posicionProducto = state.arrayProductos.findIndex(arrayProductosItem => arrayProductosItem.Id === action.Id) //esta variable indice, toma la posicion del array de aquiel id que pasaron por component. findIndex te da un basketItem y su ID es igual al ID que te pasaron por el componente. si el id es 3, y ese ID se encuentra en la posicion del array 2, se eliminara esa posicion
        //     let nuevoArrayProductos = [...state.arrayProductos] //copia del array de productos
        //     nuevoArrayProductos[posicionProducto] = action.item
        //     // if (posicionProducto >= 0){  //si encontraste el indice de la posicion del ID q se paso como parametro
        //     //     newBasket.splice(index, 1) //este metodo de javascript busca el indice y elimina el elemento que encuentre con ese indice. el 1 es para que elimine 1 

        //     // } else{ 
        //     //     console.log("Cant remove product!!") 
        //     // }
        //     return {
        //         ...state, //retornamos todo el estado
        //         arrayProductos: nuevoArrayProductos, //el basket le asignamos el nuevo array que no contiene el que se quiso eliminar
        //     }


        default: return state; //en caso de default solo retornamos el state
    }

}

export default reducer;

