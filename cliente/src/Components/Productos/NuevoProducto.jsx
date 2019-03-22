import React, { Fragment, useState } from 'react'

import { NUEVO_PRODUCTO } from '../../Mutations';
import { Mutation } from 'react-apollo';

const NuevoProducto  = (props) => {

    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        stock: ''
    })

    const limpiarState = () => {
        setProducto({
            nombre: '',
            precio: '',
            stock: ''
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
        nombre: producto.nombre,
        precio: Number(producto.precio),
        stock: Number(producto.stock)
    }

    const crearNuevoProducto = (e, nuevoProducto) => {
        e.preventDefault();
        // insertamos en la base de datos
        nuevoProducto().then(data => {
            limpiarState();
            props.history.push('/productos');
        })
    }

    return (
        <Fragment>
            <h1 className="text-center mb-5">Nuevo Producto</h1>
            <div className="row justify-content-center">
                <Mutation
                    mutation={NUEVO_PRODUCTO}
                    variables={{input}}
                >
                {(nuevoProducto, {loading, error, data}) => {
                    return (
                        <form 
                            className="col-md-8"
                            onSubmit={e => crearNuevoProducto(e, nuevoProducto)}
                        >
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    type="text"
                                    name="nombre" 
                                    className="form-control" 
                                    placeholder="Nombre del Producto"
                                    onChange={actualizarProducto}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input 
                                        type="number" 
                                        name="precio" 
                                        className="form-control" 
                                        placeholder="Precio del Producto"
                                        onChange={actualizarProducto}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Stock:</label>
                                <input 
                                    type="number" 
                                    name="stock" 
                                    className="form-control" 
                                    placeholder="stock del Producto"
                                    onChange={actualizarProducto}
                                />
                            </div>
                            <button
                                disabled={validarForm()}
                                type="submit" 
                                className="btn btn-success float-right">
                                    Crear Producto
                            </button>
                        </form>
                    )
                }}
                </Mutation>
            </div>
        </Fragment>
    );
}

export default NuevoProducto;