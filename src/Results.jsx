// @flow
import React from 'react';
import styled from 'styled-components';

import { LOADING_RESULTS } from './App';
import styles from './styles';
import LoadingSpinner from './LoadingSpinner';

const { mobileDeviceWidth, primaryColor, hoverColor } = styles;

const { centerFlex } = styles;

type props = { results: Object, onClick: (string) => void };

const ResultsContainer = ({ results, onClick }: props) => (
  <div name="results" style={ centerFlex }>
    {
      results === LOADING_RESULTS
        ?
        <LoadingSpinner>Hey</LoadingSpinner>
        :  results
          ? <div id="searchResults" style={{ width: '100%' }}>
              <ResultList results={ results } onClick={ onClick } />
            </div>
          : null
    }
  </div>
);

export const ResultList = ({ results, onClick }: props) => (
  <div style={ centerFlex }>
    {
      results.length === 0
        ? <NoResults>Sorry, the search for brands returned no results. Please try a different search.</NoResults>
        : Object.keys(results).map(key => {
        const brandName = results[key];
        return(
          <Button
            onClick={ () => onClick(brandName) }
            key={ brandName } >
              { brandName }
          </Button>
        )
      })
    }
  </div>
);

const NoResults = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 50px;
  text-align: center;
  @media (min-device-width: ${mobileDeviceWidth}){
    font-size: initial;
    text-align: initial;
  }
`

const Button = styled.div`
  background-color: ${ primaryColor };
  margin: 10px;
  height: 125px;
  width: 100%;
  font-size: 50px;
  color: #FFFFFF;
  font-family: Roboto, sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover{
    background-color: ${hoverColor};
    cursor: pointer;
  }
  
  @media (min-device-width: ${mobileDeviceWidth}){
    height: 250px;
    width: 250px;
    font-size: 25px;
    line-height: initial;
  }
`

export default ResultsContainer;
