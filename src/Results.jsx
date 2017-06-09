import React from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';
import { LOADING_RESULTS } from './App';

const ResultsContainer = ({ results }) => (
  results === LOADING_RESULTS
    ? <CircularProgress />
    : <div id="searchResults">
        {
          Object.keys(results).map(key =>
            <Result key={ results[key] } brandName={ results[key] } />
          )
        }
      </div>
);

const Result = ({ brandName }) => (
  <RaisedButton style={{ margin: 10 }}>
    <div style={{ padding: 10 }}>
      { brandName }
    </div>
  </RaisedButton>
);

export default ResultsContainer;
