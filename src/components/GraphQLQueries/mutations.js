import { gql } from 'apollo-boost';
import { Mutation } from '@apollo/react-components';
import React from 'react';
import { useMutation } from 'react-apollo';

export const CHANGE_LAYER = gql`
  mutation ChangeLayer($layer: JSON) {
    changeLayer(layer: $layer) {
      id
      name
    }
  }
`;

export const changeLayer2 = (createdLayer, changeLayer) => {
  if (createdLayer) {
    const insideBounds = createdLayer._bounds;
    const bounds = [
      [insideBounds._northEast.lat, insideBounds._northEast.lng],
      [insideBounds._southWest.lat, insideBounds._southWest.lng]
    ];
    const newLayer = {
      id: 'newId',
      name: 'nextName',
      objects: {
        endpoint: 'real_data:detect_info_2-line',
        types: [{ id: '1', format: { rectangle: bounds } }]
      }
    };
    changeLayer({ variables: { layer: newLayer } });
  }
};

const ChangeLayer = ({ createdLayer }) => {
  console.log('from mutation---', createdLayer);

  let bounds = [];
  if (createdLayer) {
    const insideBounds = createdLayer._bounds;
    bounds = [
      [insideBounds._northEast.lat, insideBounds._northEast.lng],
      [insideBounds._southWest.lat.lat, insideBounds._southWest.lat.lng]
    ];
  }
  const newLayer = {
    id: 'newId',
    name: 'nextName',
    objects: {
      endpoint: 'real_data:detect_info_2-line',
      types: [{ id: '1', format: { rectangle: bounds } }]
    }
  };
  const [changeLayer, { data }] = useMutation(CHANGE_LAYER);

  return (
    <>
      <Mutation mutation={CHANGE_LAYER}>
        {(changeLayer, { data }) => {
          // В объекте data находятся данные, возвращаемые функцией, которую мы вызываем в резолверах -->mutaton --> наша ф-ия. Имя объекта с данными внутри data будет таким, каким его обозначили в схеме для мутации на первой строчке (на клиенте)
          return (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  changeLayer({ variables: { layer: newLayer } });
                }}
              >
                <button style={{ border: '1px solid red' }} type="submit">
                  Change Layer
                </button>
              </form>
              {data && data.name}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

export default ChangeLayer;
