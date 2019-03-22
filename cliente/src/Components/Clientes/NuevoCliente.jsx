import React, { Fragment, useState } from "react";

import { NUEVO_CLIENTE } from '../../Mutations';
import { Mutation } from 'react-apollo';

const NuevoCliente = (props) => {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    edad: '',
    tipo: ""
  });

  const [emails, setEmails] = useState([]);

  const [error, setError] = useState(false);

  const actualizarCliente = e => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })
  }

  const nuevoCampo = () => {
    setEmails(emails.concat([{email: ''}]));
  }

  const quitarCampo = i => () => {
    setEmails(emails.filter((email, index) => i !== index));
  }

  const leerCampo = i => e => {
    const nuevoEmail = emails.map((email, index) => {
      if (i !== index)
        return email;
      return {
        ...email,
        email: e.target.value
      }
    });
    setEmails(nuevoEmail);
  }

  let respuesta = (error) ? 
  <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';

  return ( 
    <Fragment>
      <h2 className="text-center">Nuevo Cliente</h2>
      {respuesta}
      <div className="row justify-content-center">
        <Mutation 
          mutation={NUEVO_CLIENTE}
          onCompleted={() => {
            props.history.push('/clientes');
          }}
        >
          { crearCliente => (
            <form 
            className="col-md-8 m-3"
            onSubmit={e=> {
              e.preventDefault();

              const { nombre, apellido, empresa, edad, tipo} = cliente;

              if(nombre === '' || apellido === '' || empresa === '' || edad === ''  || tipo === '') {
                setError(true);
                return;
              }

              setError(false);

              const input = {
                ...cliente,
                emails,
                edad: Number(cliente.edad)
              }
              console.log(emails, input);
  
              crearCliente({
                variables: {input}
              })
  
            }}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={actualizarCliente}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  name="apellido"
                  value={cliente.apellido}
                  onChange={actualizarCliente}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Empresa"
                  name="empresa"
                  value={cliente.empresa}
                  onChange={actualizarCliente}
                />
              </div>
              {emails.map((input,index) => (
                <div key={index} className="form-group col-md-12">
                  <label>Correo {index + 1}: </label>
                  <div className="input-group">
                    <input type="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={leerCampo(index)}
                    />
                    <div className="input-group-append">
                      <button 
                        className="btn btn-danger"
                        type="button"
                        onClick={quitarCampo(index)}
                      >&times; Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-group d-flex justify-content-center col-md-12">
                <button 
                  type="button"
                  className="btn btn-warning"
                  onClick={nuevoCampo}
                >Agregar Email</button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Edad</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Edad"
                  name="edad"
                  value={cliente.edad}
                  onChange={actualizarCliente}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Tipo Cliente</label>
                <select 
                  className="form-control"
                  name="tipo"
                  value={cliente.tipo}
                  onChange={actualizarCliente}
                >
                  <option value="">Elegir...</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="BASICO">BÁSICO</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success float-right">
              Guardar Cambios
            </button>
          </form>
          )}
        </Mutation>
      </div>
    </Fragment>
  );
};

export default NuevoCliente;
