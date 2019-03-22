import React, {Fragment, useState} from 'react'
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTES_QUERY } from '../../Queries';
import { ELIMINAR_CLIENTE } from '../../Mutations';

import Paginador from '../Paginador'
import Exito from '../Alertas/Exito';

const Contactos = () =>  {

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
    <Query query={CLIENTES_QUERY} pollInterval={1000} variables={{limite: limite, offset: paginador.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "Cargando...";
            if(error) return `Error: ${error.message}`;
            
            return (
                <Fragment>
                    <h2 className="text-center">Listado Clientes</h2>
                    {mensajeAlerta}
                    <ul className="list-group mt-4">
                        {data.getClientes.map(item => {
                            const { id } = item;
                            return (
                            <li key={item.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        {item.nombre} {item.apellido} - {item.empresa}
                                    </div>
                                    <div className="col-md-4 d-flex-justify-content-end">
                                        <Link
                                            className="btn btn-warning d-block d-md-inline-block mr-2" 
                                            to={`/pedidos/nuevo/${id}`}>
                                            &#43; Nuevo Pedido
                                        </Link>
                                        <Link
                                            className="btn btn-primary d-block d-md-inline-block mr-2" 
                                            to={`/pedidos/${id}`}>
                                            Ver Pedido
                                        </Link>
                                        <Mutation 
                                            mutation={ELIMINAR_CLIENTE}
                                            onCompleted={(data) => {
                                                setAlerta({
                                                    mostrar: true,
                                                    mensaje: data.eliminarCliente
                                                })
                                                setTimeout(() => {
                                                    setAlerta({
                                                        mostrar: false,
                                                        mensaje: ''
                                                    })
                                                }, 3000)
                                            }}
                                        >
                                            {eliminarCliente => (
                                                <button 
                                                    type="button" 
                                                    className="btn btn-danger d-block d-md-inline-block mr-2"
                                                    onClick={() => {
                                                        if(window.confirm('seguro que deseas eliminar este Cliente?')) {
                                                            eliminarCliente({
                                                                variables: {id}
                                                            })
                                                        }
                                                    }}
                                                >&times; Eliminar</button>
                                            )}
                                        </Mutation>
                                        <Link to={`/clientes/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar Cliente
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        )})}
                    </ul>
                    <Paginador 
                        actual={paginador.actual}
                        total={data.totalClientes}
                        limite={limite}
                        paginaAnterior={paginaAnterior}
                        paginaSiguiente={paginaSiguiente}
                    />
                </Fragment>
            )
        }}
    </Query>
    )
}

export default Contactos;