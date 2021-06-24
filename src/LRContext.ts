import React from "react";
import { AuthState, initialAuthState } from "./redux/action";

export interface LRContextOptions extends AuthState {
  loginWithRedirect: (returnTo?: string) => Promise<void>;
  loginWithPopup: () => Promise<void>;
  logout: (returnTo?: string) => Promise<void>;
  getAccessTokenSilently: () => Promise<string>;
}

const stub = (): never => {
  throw new Error("You forgot to wrap your component in <Auth0Provider>.");
};

export const LRContext = React.createContext({
  ...initialAuthState,
  loginWithRedirect: stub,
  loginWithPopup: stub,
  logout: stub,
  getAccessTokenSilently: stub,
} as LRContextOptions);
