const mongoose = require('mongoose');

// Connect to the local MongoDB instance
mongoose.connect('mongodb://localhost:27017/hotel', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Error handling
db.on('error', (err) => {
    console.log('MongoDB connection errors:', err);
});

// Connection success
db.once('open', () => {
    console.log('Connected to MongoDB servererr');
});
