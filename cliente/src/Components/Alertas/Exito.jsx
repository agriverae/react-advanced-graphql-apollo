import React from 'react';

const Exito = ({mensaje}) => {
    return (
        <p className="alert alert-success py-3 my-3 text-center">
            {mensaje}
        </p>
    )
}

export default Exito;