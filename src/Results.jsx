import React from 'react';
import { CircularProgress, RaisedButton, Text } from 'material-ui';
import styled from 'styled-components';

import { LOADING_RESULTS } from './App';
import ResponsiveContainer from './ResponsiveContainer';
import styles from './styles';

const { mobileDeviceWidth, primaryColor, hoverColor } = styles;

const { centerFlex } = styles;

const ResultsContainer = ({ results, onClick }) => (
  <div name="results" style={ centerFlex }>
    {
      results === LOADING_RESULTS
        ? <CircularProgress />
        :  results
          ? <div id="searchResults" style={{ width: '100%' }}>
            {ResponsiveContainer({
              mobileComponent: <ResultList results={ results } onClick={ onClick } />,
              desktopComponent: <ResultList results={ results } onClick={ onClick } style={ desktopStyle }/>
            })}
          </div>
          : null
    }
  </div>
);

// export const ResultList = ({ results, onClick, style }) => (
//   <div style={ centerFlex }>
//     {
//       results.length === 0
//         ? <div style={ style.noResults }>Sorry, the search for brands returned no results. Please try a different search.</div>
//         : Object.keys(results).map(key => {
//             const brandName = results[key];
//             return(
//               <RaisedButton
//                 name={ brandName } onClick={ () => onClick(brandName) }
//                 backgroundColor={ style.backgroundColor } style={ style.button }
//                 key={ brandName } >
//                   <div style={ style.brandName }>
//                     { brandName }
//                   </div>
//               </RaisedButton>
//             )
//           })
//     }
//   </div>
// );

export const ResultList = ({ results, onClick, style }) => (
  <div style={ centerFlex }>
    {
      results.length === 0
        ? <div style={ style.noResults }>Sorry, the search for brands returned no results. Please try a different search.</div>
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

// const Button = styled.div`
//   background-color: ${ primaryColor };
//   margin: 10px;
//   height: 125px;
//   line-height: 125px;
//   width: 100%;
//   font-size: 50px;
//   color: #FFFFFF;
//   font-family: Roboto, sans-serif;
//   text-align: center;
// `

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

const backgroundColor = '#FA9100';
const fontColor = '#FFFFFF';

const desktopStyle = {
  backgroundColor,
  noResults: {
    fontFamily: 'Roboto, sans-serif'
  },
  button: {
    margin: 10,
    height: 250,
    width: 250,
  },
  brandName: {
    color: fontColor,
  }
};

export default ResultsContainer;
