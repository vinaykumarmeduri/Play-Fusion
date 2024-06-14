const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const PubgTournament = require('./models/PubgTournament');
const WCC2Tournament = require('./models/WCC2Tournament');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const app = express();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
app.use(cors());
app.use(express.json());
const server = http.createServer(app);


// Connect to MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/playfusion');

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Generate a unique user_id
    const user_id = generateUserId(); // Implement this function to generate a unique user_id

    const newUser = new UserModel({
      user_id,
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
const chatGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }] // Define members as an array of strings
});

const ChatGroup = mongoose.model('ChatGroup', chatGroupSchema);

// Function to generate a unique user_id
function generateUserId() {
  // Implement your logic to generate a unique user_id here
  return uuidv4();
}
app.post('/api/chat-groups', async (req, res) => {
  try {
    const { name, members } = req.body;
    console.log('Received request body:', req.body); // Log the received request body

    // Check if the members array is provided and contains at least one username
    if (!members || !members.length) {
      return res.status(400).json({ error: 'Members array with at least one username is required' });
    }

    // Create the chat group with the provided name and members
    const chatGroup = new ChatGroup({ name, members });
    
    // Save the chat group to the database
    await chatGroup.save();

    res.status(201).json(chatGroup);
  } catch (error) {
    console.error('Error creating chat group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/chat-groups/add-member', async (req, res) => {
  try {
    const { name, member } = req.body;
    console.log('Received request body:', req.body); // Log the received request body

    // Find the chat group by name
    const chatGroup = await ChatGroup.findOne({ name });
    if (!chatGroup) {
      return res.status(404).json({ error: 'Chat group not found' });
    }

    // Check if the member is already in the chat group
    if (!chatGroup.members.includes(member)) {
      chatGroup.members.push(member);
      await chatGroup.save();
    }

    res.status(200).json(chatGroup);
  } catch (error) {
    console.error('Error adding member to chat group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/signin', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await UserModel.findOne({ name });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    // Now you can proceed with password verification
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If user exists and passwords match, sign in successful
    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (error) {
    // If an error occurs during sign-in process, return internal server error
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const FreefireTournamentSchema = new mongoose.Schema({
  tournamentName: String,
  entryFee: Number,
  typeOfTournament: String,
  dateOfConduction: Date,
  lastDateForRegistration: Date
});

// Define model for Freefire Tournament
const FreefireTournament = mongoose.model('FreefireTournament', FreefireTournamentSchema);

// Define route for creating a Freefire tournament
app.post('/api/freefire', (req, res) => {
  const { tournamentName, entryFee, typeOfTournament, dateOfConduction, lastDateForRegistration } = req.body;

  // Create a new Freefire tournament
  const newTournament = new FreefireTournament({
    tournamentName,
    entryFee,
    typeOfTournament,
    dateOfConduction,
    lastDateForRegistration
  });

  // Save the new tournament to the database
  newTournament.save()
    .then(() => {
      console.log('Tournament saved successfully');
      res.status(200).json({ message: 'Tournament created successfully' });
    })
    .catch(err => {
      console.error('Error saving tournament:', err);
      res.status(500).json({ error: 'Failed to create tournament' });
    });
});
const ludoKingTournamentSchema = new mongoose.Schema({
  tournamentName: String,
  entryFee: Number,
  typeOfTournament: String,
  dateOfConduction: Date,
  lastDateForRegistration: Date
});

// Create Ludo King Tournament model
const LudoKingTournament = mongoose.model('LudoKingTournament', ludoKingTournamentSchema);

// Create endpoint for creating Ludo King tournaments
app.post('/api/ludo-king-tournaments', async (req, res) => {
  try {
    // Extract tournament details from request body
    const { tournamentName, entryFee, typeOfTournament, dateOfConduction, lastDateForRegistration } = req.body;

    // Create new Ludo King tournament instance
    const newTournament = new LudoKingTournament({
      tournamentName,
      entryFee,
      typeOfTournament,
      dateOfConduction,
      lastDateForRegistration
    });

    // Save the new tournament to the database
    await newTournament.save();
    

    // Respond with success message
    res.status(201).json({ message: 'Ludo King tournament created successfully' });
  } catch (error) {
    // Respond with error message if an error occurs
    console.error('Error creating tournament:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});
app.post('/api/pubg-tournaments', async (req, res) => {
  try {
    const { tournamentName, entryFee, typeOfTournament, dateOfConduction, lastDateForRegistration } = req.body;

    // Create a new PUBG tournament instance
    const newTournament = new PubgTournament({
      tournamentName,
      entryFee,
      typeOfTournament,
      dateOfConduction,
      lastDateForRegistration
    });

    // Save the tournament to the database
    const savedTournament = await newTournament.save();

    res.status(201).json(savedTournament);
  } catch (error) {
    console.error('Error creating PUBG tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/wcc2-tournaments', async (req, res) => {
  try {
    // Create a new WCC2 Tournament using the request body
    const newTournament = new WCC2Tournament(req.body);
    // Save the tournament to the database
    const savedTournament = await newTournament.save();
    res.status(201).json(savedTournament); // Respond with the saved tournament
  } catch (error) {
    console.error('Error creating WCC2 tournament:', error);
    res.status(500).send('Failed to create tournament'); // Respond with an error message
  }
});

// Define endpoint to fetch PUBG tournament details
app.get('/api/pubg-tournaments', async (req, res) => {
  try {
    // Fetch all PUBG tournaments from the database
    const tournaments = await PubgTournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Error fetching PUBG tournaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/freefire-tournaments', async (req, res) => {
  try {
    const tournaments = await FreefireTournament.find();
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching Freefire tournaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/ludo-king-tournaments', async (req, res) => {
  try {
    const tournaments = await LudoKingTournament.find();
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching LudoKing tournaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/wcc2-tournaments', async (req, res) => {
  try {
    const tournaments = await WCC2Tournament.find();
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching WCC2 tournaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/chat-groups', async (req, res) => {
  try {
    // Fetch the username from the request headers or wherever you store it
    const username = req.headers.username; // Assuming the username is passed in the headers

    // Fetch chat groups where the username is present in the members array
    const chatGroups = await ChatGroup.find({ members: username });

    res.json(chatGroups);
  } catch (error) {
    console.error('Error fetching chat groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// In-memory chat messages storage
const chatMessages = {};

// Routes

// Upload a file
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ fileUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Get chat messages for a chat group
app.get('/api/chatmessages/:groupName', async (req, res) => {
  try {
    const { groupName } = req.params;

    // Find messages by group name
    const messages = await Message.find({ groupName });

    // Respond with the messages
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  groupName: { type: String, required: true }, // Add groupName field
  fileUrl: { type: String }
});


// Define the Message model
const Message = mongoose.model('Message', messageSchema);
// Route to handle sending chat messages
app.post('/api/chatmessages/:groupName', upload.single('file'), async (req, res) => {
  try {
    const { groupName } = req.params;
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ error: 'Sender and message are required' });
    }

    const newMessage = new Message({
      sender,
      message,
      groupName,
      fileUrl: req.file ? req.file.path : null // save file path if uploaded
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3000, () => console.log("Server is running on port 3000")); 