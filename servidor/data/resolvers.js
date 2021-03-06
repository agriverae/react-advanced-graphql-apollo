import monggose from 'mongoose';
import { Clientes, Productos, Pedidos } from  "./db"
import { rejects } from 'assert';

export const resolvers = {
    Query: {
        getClientes : (root, {limite, offset}) => {
            return Clientes.find({}).limit(limite).skip(offset);
        },
        getCliente : (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if(error) rejects(error);
                    else resolve(cliente);
                })
            });
        },
        totalClientes : (root) => {
            return new Promise((resolve, object) => {
                Clientes.countDocuments({}, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count);
                })
            })
        },
        obtenerProductos : (root, {limite, offset, stock}) => {
            let filtro;
            if(stock) {
                filtro = { stock: { $gt: 0}}
            }
            return Productos.find(filtro).limit(limite).skip(offset);
        },
        obtenerProducto : (root, {id}) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    if(error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        totalProductos : (root) => {
            return new Promise((resolve, object) => {
                Productos.countDocuments({}, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count);
                })
            })
        },
        obtenerPedidos : (root, {cliente}) => {
            return new Promise((resolve, object) => {
                Pedidos.find({cliente: cliente}, (error, pedido) => {
                    if(error) rejects(error);
                    else resolve(pedido);
                })
            })
        }
    },
    Mutation: {
        crearCliente : (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos
            });
            
            nuevoCliente.id = nuevoCliente._id;

            return new Promise((resolve, object) => {
                nuevoCliente.save(error => {
                    if(error) rejects(error);
                    else resolve(nuevoCliente);
                })
            });
        },
        actualizarCliente: (root, {input}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate( { _id: input.id }, input, {new: true}, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente);
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndDelete({_id: id}, (error) => {
                    if(error) rejects(error);
                    else resolve("Se elimino correctamente");
                })
            })
        },
        nuevoProducto : (root, {input}) => {
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            });

            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if(error) rejects(error);
                    else resolve(nuevoProducto);
                });
            });
        },
        actualizarProducto: (root, {input}) => {
            return new Promise((resolve, producto) => {
                Productos.findOneAndUpdate({_id : input.id}, input, {new: true}, (error, producto) => {
                    if(error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        eliminarProducto: (root, {id}) => {
            return new Promise((resolve, producto) => {
                Productos.findOneAndDelete({_id: id}, (error) => {
                    if(error) rejects(error);
                    else resolve('Se elimino correctamente');
                })
            })
        },
        nuevoPedido: (root, {input}) => {
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            });

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {
                nuevoPedido.save((error) => {
                    if(error) rejects(error);
                    else resolve(nuevoPedido);
                })
            });
        },
        actualizarEstado : (root, {input}) => {
            return new Promise((resolve, object) => {

                const {estado} = input;

                let instruccion;
                if(estado === 'COMPLETADO')
                    instruccion = "-"
                else if(estado === 'CANCELADO') {
                    instruccion = "+"
                }

                input.pedido.forEach(pedido => {
                    Productos.updateOne({_id: pedido.id},
                        {
                            "$inc": 
                                { stock: `${instruccion}${pedido.cantidad}`}
                        }, function (error) {
                            if(error) return new Error(error);
                        }
                    )
                })

                Pedidos.findOneAndUpdate({_id: input.id}, input, {new: true}, (error) => {
                    if(error) rejects(error);
                    else resolve('Se actualizo correctamente');
                })
            })
        }
    }
}

export default resolvers;