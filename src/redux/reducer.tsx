import { Action, AuthState } from "./action";

export const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_POPUP_STARTED":
      return {
        ...state,
        isLoading: true,
      };
    case "HANDLE_REDIRECT_COMPLETE":
    case "GET_ACCESS_TOKEN_COMPLETE":
      if (state?.user.ModifiedDate === action.user?.ModifiedDate) {
        return state;
      }
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
      };
    case "INITIALISED":
    case "LOGIN_POPUP_COMPLETE":
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
        isLoading: false,
        error: undefined,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
};
