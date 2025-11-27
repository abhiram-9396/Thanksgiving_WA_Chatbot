require('dotenv').config();

async function fetchModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found in .env");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response:", text);
            return;
        }

        const data = await response.json();
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found in response:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

fetchModels();
