import { useLRAuth, withAuthenticationRequired } from "loginradius-react";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import Loading from "../components/Loading";

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { user } = useLRAuth();
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={
              user?.ProfileImageUrls
                ? user?.ProfileImageUrls[0]
                : `https://ui-avatars.com/api/?name=${user?.Email[0].Value}`
            }
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user?.FirstName || user?.Email[0].Value}</h2>
          {user?.FirstName && (
            <p className="lead text-muted">{user?.Email[0].Value}</p>
          )}
        </Col>
      </Row>
      <Row>
        <pre className="json">{JSON.stringify(user, null, 2)}</pre>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
  returnTo: "/profile",
});
