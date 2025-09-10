const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080'],
  credentials: true
}));

// Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/screening', require('./routes/screening'));
app.use('/api/circle', require('./routes/circle'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/escalate', require('./routes/escalate'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for simplicity; adjust in production
  },
});

const MAX_USERS = 10;
let userCount = 0;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Check if room is full
  if (userCount >= MAX_USERS) {
    socket.emit('room_full', 'Room has been filled.');
    socket.disconnect();
    return;
  }

  userCount++;
  socket.broadcast.emit('user_joined', `A new user has joined. Total users: ${userCount}`);

  socket.on('chat_message', (msg) => {
    io.emit('chat_message', msg); // Broadcast to all including sender
  });

  socket.on('disconnect', () => {
    userCount--;
    console.log('User disconnected');
    io.emit('user_left', `A user has left. Total users: ${userCount}`);
  });
});

const PORT = process.env.PORT || 3000;

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
