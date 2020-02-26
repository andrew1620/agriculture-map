import { graphql } from 'react-apollo';

import { compose } from 'recompose';

import coordsQuery from './quaries';
import { layerQuery } from './quaries';

export default compose(graphql(layerQuery));
