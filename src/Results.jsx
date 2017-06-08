import React from 'react';
import { CircularProgress } from 'material-ui';
import { LOADING_RESULTS } from './App';

const ResultsContainer = ({ results }) => {
  return results === LOADING_RESULTS ?
    <CircularProgress /> :
    <div id="searchResults">
      {
        Object.keys(results).map(key =>
          <Result key={ results[key] } brandName={ results[key] }/>
        )
      }
    </div>
};

const Result = ({ brandName }) => (
  <div>
    { brandName }
  </div>
);

export default ResultsContainer;