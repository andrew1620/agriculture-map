import { gql } from 'apollo-boost';

export const layerQuery = gql`
  {
    layers {
      id
      objects {
        endpont
        types {
          id
          format
        }
      }
    }
  }
`;
