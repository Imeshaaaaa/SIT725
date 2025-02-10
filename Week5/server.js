const express = require('express');
const path = require('path');
const entryRoutes = require('./routes/entryRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Ensure JSON body parsing
app.use(express.urlencoded({ extended: true })); // Handle form data

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Routes
app.use('/', entryRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
