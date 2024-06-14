import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import GamesCard from './GamesCard'; // Import the GamesCard component

function Home() {
  const storedName = localStorage.getItem('name');
        console.log('Stored name in local storage:', storedName);
  return (
    <div>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/home">Play Fusion</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
          <Link to="/chat" className="nav-link">
            <FontAwesomeIcon icon={faComments} />
          </Link>
        </Container>
      </Navbar>
      
      <div className="text-center mt-5">
        <h1>Welcome to Play Fusion!</h1>
        <p>This is the home page of our application.</p>
        {/* Include the GamesCard component */}
        <GamesCard />
      </div>
    </div>
  );
}

export default Home;
