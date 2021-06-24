import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import LRClient, { TokenInfo } from "../LRClient";
import { LRContext, LRContextOptions } from "../LRContext";
import { initialAuthState } from "../redux/action";
import { reducer } from "../redux/reducer";
export interface LRAuthProps {
  children: React.ReactNode;
  appName: string;
  apiKey: string;
  redirectUri: string;
  onRedirectCallback?: (tokenInfo?: TokenInfo) => void;
}

/**
 * @ignore
 */
const defaultOnRedirectCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const LRAuthProvider = ({
  children,
  onRedirectCallback = defaultOnRedirectCallback,
  ...options
}: PropsWithChildren<LRAuthProps>): JSX.Element => {
  const [client] = useState(() => new LRClient({ ...options }));

  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
          const tokenData = await client.getAccessTokenSilently();
          onRedirectCallback && onRedirectCallback(tokenData);
        }
        const user = await client.getUser();
        dispatch({ type: "INITIALISED", user });
      } catch (error) {
        dispatch({ type: "ERROR", error: error });
      }
    })();
  }, [client, onRedirectCallback]);

  const getAccessTokenSilently = useCallback(async (): Promise<string> => {
    let token;
    try {
      token = await client.getAccessTokenSilently();
      if (!token.isauthenticated) {
        throw new Error("Token Expired");
      }
    } catch (error) {
      throw error;
    }
    return token.token;
  }, [client]);

  const loginWithRedirect = useCallback(
    (returnTo?: string): Promise<void> => client.loginWithRedirect(returnTo),
    [client]
  );
  const logout = useCallback(
    (returnTo?: string): Promise<void> => {
      client.logout(returnTo);
      dispatch({ type: "LOGOUT" });
      return;
    },
    [client]
  );
  const loginWithPopup = useCallback(async (): Promise<void> => {
    dispatch({ type: "LOGIN_POPUP_STARTED" });
    try {
      await client.loginWithPopup();
    } catch (error) {
      dispatch({ type: "ERROR", error: error });
      return;
    }
    const user = await client.getUser();
    dispatch({ type: "LOGIN_POPUP_COMPLETE", user });
  }, [client]);
  return (
    <div className="lr_r_sdk_main">
      <LRContext.Provider
        value={
          {
            ...state,
            loginWithRedirect,
            loginWithPopup,
            logout,
            getAccessTokenSilently,
          } as LRContextOptions
        }
      >
        {children}
      </LRContext.Provider>
    </div>
  );
};

export default LRAuthProvider;
