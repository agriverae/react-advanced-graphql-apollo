import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Importar Componentes

import Header from './Components/Header';
import Clientes from './Components/Clientes';
import EditarCliente from './Components/EditarCliente';
import NuevoCliente from './Components/NuevoCliente';


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
                <Route exact path="/" component={Clientes} />
                <Route exact path="/cliente/nuevo" component={NuevoCliente} />
                <Route exact path="/cliente/editar/:id" component={EditarCliente} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
