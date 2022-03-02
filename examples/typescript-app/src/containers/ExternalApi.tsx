import React, { useState } from "react";
import { useLRAuth, withAuthenticationRequired } from "loginradius-react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";

export const ExternalApiComponent = () => {
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
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
    } catch (error: any) {
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
        `https://api.loginradius.com/identity/v2/auth/access_token/validate?access_token=${token}&apiKey=${process.env.REACT_APP_API_KEY}`,
        {}
      );

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error: any) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <>
      <div className="mb-5">
        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => {
                e.preventDefault();
                handleLoginAgain();
              }}
            >
              log in again
            </a>
          </Alert>
        )}

        <h1>External API</h1>
        <p className="lead">
          Ping an external API by clicking the button below.
        </p>

        <p>
          This will call a local API (valiadate token API). An access token and
          apiKey are used as the query paramteres and the API will validate it
          and provide a response. For more information about the different
          API's, please check the{" "}
          <a href="https://www.loginradius.com/docs/developer/#api">
            LoginRadius API Documentation
          </a>
          .
        </p>

        <Button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </Button>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
