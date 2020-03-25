import { gql } from 'apollo-boost';

export const layerQuery = gql`
  {
    layers {
      id
      objects {
        endpoint
        types {
          id
          format
        }
      }
    }
  }
`;
