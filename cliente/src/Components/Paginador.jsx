import React, {useState} from 'react';

const Paginador = (props) => {

    const [paginador, setPaginador] = useState({
        paginas: Math.ceil(Number(props.totalClientes) / props.limite)
    })

    const {actual} = props
    const btnAnterior = (actual > 1 ) ? 
        <button
            onClick={props.paginaAnterior}
            type="button" 
            className="btn btn-success mr-2"
        >&laquo; Anterior</button> : '';

    const {paginas} = paginador;
    const btnSiguiente = (actual !== paginas ) ? 
    <button
        onClick={props.paginaSiguiente}
        type="button" 
        className="btn btn-success ml-2"
    >Siguiente &raquo;</button> : '';

    return (
        <div className="mt-5 d-flex justify-content-center">
            {btnAnterior}
            {btnSiguiente}
        </div>
    );
}

export default Paginador;