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
      orderInfo {
        id
        name
        batteryCharge
        lastActivity
        orderData {
          id
          orderNumber
          tableNumber
          orderDescription
        }
      }
    }
  }
`;

const GetChangedLayer = ({ orderInfo, setOrderInfo, repoFullName }) => (
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
        console.log(orderInfo === data.layerChanged.orderInfo);
        if (Object.keys(orderInfo).length === 0) {
          setOrderInfo({
            ...data.layerChanged.orderInfo,
            orderData: { ...data.layerChanged.orderInfo.orderData }
          });
        }
        return data.layerChanged.objects.types.map(object => (
          <Rectangle key={object.id} bounds={object.format.rectangle} color="red" />
        ));
      } else {
        return <h4></h4>;
      }
    }}
  </Subscription>
);

export default GetChangedLayer;

function compareObjects(obj1, obj2) {
  for (let key in obj1) {
    for (let key2 in obj2) {
      if (obj1[key] !== obj2[key2]) return;
    }
  }
}
