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
});
