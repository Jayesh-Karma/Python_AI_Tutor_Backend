const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your API key
const API_KEY = "AIzaSyCns-JHBAlNkUg52YLFjSpPYIxcUiP8bik";

async function askGemini(question) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContent(question);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example Usage
module.exports = {askGemini};