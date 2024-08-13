const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const Menu = require('./models/menu');

app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How I can help you?');
});

app.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log('Error saving menu:', err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

app.get('/menu', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error fetching menu:', err);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

// Use the personRoutes module
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

