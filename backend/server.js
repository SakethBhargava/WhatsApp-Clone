require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT;

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.CONNECTION_URL;

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api', messageRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
