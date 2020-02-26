import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
const coordsQuery = gql`
  query coordsQuery {
    coords {
      leftTopPoint
      rightBottomPoint
    }
  }
`;
export default coordsQuery;

export const layerQuery = gql`
  {
    data {
      id
      childLayers
      services {
        service
        options {
          delay
          draw {
            polyline {
              shapeOptions {
                color
              }
              showLength
            }
            polygon {
              shapeOptions {
                color
              }
            }
            rectangle
            circle
            marker
            circlemarker
          }
        }
      }
      objects {
        endpoint
        types {
          id
          format {
            color
            dashArray
            dashOffset
            opacity
          }
        }
      }
    }
  }
`;
