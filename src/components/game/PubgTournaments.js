import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import './Pubg.css'; // Import CSS file for styling

function PubgTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pubg-tournaments');
        if (!response.ok) {
          const errorMessage = await response.text(); // Get the error message from the response body
          throw new Error(`Failed to fetch tournaments. Status code: ${response.status}. Error message: ${errorMessage}`);
        }
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setError('Error fetching tournaments. Please try again later.');
      }
    };

    fetchTournaments();
  }, []);

  const handleJoinNow = async (tournamentName) => {
    try {
      const username = localStorage.getItem('name'); // Assuming username is stored in local storage
      if (!username) {
        setError('User is not logged in.');
        return;
      }

      const response = await axios.put('http://localhost:3000/api/chat-groups/add-member', {
        name: tournamentName,
        member: username
      });

      // Show success notification
      toast.success('Joined successfully!', {
        onClose: () => navigate(`/chat/${encodeURIComponent(response.data.name)}`) // Navigate to the chat group after the toast closes
      });
    } catch (error) {
      console.error('Error joining chat group:', error);
      setError('Error joining chat group. Please try again later.');
    }
  };

  return (
    <div className="pubg-background">
      <ToastContainer /> {/* ToastContainer to show notifications */}
      <div className="overlay">
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Col md={8} className="text-center">
              <h2>Existing PUBG Tournaments</h2>
              {error ? (
                <p className="text-danger">{error}</p>
              ) : (
                tournaments.map((tournament) => (
                  <Card key={tournament._id} bg="dark" text="white" className="tournament-card mt-3">
                    <Card.Body>
                      <Card.Title>{tournament.tournamentName}</Card.Title>
                      <Card.Text>
                        <strong>Entry Fee:</strong> {tournament.entryFee}<br />
                        <strong>Type of Tournament:</strong> {tournament.typeOfTournament}<br />
                        <strong>Date of Conduction:</strong> {new Date(tournament.dateOfConduction).toLocaleString()}<br />
                        <strong>Last Date for Registration:</strong> {new Date(tournament.lastDateForRegistration).toLocaleString()}
                      </Card.Text>
                      <Button variant="primary" onClick={() => handleJoinNow(tournament.tournamentName)}>Join Now</Button>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default PubgTournaments;
