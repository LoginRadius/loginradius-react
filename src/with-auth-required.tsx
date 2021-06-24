import React, { ComponentType, FC, useEffect } from "react";
import useLRAuth from "./hooks";

/**
 * @return { JSX.Element}
 */
const defaultOnRedirecting = (): JSX.Element => <></>;

/**
 * @return { string}
 */

export interface WithAuthenticationRequiredOptions {
  returnTo?: string /* Add a path for the `onRedirectCallback` handler to return the user to after login.*/;
  onRedirecting?: () => JSX.Element /* Render a message to show that the user is being redirected to the login. */;
}

const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthenticationRequiredOptions = {}
): FC<P> => {
  return function WithAuthenticationRequired(props: P): JSX.Element {
    const { isAuthenticated, isLoading, loginWithRedirect } = useLRAuth();
    const { returnTo = "", onRedirecting = defaultOnRedirecting } = options;

    useEffect(() => {
      if (isLoading || isAuthenticated) {
        return;
      }

      (async (): Promise<void> => {
        await loginWithRedirect(returnTo);
      })();
    }, [isLoading, isAuthenticated, loginWithRedirect, returnTo]);

    return isAuthenticated ? <Component {...props} /> : onRedirecting();
  };
};

export default withAuthenticationRequired;
