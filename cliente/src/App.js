import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({networkError, graphQLErrors}) => {
    console.log('networkError', networkError);
    console.log('graphQLErrors', graphQLErrors);
  }
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h1>Hola</h1>
      </ApolloProvider>
    );
  }
}

export default App;
