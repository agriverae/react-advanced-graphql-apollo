import React, { useState } from 'react';
import { ACTUALIZAR_CLIENTE } from '../../Mutations'; 
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const FormularioEditarCliente = (props) => {

    const [cliente, setCliente] = useState({...props.cliente})
    const [emails, setEmails] = useState(props.cliente.emails)

    const updateCliente = e => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const nuevoCampo = () => {
        setEmails(emails.concat([{email:''}]))
    }

    const leerCampo = i => e => {
        const nuevoMail = emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        setEmails(nuevoMail);
    }

    const quitarCampo = i => () => {
        setEmails(emails.filter((s, index) => i !== index));
    }

    const { nombre, apellido, empresa,edad, tipo } = cliente;

            return (
                <Mutation 
                    mutation={ACTUALIZAR_CLIENTE}
                    onCompleted={() => 
                        props.refetch().then(() => {
                            props.history.push('/clientes');
                        })}
                >
                    {actualizarCliente => (
                        <form 
                            className="col-md-8 m-3"
                            onSubmit={e=>{ 
                                e.preventDefault();

                                const input = {
                                    ...cliente,
                                    edad: Number(cliente.edad),
                                    emails
                                }

                                actualizarCliente({
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
                                    defaultValue={nombre}
                                    name="nombre"
                                    onChange={updateCliente}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    defaultValue={apellido}
                                    name="apellido"
                                    onChange={updateCliente}
                                 />
                            </div>
                        </div>
                      
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    defaultValue={empresa}
                                    name="empresa"
                                    onChange={updateCliente}
                                />
                            </div>

                            {emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Email {index + 1} : </label>
                                    <div className="input-group">
                                    
                                        <input 
                                            type="email"
                                            placeholder={`Email`}
                                            className="form-control" 
                                            onChange={leerCampo(index)}
                                            defaultValue={input.email}
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                className="btn btn-danger" 
                                                type="button" 
                                                onClick={quitarCampo(index)}> 
                                                &times; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button 
                                    onClick={nuevoCampo}
                                    type="button" 
                                    className="btn btn-warning"
                                >+ Agregar Email</button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={edad}
                                    name="edad"
                                    onChange={updateCliente}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select 
                                    className="form-control"
                                    value={tipo}
                                    name="tipo"
                                    onChange={updateCliente}
                                >
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>

                    )}
                </Mutation>
            );
}
 

export default withRouter(FormularioEditarCliente);