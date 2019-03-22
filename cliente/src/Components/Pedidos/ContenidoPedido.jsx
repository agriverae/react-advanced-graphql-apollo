import React, { Fragment, useState, useEffect } from 'react'
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import GenerarPedido from './GenerarPedido';
import Resumen from './Resumen';
import Error from '../Alertas/Error'

const ContenidoPedido = (props) => {

    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    const seleccionarProducto = (productosSelected) => {
        setProductos(productosSelected)
    }

    useEffect(
        () => {
            actualizarTotal();
    }, [productos.map(producto => producto.cantidad)]);

    const actualizarTotal = () => {

        const tempProductos = productos;
        let nuevoTotal = 0;

        if(tempProductos.length === 0){
            setTotal(nuevoTotal);
            return;
        }

        tempProductos.forEach(producto => {
            nuevoTotal += ((0 | producto.cantidad) * producto.precio);
        });
        setTotal(nuevoTotal);
    }

    const actualizarCantidad = (cantidad, index) => {
        
        const tempProductos = productos;
                
        tempProductos[index].cantidad = Number(cantidad);

        setProductos(tempProductos);
        
    }

    const eliminarProducto = (id) => {
        const productosRestantes = productos.filter(producto => producto.id !== id);
        setProductos(productosRestantes);
    }

    const mensaje = ( total < 0 ) ? <Error error="Las cantidad no pueden ser negativas" /> : '';

    return (
        <Fragment>
            <h2 className="text-center mb-5">Seleccionar Articulos</h2>
            {mensaje}
            <Select
                onChange={seleccionarProducto}
                options={props.productos}
                isMulti={true}
                components={Animated()}
                placeholder={'Seleccionar Productos'}
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => options.nombre}
                value={productos}
            />
            <Resumen 
                productos={productos}
                actualizarCantidad={actualizarCantidad}
                eliminarProducto={eliminarProducto}
            />
            <p className="font-weight-bold float-right mt-3">
                Total: 
                <span className="font-weight-normal">
                    $ {total}
                </span>
            </p>
            <GenerarPedido 
                productos={productos}
                total={total}
                idCliente={props.id}
            />
        </Fragment>
    )
}

export default ContenidoPedido
