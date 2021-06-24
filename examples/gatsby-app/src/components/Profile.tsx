import { useLRAuth } from 'loginradius-react';

import React from 'react';
import Loading from './Loading';
import Error from './Error';
import { RouteComponentProps } from '@reach/router';

export interface ProfileProps extends RouteComponentProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const { error, isLoading, user } = useLRAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {user.FirstName && <th scope="col">Name</th>}
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {user.FirstName && <td>{user.FirstName}</td>}
          <td>{user.Email[0].Value}</td>
        </tr>
      </tbody>
    </table>
  );
};
