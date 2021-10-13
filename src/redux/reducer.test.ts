import { reducer } from "./reducer";

import { AuthState } from "./action";

describe("test reducer", () => {
  test("should return isLoading true on LOGIN_POPUP_STARTED action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
    };
    const state = reducer(mockState, { type: "LOGIN_POPUP_STARTED" });
    expect(state).toEqual({ isAuthenticated: true, isLoading: true });
  });
});
