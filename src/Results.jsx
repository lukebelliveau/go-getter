// @flow
import React from 'react';

import { LOADING_RESULTS } from './App';
import LoadingSpinner from './LoadingSpinner';
import styles from './styles/Results.style';

const { Selection, CenteredText } = styles;

const { CenterContainer } = styles;

type props = { results: Object, onClick: (string) => void };

const ResultsContainer = ({ results, onClick }: props) => (
  <CenterContainer>
    {
      results === LOADING_RESULTS
        ? <LoadingSpinner />
        : <ResultList results={ results } onClick={ onClick } />
    }
  </CenterContainer>
);

export const ResultList = ({ results, onClick }: props) => (
  <CenterContainer>
    {
      results.length === 0
        ? <CenteredText>Sorry, the search for brands returned no results. Please try a different search.</CenteredText>
        : Object.keys(results).map(key => {
            const brandName = results[key];
            return (
              <Selection onClick={ () => onClick(brandName) } key={ brandName }>
                  { brandName }
              </Selection>
            )
        })
    }
  </CenterContainer>
);

export default ResultsContainer;
