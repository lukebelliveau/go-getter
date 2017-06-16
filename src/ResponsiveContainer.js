// @flow
import React from 'react';
import MediaQuery from 'react-responsive';

const mobileWidth = 480;

export default ({ mobileComponent, desktopComponent }: { mobileComponent: React$Element<*>, desktopComponent: React$Element<*> }) => (
  <div>
    <MediaQuery maxDeviceWidth={ mobileWidth }>
      {
        mobileComponent
      }
    </MediaQuery>
    <MediaQuery minDeviceWidth={ mobileWidth }>
      {
        desktopComponent
      }
    </MediaQuery>
  </div>
);