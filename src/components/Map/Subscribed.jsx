import React from 'react';

const LAYER_SUBSCRIPTION = gqlql`
    subscription layerAdded($repoFullName: String!) {
      layerEdded(repoFullName: $repoFullName) {
        id
        content
      }
    }
  `;
const DontReadTheComments = ({ repoFullName }) => (
  <Subscription subscription={COMMENTS_SUBSCRIPTION} variables={{ repoFullName }}>
    {({ data: { commentAdded }, loading }) => (
      <h4>New comment: {!loading && commentAdded.content}</h4>
    )}
  </Subscription>
);
