import React from 'react';
import { gql } from 'apollo-boost';
import { Subscription } from '@apollo/react-components';
import { Rectangle } from 'react-leaflet';

const LAYER_SUBSCRIPTION = gql`
  subscription {
    layerChanged {
      id
      name
      objects {
        types {
          id
          format
        }
      }
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
      if (!loading) {
        return data.layerChanged.objects.types.map(object => (
          <Rectangle bounds={object.format.rectangle} color="red" />
        ));
      } else {
        return <h4>Loading</h4>;
      }
    }}
  </Subscription>
);

export default GetChangedLayer;
