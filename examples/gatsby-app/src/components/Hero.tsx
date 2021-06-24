import { RouteComponentProps } from '@reach/router';
import React from 'react';

export interface HeroProps extends RouteComponentProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="text-center hero my-5">
      <img
        className="mb-3 app-logo"
        src={'/logo.png'}
        alt="Gatsby logo"
        width="120"
      />
      <h1 className="mb-4">GatsbyJS Sample Project</h1>

      <p className="lead">
        This is a sample application that demonstrates an authentication flow
        for an SPA, using <a href="https://www.gatsbyjs.com/">GatsbyJS</a>
      </p>
    </div>
  );
};
