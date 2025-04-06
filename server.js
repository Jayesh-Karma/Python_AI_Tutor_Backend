const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { askGemini } = require('./Gemini');

require('dotenv').config();

const app = express();
app.use(cors(
    {
  "origin": "*",
  "methods": "GET, PUT, PATCH, POST, DELETE",
  "optionsSuccessStatus": 204
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: 'Hello, this is an AI Chatbot! server' });
})
app.post('/ask-ai', async (req, res) => {
    try {
        const { message, tutor } = req.body;

        if(!message){
            return res.status(400).json({ error: 'Please provide a message.' });
        }
        let responseStyle = "";
        if (tutor === "mentor1") responseStyle = "Explain formally like a professor.";
        else if (tutor === "mentor2") responseStyle = "Be casual and friendly.";
        else if (tutor === "mentor3") responseStyle = "Give deep technical insights.";
        else{
            responseStyle = "in very understandable way"
        }
        const response = await askGemini(message + " " + responseStyle);
        
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
