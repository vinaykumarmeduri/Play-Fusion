import React, { useState } from 'react';
import { Button, Form, Toast } from 'react-bootstrap';
import axios from 'axios';

function PubgCT() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [tournamentDetails, setTournamentDetails] = useState({
    tournamentName: '',
    entryFee: '',
    typeOfTournament: '',
    dateOfConduction: '',
    lastDateForRegistration: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTournamentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateTournament = async () => {
    try {
      // Send a POST request to the server to create the tournament
      await axios.post('http://localhost:3000/api/pubg-tournaments', tournamentDetails);

      // Retrieve the username from local storage
      const username = localStorage.getItem('name');
      console.log('Retrieved username from local storage:', username);

      if (!username) {
        throw new Error('Username not found in local storage');
      }

      // Log the data being sent to the backend
      console.log('Sending chat group creation request with:', {
        name: tournamentDetails.tournamentName,
        members: [username]
      });

      // Create chat group with the tournament name as the group name
      await axios.post('http://localhost:3000/api/chat-groups', {
        name: tournamentDetails.tournamentName,
        members: [username]
      });

      // Show the toast message on successful creation
      setToastMessage('Tournament and chat group created successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error creating PUBG tournament or chat group:', error);
      setToastMessage('Error creating tournament or chat group.');
      setShowToast(true);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center overflow-hidden">
      <div className="w-100">
        <Form className="bg-dark p-4 rounded" style={{ height: '100vh' }}>
          <h2 className="text-center mb-4 text-light">Create PUBG Tournament</h2>
          <Form.Group controlId="formTournamentName">
            <Form.Label className="text-light">Tournament Name</Form.Label>
            <Form.Control type="text" placeholder="Enter tournament name" name="tournamentName" value={tournamentDetails.tournamentName} onChange={handleInputChange} className="bg-dark text-light" />
          </Form.Group>

          <Form.Group controlId="formEntryFee">
            <Form.Label className="text-light">Entry Fee</Form.Label>
            <Form.Control type="number" placeholder="Enter entry fee" name="entryFee" value={tournamentDetails.entryFee} onChange={handleInputChange} className="bg-dark text-light" />
          </Form.Group>

          <Form.Group controlId="formTypeOfTournament">
            <Form.Label className="text-light">Type of Tournament</Form.Label>
            <Form.Control as="select" className="bg-dark text-light" name="typeOfTournament" value={tournamentDetails.typeOfTournament} onChange={handleInputChange}>
              <option disabled selected>Type of Tournament</option>
              <option value="battleRoyal">Battle Royal</option>
              <option value="erangle">Erangle</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDateTime">
            <Form.Label className="text-light">Date of Conduction</Form.Label>
            <Form.Control type="datetime-local" className="bg-dark text-light" name="dateOfConduction" value={tournamentDetails.dateOfConduction} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formLastDate">
            <Form.Label className="text-light">Last Date for Registration</Form.Label>
            <Form.Control type="datetime-local" className="bg-dark text-light" name="lastDateForRegistration" value={tournamentDetails.lastDateForRegistration} onChange={handleInputChange} />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="button" className="mt-3" onClick={handleCreateTournament}>
              Create Tournament
            </Button>
          </div>
        </Form>
        {/* Toast message */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          className="position-fixed bottom-0 end-0 m-3"
          bg={toastMessage.includes('successfully') ? 'success' : 'danger'}
          delay={3000}
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default PubgCT;
