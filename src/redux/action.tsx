import { User } from "../LRClient";

/**
 * The auth state which, when combined with the auth methods, make up the return object of the `useLRAuth` hook.
 */
export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
}
/**
 * The initial auth state.
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};

export type Action =
  | { type: "LOGIN_POPUP_STARTED" }
  | {
      type:
        | "INITIALISED"
        | "GET_ACCESS_TOKEN_COMPLETE"
        | "HANDLE_REDIRECT_COMPLETE"
        | "LOGIN_POPUP_COMPLETE";
      user?: User;
    }
  | { type: "LOGOUT" }
  | { type: "ERROR"; error: Error };
