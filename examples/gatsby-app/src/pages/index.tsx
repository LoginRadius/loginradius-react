import React from 'react';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Hero } from '../components/Hero';
import { Router } from '@reach/router';
import { useLRAuth, withAuthenticationRequired } from 'loginradius-react';
import { Profile } from '../components/Profile';
import { ExternalApi } from '../components/ExternalApi';

const ProtectedRoute = withAuthenticationRequired(Profile);
const ProtectRoute = withAuthenticationRequired(ExternalApi);

export interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const { isLoading, error } = useLRAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      {error && <Error message={error.message} />}
      <Hero />
      <Router>
        <ProtectedRoute path="/profile" />
        <ProtectRoute path="/external-api" />
      </Router>
    </>
  );
};

export default IndexPage;
