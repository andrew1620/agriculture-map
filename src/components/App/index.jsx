import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';

import Map from '../Map';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="map-application">
      <div className="map-application-content map-application-fragment">
        <div className="content-container">
          <Map />
        </div>
      </div>
    </div>
  </ApolloProvider>
);

export default App;
