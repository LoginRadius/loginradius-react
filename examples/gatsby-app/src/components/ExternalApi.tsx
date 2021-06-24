import React, { useState } from 'react';
import { useLRAuth } from 'loginradius-react';
import { RouteComponentProps } from '@reach/router';

export interface ApiProps extends RouteComponentProps {}

export const ExternalApi: React.FC<ApiProps> = () => {
  const [state, setState] = useState({
    showResult: false,
    apiMessage: '',
    error: null,
  });
  const { loginWithPopup, getAccessTokenSilently } = useLRAuth();

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `https://api.loginradius.com/identity/v2/auth/access_token/validate?access_token=${token}&apiKey=${process.env.GATSBY_API_KEY}`,
        {}
      );

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <>
      <div className="mb-5">
        {state.error === 'login_required' && (
          <a
            href="#/"
            className="alert-link"
            onClick={(e) => {
              e.preventDefault();
              handleLoginAgain();
            }}
          >
            Log in again
          </a>
        )}

        <h4>Ping an external API by clicking the button below.</h4>
        <hr />
        <p>
          This will call a local API (valiadate token API). An access token and
          apiKey are used as the query paramteres and the API will validate it
          and provide a response. For more information about the different
          API's, please check the{' '}
          <a href="https://www.loginradius.com/docs/developer/#api">
            LoginRadius API Documentation
          </a>
          .
        </p>

        <button
          className="btn btn-outline-secondary"
          id="external-api"
          onClick={callApi}
        >
          Ping API
        </button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>

            <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
          </div>
        )}
      </div>
    </>
  );
};
