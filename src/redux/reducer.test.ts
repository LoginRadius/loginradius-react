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
});
