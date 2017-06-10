import React from 'react';
import { CircularProgress, RaisedButton } from 'material-ui';

import { LOADING_RESULTS } from './App';
import ResponsiveContainer from './ResponsiveContainer';
import styles from './styles';

const { centerFlex } = styles;

// const ResultsContainer = ({ results, onClick }) => (
//   <div name="results" style={ centerFlex }>
//     {
//       results === LOADING_RESULTS
//         ? <CircularProgress />
//         : <div id="searchResults">
//         <MediaQuery minDeviceWidth={ mobileWidth }>
//           <ResultList results={ results } onClick={ onClick } style={ desktopStyle }/>
//         </MediaQuery>
//         <MediaQuery maxDeviceWidth={ mobileWidth }>
//           <ResultList results={ results } onClick={ onClick } style={ mobileStyle }/>
//         </MediaQuery>
//       </div>
//     }
//   </div>
// );

const ResultsContainer = ({ results, onClick }) => (
  <div name="results" style={ centerFlex }>
    {
      results === LOADING_RESULTS
        ? <CircularProgress />
        : <div id="searchResults">
        {
          ResponsiveContainer({
            mobileComponent: <ResultList results={ results } onClick={ onClick } style={ mobileStyle }/>,
            desktopComponent: <ResultList results={ results } onClick={ onClick } style={ desktopStyle }/>
          })
        }
      </div>
    }
  </div>
);

export const ResultList = ({ results, onClick, style }) => (
  <div style={ centerFlex }>
    {
      Object.keys(results).map(key => {
        const brandName = results[key];
        return(
          <RaisedButton
            name={ brandName } onClick={ () => onClick(brandName) }
            backgroundColor={ style.backgroundColor } style={ style.button }
            key={ brandName } >
              <div style={ style.brandName }>
                { brandName }
              </div>
          </RaisedButton>
        )
      })
    }
  </div>
);

const backgroundColor = '#FA9100';
const fontColor = '#FFFFFF';
const mobileStyle = {
  backgroundColor,
  button: {
    margin: 10,
    height: 125,
    width: '100%',
  },
  brandName: {
    fontSize: 50,
    color: fontColor,
  }
};

const desktopStyle = {
  backgroundColor,
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
