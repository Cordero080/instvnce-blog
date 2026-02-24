const express = require('express'); // Import express to create the server
const dotenv = require('dotenv'); // Import dotenv to load secret variables
const cors = require('cors'); // import cors to allow frontend communication 
const connectDB = require('./config/db'); // Import our modular database connection
const postRoutes = require('./routes/postRoutes'); // Import the blog routes

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middleware
app.use(cors()); // Enable CORS so React can talk to the server
app.use(express.json());

// ROUTES
app.use('/api/posts', postRoutes); // Tell the server to use postRoutes for any URL starting with api/posts

// 4. Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
