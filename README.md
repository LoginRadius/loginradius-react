# loginradius-react

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/loginradius-react.svg?style=flat)](https://www.npmjs.com/package/loginradius-react)

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Support + Feedback](#support--feedback)
- [What is LoginRadius](#what-is-loginradius)
- [License](#license)

## Installation

Using [npm](https://npmjs.org/)

```bash
npm install loginradius-react
```

## Getting Started

Configure the SDK by wrapping your application in `LRAuthProvider`:

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LRAuthProvider } from "loginradius-react";

ReactDOM.render(
  <React.StrictMode>
    <LRAuthProvider
      appName="YOUR_LOGINRADIUS_APPNAME"
      apiKey="YOUR_LOGINRADIUS_APIKEY"
      redirectUri={window.location.origin}
    >
      <App />
    </LRAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Use the `useLRAuth` hook in your components to access authentication state (`isLoading`, `isAuthenticated` and `user`) and authentication methods (`loginWithRedirect` and `logout`):

```jsx
// src/App.js
import React from "react";
import { useLRAuth } from "loginradius-react";

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useLRAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{" "}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}

export default App;
```

### Protect a Route

Protect a route component using the `withAuthenticationRequired` higher order component. Visits to this route when unauthenticated will redirect the user to the login page and back to this page after login:

```jsx
import React from "react";
import { withAuthenticationRequired } from "loginradius-react";

const PrivateRoute = () => <div>Private</div>;

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
```

### Call an API

Call a protected API with an Access Token:

```jsx
import React, { useEffect, useState } from "react";
import { useLRAuth } from "loginradius-react";

const CallAPI = () => {
  const { getAccessTokenSilently } = useLRAuth();
  const [resp setResp] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `https://api.loginradius.com/identity/v2/auth/access_token/validate?access_token=${token}&apiKey=${process.env.REACT_APP_API_KEY}`,
          {}
        );
        setResp(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!resp) {
    return <div>Loading...</div>;
  }

  return (
    <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
  );
};

export default CallAPI;
```

### Using loginWithPopup

To implement `loginWithPopup` functionality in your app you need to perform following steps:

1. Open your LoginRadius Dashboard and navigate to `Auth Page (IDX) -> Themes -> Customize -> Switch to Advance Editor`.
2. In the right side you will find the tab called `Custom JS`, expand and select `Add New`.
3. A popup will open where you need to enter this url in the `Url` tab - https://hosted-pages.lrinternal.com/Themes/sdk/default-auth-react-sdk.js and click **Confirm**
4. This URL contains the script which will help to close the popup after the authentication is done.
5. Finally Click on **Save** and then add `loginWithPopup` method in your application.

## Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [This repo's contribution guide](https://github.com/loginradius/loginradius-react/blob/main/CONTRIBUTING.md)

## Support + Feedback

For support or to provide feedback, please [raise an issue on our issue tracker](https://github.com/loginradius/loginradius-react/issues).

## What is LoginRadius

- LoginRadius was established with the vision of securing the identity of every person on the internet. Over a few short years, we have grown exponentially from a simple social login provider to a multi-faceted, industry-leading customer identity and access management (CIAM) platform.
- The LoginRadius Identity Platform helps companies securely manage customer identities and data to deliver a unified customer experience. We offer suites of modules to serve businesses from startups to Fortune 500 enterprises with hundreds of millions of users.

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/loginradius/loginradius-react/blob/main/LICENSE) file for more info.
