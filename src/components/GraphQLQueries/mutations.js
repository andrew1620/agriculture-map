import { gql } from 'apollo-boost';
import { Mutation } from '@apollo/react-components';
import React from 'react';

export const CHANGE_LAYER = gql`
  mutation ChangeLayer($layer: JSON) {
    changeLayer(layer: $layer) {
      id
      name
    }
  }
`;

const ChangeLayer = () => {
  return (
    <>
      <Mutation mutation={CHANGE_LAYER}>
        {(changeLayer, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                alert('hi');
                changeLayer({ variables: { layer: newLayer } });
              }}
            >
              <button style={{ border: '1px solid red' }} type="submit">
                Change Layer
              </button>
            </form>
          </div>
        )}
      </Mutation>
    </>
  );
};

export default ChangeLayer;

const newLayer = {
  id: 'newId',
  name: 'newName',
  services: [
    {
      service: 'editable',
      options: {
        draw: {
          polyline: { shapeOptions: { color: 'blue' }, showLength: true },
          polygon: { shapeOptions: { color: 'blue' } },
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: { edit: false }
      }
    }
  ],
  objects: {
    endpoint: 'real_data:detect_info_2-line',
    types: [{ id: '1', format: { rectangle: [[50000, 500000], [50050, 50000]] } }]
  }
};
