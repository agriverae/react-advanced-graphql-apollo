import React, {useState} from 'react';

import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PRODUCTO } from '../../Mutations';

import { withRouter } from 'react-router-dom';

const FormularioEditarProducto = (props) => {

    const [producto, setProducto] = useState({
        ...props.producto.obtenerProducto
    })

    const limpiarState = () => {
        setProducto({
            nombre: '',
            precio: '',
            stock: ''
        })
    }

    const editarProductoForm = (e, updateProducto) => {
        e.preventDefault();

        updateProducto().then(data => {
            limpiarState()
        })
    }

    const actualizarProducto = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const validarForm = () => {
        const {nombre, precio, stock } = producto;

        const noValido = !nombre || !precio || !stock;

        return noValido;
    }

    const input = {
        id: props.id,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        stock: Number(producto.stock)
    }

    return (
        <Mutation 
            mutation={ACTUALIZAR_PRODUCTO}
            variables={{input}}
            key={props.id}
            onCompleted={() => props.refetch().then(() => {
                props.history.push('/productos');
            })}
        >
        {( updateProducto, {loading, error, data}) => {
            return (
                <form 
                    className="col-md-8"
                    onSubmit={e => editarProductoForm(e, updateProducto)}
                >
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input 
                            onChange={actualizarProducto}
                            type="text"
                            name="nombre" 
                            className="form-control" 
                            placeholder="Nombre del Producto"
                            value={producto.nombre}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input 
                                onChange={actualizarProducto}
                                type="number" 
                                name="precio" 
                                className="form-control" 
                                placeholder="Precio del Producto"
                                value={producto.precio}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input 
                            onChange={actualizarProducto}
                            type="number" 
                            name="stock" 
                            className="form-control" 
                            placeholder="stock del Producto"
                            value={producto.stock}
                        />
                    </div>
                    <button 
                        disabled={validarForm()}
                        type="submit" 
                        className="btn btn-success float-right">
                                Guardar Cambios
                    </button>
                </form>
            )
        }}

        </Mutation>
    )
}

export default withRouter(FormularioEditarProducto);