import React, {Fragment, useState} from 'react'
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTES_QUERY } from '../Queries';
import { ELIMINAR_CLIENTE } from '../Mutations';

import Paginador from './Paginador'

const Contactos = () =>  {

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

    return (
    <Query query={CLIENTES_QUERY} pollInterval={1000} variables={{limite: limite, offset: paginador.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "Cargando...";
            if(error) return `Error: ${error.message}`;
            
            return (
                <Fragment>
                    <h2 className="text-center">Listado Clientes</h2>
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
                                        <Mutation mutation={ELIMINAR_CLIENTE}>
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
                                        <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar Cliente
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        )})}
                    </ul>
                    <Paginador 
                        actual={paginador.actual}
                        totalClientes={data.totalClientes}
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