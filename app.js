const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./db');
const port = 3000;

const userRoute = require('./routes/userRoute');

// Middleware to parse JSON requests
app.use(express.json());

// Use data routes
// app.use('/register', userRoute);



app.post('/register', async (req, res) => {
    // res.json("register successfully")
    const { username, password } = req.body;
  
    try {
      const result = await pool.query('INSERT INTO public.users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
      const newUser = result.rows[0];
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('/', (req, res) => {
    res.send('Hello, Worlds!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
