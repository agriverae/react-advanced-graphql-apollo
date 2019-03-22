import React, { Fragment } from 'react'
import { Query } from 'react-apollo';
import { OBTENER_PEDIDOS } from '../../Queries';
import Pedido from './Pedido';
import '../../spiner.css';

const PedidosCliente = (props) => {
    const cliente = props.match.params.id;
    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos del cliente</h1>
            <div className="row">
                <Query 
                    query={OBTENER_PEDIDOS}
                    variables={{cliente}}
                    pollInterval={500}
                >
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return (
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
                        );
                        if(error) return `Error ${error.message}`;

                        return (
                            data.obtenerPedidos.map(pedido => (
                                <Pedido 
                                    key={pedido.id}
                                    pedido={pedido}
                                    cliente={cliente}
                                />
                            ))
                        )
                    }}
                </Query>
            </div>
        </Fragment>
    )
}

export default PedidosCliente
