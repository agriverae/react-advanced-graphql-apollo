import React, { Fragment, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../Queries';
import { ELIMINAR_PRODUCTO } from "../../Mutations";
import { Link } from 'react-router-dom';
import Exito from '../Alertas/Exito';
import Paginador from '../Paginador';

const Productos = () => {
    
    const [alerta, setAlerta] = useState({
        mostrar: false,
        mensaje: ''
    })

    const [paginador, usePaginator] = useState({actual: 1, offset: 0})
    const limite = 5;

    const paginaAnterior = () => {
        usePaginator({
            offset: paginador.offset - limite,
            actual: paginador.actual - 1
        })
    }

    const paginaSiguiente = () => {
        usePaginator({
            offset: paginador.offset + limite,
            actual: paginador.actual + 1
        })
    }

    const mensajeAlerta = (alerta.mostrar) ? <Exito mensaje={alerta.mensaje} /> : '';

    return (
        <Fragment>
            <h1 className="text-center mb-5">Productos</h1>
            {mensajeAlerta}
            <Query 
                query={OBTENER_PRODUCTOS}
                pollInterval={1000}
                variables={{limite: limite, offset: paginador.offset}}
            >
            {({loading, error, data, startPolling, stopPolling}) => {
                if(loading) return "Cargando...";
                if(error) return `Error: ${error.message}`;
                
                return (
                    <Fragment>
                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Existencia</th>
                                    <th scope="col">Eliminar</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.obtenerProductos.map(item => {
                                    const {id} = item
                                    return (
                                        <tr key={id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <Mutation 
                                                    mutation={ELIMINAR_PRODUCTO}
                                                    onCompleted={(data) => {
                                                        setAlerta({
                                                            mostrar: true,
                                                            mensaje: data.eliminarProducto
                                                        })
                                                        setTimeout(() => {
                                                            setAlerta({
                                                                mostrar: false,
                                                                mensaje: ''
                                                            })
                                                        }, 3000)
                                                    }}
                                                >
                                                    {eliminarProducto => (
                                                        <button 
                                                            onClick={() => {
                                                                if(window.confirm('Seguro que deseas eliminar este producto?')){
                                                                    eliminarProducto({
                                                                        variables: {id}
                                                                    })
                                                                }
                                                            }} 
                                                            type="button" 
                                                            className="btn btn-danger" 
                                                            >
                                                            &times; Eliminar
                                                        </button>
                                                    )}
                                                </Mutation>
                                            </td>
                                            <td>
                                                <Link 
                                                    to={`/productos/editar/${id}`}
                                                    className="btn btn-success"
                                                >
                                                    Editar Producto
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Paginador 
                            actual={paginador.actual}
                            total={data.totalProductos}
                            limite={limite}
                            paginaAnterior={paginaAnterior}
                            paginaSiguiente={paginaSiguiente}
                        />
                    </Fragment>
                )
            }}

            </Query>
        </Fragment>
    )
}

export default Productos;