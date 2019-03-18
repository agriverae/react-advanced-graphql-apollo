import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true});

mongoose.set('setFindAndModifiy', false);

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo : String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);

const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number
});

const Productos = mongoose.model('producto', productosSchema);

export { Clientes, Productos };