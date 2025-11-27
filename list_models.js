require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
            const result = await model.generateContent("Test");
            console.log("gemini-1.5-flash-latest worked:", result.response.text());
        } catch (error) {
            console.error("gemini-1.5-flash-latest failed:", error.message);
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result = await model.generateContent("Test");
            console.log("gemini-1.0-pro worked:", result.response.text());
        } catch (error) {
            console.error("gemini-1.0-pro failed:", error.message);
        }
    } catch (error) {
        console.error("Outer try-catch block caught an error:", error.message);
    }
}

listModels();
