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
    {({ data, loading }) => {
      console.log('---', data);
      return <h4>New layer: {(!loading && 'qq') || 'test'}</h4>;
    }}
  </Subscription>
);

export default GetChangedLayer;
