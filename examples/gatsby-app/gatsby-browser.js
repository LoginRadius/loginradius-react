import React from 'react';
import { navigate } from 'gatsby';
import 'bootstrap/dist/css/bootstrap.css';
import './src/components/App.css';

import { LRAuthProvider } from 'loginradius-react';

const onRedirectCallback = () => navigate('/');

export const wrapRootElement = ({ element }) => {
  return (
    <LRAuthProvider
      appName={process.env.GATSBY_LR_APP_NAME || ''}
      apiKey={process.env.GATSBY_API_KEY || ''}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </LRAuthProvider>
  );
};
