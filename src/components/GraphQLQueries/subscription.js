import React from 'react';
import { gql } from 'apollo-boost';
import { Subscription } from '@apollo/react-components';

const LAYER_SUBSCRIPTION = gql`
  subscription {
    layerChanged {
      id
      name
    }
  }
`;

const GetChangedLayer = ({ repoFullName }) => (
  <Subscription subscription={LAYER_SUBSCRIPTION}>
    {/* {({ data, loading }) => {
      if (!loading) {
        console.log('---', data);
        return <h4>New layer: {'qq'}</h4>;
      } else {
        console.log(data);

        return <div>'loading'</div>;
      }
    }} */}
    {({ data, loading }) => {
      console.log('changedLayer --- ', data);
      return <h4>newLayer: {!loading && data.layerChanged.name}</h4>;
    }}
  </Subscription>
);

export default GetChangedLayer;
