import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function GamesCard() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <Card className="bg-dark text-white">
            <Card.Header>Games</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item as={Link} to="/game/pubg">Pubg</ListGroup.Item>
              <ListGroup.Item as={Link} to="/game/freefire">Free Fire</ListGroup.Item>
              <ListGroup.Item as={Link} to="/game/ludoking">Ludo King</ListGroup.Item>
              <ListGroup.Item as={Link} to="/game/wcc2">WCC2</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary" as={Link} to="/group-chats">
                Group Chats
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GamesCard;
