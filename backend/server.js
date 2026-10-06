const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory array to store inquiries (simulating a database)
const inquiries = [];

// Route to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, interest, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required.' });
    }

    const newInquiry = {
        id: Date.now(),
        name,
        email,
        interest,
        message,
        date: new Date()
    };

    inquiries.push(newInquiry);
    console.log('New inquiry received:', newInquiry);

    res.status(201).json({ message: 'Inquiry saved successfully.', inquiryId: newInquiry.id });
});

// Route to fetch all inquiries (for admin purposes)
app.get('/api/inquiries', (req, res) => {
    res.json(inquiries);
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
