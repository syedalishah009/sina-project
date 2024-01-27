const pool = require("../db");

const router = require("express").Router();


router.post('/register', async (req, res) => {
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

  module.exports = router;