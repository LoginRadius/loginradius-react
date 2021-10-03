import { openPopup, runPopup } from "./utils";

export interface LRError {
  Description: string;
  ErrorCode: number;
  Message: string;
}
export interface LRConfigOptions {
  appName: string;
  apiKey: string;
  redirectUri: string;
}

export interface PopupConfigOptions {
  popup?: any;
  timeoutInSeconds?: number;
}

export interface User extends LRError {
  CreatedDate: string;
  Email: {
    Type: string;
    Value: string;
  }[];
  EmailVerified: boolean;
  FirstName?: string;
  FullName?: string;
  ID: string;
  IsActive: boolean;
  IsDeleted: boolean;
  LastLoginDate: string;
  LastLoginLocation: string;
  LocalCountry?: string;
  ModifiedDate: string;
  PasswordExpirationDate: string;
  Provider: string;
  ProfileImageUrls?: string[];
  RegistrationProvider: string;
  RegistrationSource: string;
  SignupDate: string;
  Uid: string;
}

export interface TokenInfo {
  returnTo?: string;
  token?: string;
  isauthenticated?: boolean;
}

/**
 * This Class returns the client of LoginRadius React SDK
 */
export default class LRClient {
  /**
   *
   * @param {LRConfigOptions} options - LoginRadius SDK Options passed by the client
   */
  constructor(private options: LRConfigOptions) {}

  /**
   * @return { Promise<TokenInfo>} Returns weather the use is logged in or not.
   */
  public async getAccessTokenSilently(): Promise<TokenInfo> {
    return await fetch(
      `https://${this.options.appName}.hub.loginradius.com/ssologin/login`,
      {
        method: "get",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => data);
  }

  /**
   *
   * @param {string} returnTo - Specify the path where you want user to be redirect after login
   * @return {string}
   */
  public buildLoginUrl(returnTo: string = "/") {
    const { appName, redirectUri } = this.options;
    return `https://${appName}.hub.loginradius.com/auth.aspx?action=login&return_url=${redirectUri}${returnTo}`;
  }

  /**
   * This Function will be used to Login the using Redirect Method
   * @param {string} returnTo - Specify the path where you want user to be redirect after login
   */
  public async loginWithRedirect(returnTo: string) {
    const url = this.buildLoginUrl(returnTo);
    window.location.assign(url);
  }

  /**
   * This function is used to loginwith popup.
   */
  public async loginWithPopup() {
    const config: PopupConfigOptions = {};

    if (!config.popup) {
      config.popup = openPopup("");
    }

    let url = this.buildLoginUrl();

    url += "&loginType=popup";

    config.popup.location.href = url;

    const data = await runPopup(config);

    if (!data.isauthenticated) {
      throw new Error("Authorization Failed");
    }
  }

  /**
   *
   * @return { Promise<User> } Return the Logged in user details or throw the error of session is expired
   */
  public async getUser(): Promise<User> {
    const tokenData = await this.getAccessTokenSilently();
    if (!tokenData.isauthenticated) {
      return;
    }
    try {
      return await fetch(
        `https://api.loginradius.com/identity/v2/auth/account?apikey=${this.options.apiKey}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      )
        .then((response) => response.json())
        .then(
          (data: User) => {
            if (data.ErrorCode) {
              return;
            } else {
              return data;
            }
          },
          (err) => {
            throw err;
          }
        );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Build the Logout URL
   * @param { string } returnTo - The URL where your application should navigate after logout
   * @return {string} A URL String
   */
  public buildLogoutUrl(returnTo: string = "/"): string {
    const { appName, redirectUri } = this.options;
    return `https://${appName}.hub.loginradius.com/auth.aspx?action=logout&return_url=${redirectUri}${returnTo}`;
  }

  /**
   * Use to Logout the user
   * @param {string} returnTo - The URL where your application should navigate after logout
   */
  public async logout(returnTo?: string) {
    const tokenData = await this.getAccessTokenSilently();
    if (!tokenData.isauthenticated) {
      return;
    }
    const url = this.buildLogoutUrl(returnTo);
    window.location.assign(url);
  }
}
