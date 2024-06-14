import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './WCC2.css'; // Import CSS file for styling

function WCC2() {
  return (
    <div className="wcc2-background">
      <div className="overlay">
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Col md={6} className="text-center">
              <Card bg="dark" text="white" className="tournament-card">
                <Card.Body>
                  <Card.Title>WCC2 Tournaments</Card.Title>
                  <Card.Text>
                    Choose from the following options to participate in WCC2 tournaments:
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="text-center">
              <Card bg="dark" text="white" className="tournament-card">
                <Card.Body>
                  <Card.Title>Create a New Tournament</Card.Title>
                  <Card.Text>
                    Click below to create a new WCC2 tournament.
                  </Card.Text>
                  <Link to="/game/WCCCT" className="btn btn-primary">Create Tournament</Link>
                </Card.Body>
              </Card>
              <Card bg="dark" text="white" className="tournament-card mt-3">
                <Card.Body>
                  <Card.Title>Play Existing Tournaments</Card.Title>
                  <Card.Text>
                    View and join existing WCC2 tournaments.
                  </Card.Text>
                  <Link to="/wcc2tournamnts" className="btn btn-primary">View Tournaments</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default WCC2;
