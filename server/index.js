const express = require('express');
const cors = require('cors');
const userRoutes = require('./rountes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use('/', userRoutes); // prefix api ex. /users

const bcrypt = require('bcrypt');
const saltRounds = 10;

// path = POST /users
app.post('/users', async (req, res) => {
  try {
    const {username, password} = req.body;
    
    // if (!username || !password) {
    //     return res.status(400).json({
    //         message: 'username and password required'
    //     })
    // }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma
      .users.create({
        data: {
          username: username,
          password: hashPassword
        }
    })

    res.json({
      message: 'create ok',
      data: newUser
    });

  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).send('Database error');
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});