const express = require("express")
const app = express()
const port = 3000
app.use(express.json());
const db = require('./connection/connection');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/insert', async (req, res) => {
    try {
        const { businessName, businessEmail, businessPhone, businessAddress, zipCode } = req.body;
        const result = db.query('INSERT INTO business (businessName, businessEmail, businessPhone, businessAddress, zipCode ) VALUES (?, ?, ?, ?, ?)', [businessName, businessEmail, businessPhone, businessAddress, zipCode]);

        res.status(201).json({
            message: req.body,
            status: 201,
            insertedId: result.insertId
        });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Error inserting data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});