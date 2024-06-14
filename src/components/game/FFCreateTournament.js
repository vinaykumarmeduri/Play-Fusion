import React, { useState } from 'react';
import { Button, Form, Toast } from 'react-bootstrap';
import axios from 'axios';

function FFCreateTournament() {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    tournamentName: '',
    entryFee: '',
    typeOfTournament: '',
    dateOfConduction: '',
    lastDateForRegistration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateTournament = async () => {
    try {
      // Send the form data to the server to create the tournament
      const response = await axios.post("http://localhost:3000/api/freefire", formData);
  
      // If the request is successful, proceed to create the chat group
      if (response.status === 200) {
        // Retrieve the username from local storage
        const username = localStorage.getItem('name');
        
        // Create chat group with the tournament name as the group name
        await axios.post('http://localhost:3000/api/chat-groups', {
          name: formData.tournamentName,
          members: [username]
        });
  
        // Show toast message
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error creating tournament or chat group:", error);
    }
  };
  
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center overflow-hidden">
      <div className="w-100">
        <Form className="bg-dark p-4 rounded" style={{ height: '100vh' }}>
          <h2 className="text-center mb-4 text-light">Create Free Fire Tournament</h2>
          <Form.Group controlId="formTournamentName">
            <Form.Label className="text-light">Tournament Name</Form.Label>
            <Form.Control type="text" name="tournamentName" value={formData.tournamentName} onChange={handleChange} placeholder="Enter tournament name" className="bg-dark text-light" />
          </Form.Group>

          <Form.Group controlId="formEntryFee">
            <Form.Label className="text-light">Entry Fee</Form.Label>
            <Form.Control type="number" name="entryFee" value={formData.entryFee} onChange={handleChange} placeholder="Enter entry fee" className="bg-dark text-light" />
          </Form.Group>

          <Form.Group controlId="formTypeOfTournament">
            <Form.Label className="text-light">Type of Tournament</Form.Label>
            <Form.Control as="select" name="typeOfTournament" value={formData.typeOfTournament} onChange={handleChange} className="bg-dark text-light">
              <option disabled defaultValue>Select Type of Tournament</option>
              <option value="battleRoyal">Battle Royal</option>
              <option value="clashSquad">Clash Squad</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDateTime">
            <Form.Label className="text-light">Date of Conduction</Form.Label>
            <Form.Control type="datetime-local" name="dateOfConduction" value={formData.dateOfConduction} onChange={handleChange} className="bg-dark text-light" />
          </Form.Group>

          <Form.Group controlId="formLastDate">
            <Form.Label className="text-light">Last Date for Registration</Form.Label>
            <Form.Control type="datetime-local" name="lastDateForRegistration" value={formData.lastDateForRegistration} onChange={handleChange} className="bg-dark text-light" />
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
          bg="success"
          delay={3000}
          autohide
        >
          <Toast.Body>Tournament created successfully!</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default FFCreateTournament;
