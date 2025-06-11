const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const quizRoutes = require('./routes/quiz');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/learning-platform');

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
