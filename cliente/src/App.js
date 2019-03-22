import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Importar Componentes

import Header from './Components/Layout/Header';
import Clientes from './Components/Clientes/Clientes';
import EditarCliente from './Components/Clientes/EditarCliente';
import NuevoCliente from './Components/Clientes/NuevoCliente';

import NuevoProducto from "./Components/Productos/NuevoProducto";
import Productos from "./Components/Productos/Productos";
import EditarProducto from './Components/Productos/EditarProducto'

import NuevoPedido from './Components/Pedidos/NuevoPedido'
import PedidosCliente from './Components/Pedidos/PedidosCliente';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('networkError', networkError);
    console.log('graphQLErrors', graphQLErrors);
  }
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                <Route exact path="/pedidos/:id" component={PedidosCliente} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
