require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const studentRoutes = require('./routes/student');
const masterRoutes = require('./routes/master');
const staffRoutes = require('./routes/staff');

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/master', masterRoutes);
app.use('/api/staff', staffRoutes);

app.get('/', (req, res) => {
  res.send('MySchool API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 