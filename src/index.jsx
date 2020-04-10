import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';

import registerServiceWorker from './registerServiceWorker';
import buildStore from './store';

import App from './components/App';

const store = buildStore();

const httpLink = new HttpLink({
  uri: 'http://localhost:3006/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3006/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('interactiveMapRoot')
);

registerServiceWorker();
