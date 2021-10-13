import { reducer } from "./reducer";

import { AuthState } from "./action";

describe("test reducer", () => {
  const mockUser = {
    CreatedDate: "mock-created-date",
    Email: [
      {
        Type: "mock-email-type",
        Value: "mock-email-value",
      },
    ],
    EmailVerified: true,
    ID: "mock-id",
    IsActive: true,
    IsDeleted: true,
    LastLoginDate: "mock-login-date",
    LastLoginLocation: "mock-last-login-action",
    ModifiedDate: "mock-modified-date",
    PasswordExpirationDate: "mock-password-expiration",
    Provider: "mock-provider",
    RegistrationProvider: "-mock-registration-provider",
    RegistrationSource: "mock-registration-source",
    SignupDate: "mock-signup-date",
    Uid: "mock-uid",
    Description: "mock-error-description",
    ErrorCode: 403,
    Message: "mock-error-message",
  };
  test("should return isLoading true on LOGIN_POPUP_STARTED action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
    };
    const state = reducer(mockState, { type: "LOGIN_POPUP_STARTED" });
    expect(state).toEqual({ isAuthenticated: true, isLoading: true });
  });

  test("should return same state if user modified date is same on GET_ACCESS_TOKEN_COMPLETE action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
    };
    const state = reducer(mockState, {
      type: "GET_ACCESS_TOKEN_COMPLETE",
      user: {
        ...mockUser,
        ModifiedDate: "mock-modified-date",
      },
    });
    expect(state).toEqual(mockState);
  });

  test("should return state with new user if user modified date is different on GET_ACCESS_TOKEN_COMPLETE action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
    };

    const mockActionUser = {
      ...mockUser,
      ModifiedDate: "different-modified-date",
      id: "mock-different-id",
    };
    const state = reducer(mockState, {
      type: "GET_ACCESS_TOKEN_COMPLETE",
      user: mockActionUser,
    });
    expect(state).toEqual({ ...mockState, user: mockActionUser });
  });

  test("should complete login on LOGIN_POPUP_COMPLETE action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
    };

    const mockActionUser = {
      ...mockUser,
      ModifiedDate: "different-modified-date",
      id: "mock-different-id",
    };
    const state = reducer(mockState, {
      type: "LOGIN_POPUP_COMPLETE",
      user: mockActionUser,
    });
    expect(state).toEqual({
      ...mockState,
      isLoading: false,
      error: undefined,
      user: mockActionUser,
    });
  });

  test("should un-authenticate user on logout on LOGOUT action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
    };

    const state = reducer(mockState, {
      type: "LOGOUT",
    });
    expect(state).toEqual({
      ...mockState,
      isAuthenticated: false,
      user: undefined,
    });
  });

  test("should set action error on ERROR action", () => {
    const mockState: AuthState = {
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
    };

    const mockActionError = {
      name: "mock-name",
      message: "mock-message",
      stack: "mock-stack",
    };

    const state = reducer(mockState, {
      type: "ERROR",
      error: mockActionError,
    });
    expect(state).toEqual({
      ...mockState,
      isLoading: false,
      error: mockActionError,
    });
  });
});
