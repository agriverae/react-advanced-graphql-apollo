import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { OBTENER_PRODUCTO } from '../../Queries';

import FormularioEditarProducto from "./FormularioEditarProducto";

const EditarProducto = (props) => {
    const { id } = props.match.params;

    return (
        <Fragment>
            <h1 className="text-center">Editar Producto</h1>
            <div className="row justify-content-center">
                <Query 
                    query={OBTENER_PRODUCTO}
                    variables={{id}}
                >
                    {({loading, error, data, refetch}) => {
                        if (loading) return "Cargando...";
                        if (error) return `Error ${error.message}`;

                        return (
                            <FormularioEditarProducto 
                                producto={data}
                                id={id}
                                refetch={refetch}
                            />
                        )
                    }}

                </Query>
            </div>
        </Fragment>  
    )
}

export default EditarProducto;