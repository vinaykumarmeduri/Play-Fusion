// Pubg.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Pubg.css'; // Import CSS file for styling

function Pubg() {
  return (
    <div className="pubg-background">
      <div className="overlay">
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Col md={6} className="text-center">
              <Card bg="dark" text="white" className="tournament-card">
                <Card.Body>
                  <Card.Title>PUBG Tournaments</Card.Title>
                  <Card.Text>
                    Choose from the following options to participate in PUBG tournaments:
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="text-center">
              <Card bg="dark" text="white" className="tournament-card">
                <Card.Body>
                  <Card.Title>Create a New Tournament</Card.Title>
                  <Card.Text>
                    Click below to create a new PUBG tournament.
                  </Card.Text>
                  <Link to="/game/PubgCT" className="btn btn-primary">Create Tournament</Link>
                </Card.Body>
              </Card>
              <Card bg="dark" text="white" className="tournament-card mt-3">
                <Card.Body>
                  <Card.Title>Play Existing Tournaments</Card.Title>
                  <Card.Text>
                    View and join existing PUBG tournaments.
                  </Card.Text>
                  <Link to="/pubgtournamnets" className="btn btn-primary">View Tournaments</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Pubg;
