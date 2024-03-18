const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample user information
const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
});

app.post('/bfhl', (req, res) => {
    try {
        const inputData = req.body.inputData;

        const result = inputData.map(data => {
            const odd_numbers = data.filter(num => typeof num === 'string' && parseInt(num) % 2 !== 0);
            const even_numbers = data.filter(num => typeof num === 'string' && parseInt(num) % 2 === 0);
            const alphabets = data.filter(char => typeof char === 'string' && /^[A-Za-z]$/.test(char)).map(char => char.toUpperCase());

            return {
                is_success: true,
                user_id: user_id,
                email: email,
                roll_number: roll_number,
                odd_numbers: odd_numbers,
                even_numbers: even_numbers,
                alphabets: alphabets
            };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ is_success: false, error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});