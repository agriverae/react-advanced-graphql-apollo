import React, { Fragment } from 'react';
import DatosCliente from '../Pedidos/DatosCliente';
import { OBTENER_PRODUCTOS } from '../../Queries';
import { Query } from 'react-apollo';

import ContenidoPedido from './ContenidoPedido';

import '../../spiner.css';

const NuevoPedido = (props) => {

    const {id} = props.match.params

    return (
        <Fragment>
            <h1 className="text-center mb-5">Nuevo Pedido</h1>
            <div className="row">
                <div className="col-md-3">
                    <DatosCliente 
                        id={id}
                    />
                </div>
                <div className="col-md-9">
                    <Query
                        query={OBTENER_PRODUCTOS}
                        variables={{stock: true}}
                    >
                        {({loading, error, data}) => {
                            if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            );
                            if(error) return `Error ${error.message}`;

                            return (
                                <ContenidoPedido 
                                    productos={data.obtenerProductos}
                                    id={id}
                                />
                            )
                        }}
                    </Query>
                </div>
            </div>
        </Fragment>
    );
}

export default NuevoPedido;