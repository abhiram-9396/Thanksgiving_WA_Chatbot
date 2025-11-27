require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox']
    }
});

// Dummy Guest List (Replace with real numbers)
// Format: 'countrycodephonenumber@c.us' e.g. '1234567890@c.us'
const guestList = [
    '1234567890@c.us',
    '0987654321@c.us'
];

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR RECEIVED', qr);
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async msg => {
    // message_create triggers for both incoming and outgoing messages
    // We can use this to listen for the host's commands too.


    const messageBody = msg.body.toLowerCase();

    // 1. Navigation Logic
    if (messageBody.includes('address') || messageBody.includes('location') || messageBody.includes('directions')) {
        // Avoid replying to self if it's just a casual mention, but for a bot it's usually fine to reply to others.
        // If we want to reply to everyone asking:
        if (!msg.fromMe) {
            await msg.reply('We are at 14651 travis street, Overland Park, KS. Google Maps: https://maps.app.goo.gl/pnJ5aEP6j2Ky1KGF8');
            return;
        }
    }

    // 2. Image Broadcast Logic (Host Only)
    if (msg.fromMe && msg.hasMedia && messageBody.includes('!broadcast')) {
        console.log('Broadcasting image...');
        const media = await msg.downloadMedia();

        for (const guestId of guestList) {
            try {
                await client.sendMessage(guestId, media, { caption: msg.body.replace('!broadcast', '').trim() });
                console.log(`Sent to ${guestId}`);
            } catch (err) {
                console.error(`Failed to send to ${guestId}`, err);
            }
        }
        await msg.reply('Broadcast complete!');
        return;
    }

    // 3. Thanksgiving Chat (AI)
    // Only reply to non-command messages from others
    if (!msg.fromMe && !messageBody.startsWith('!')) {
        // Check if it's a group chat to avoid spamming, or just reply to direct messages.
        // For this party bot, let's assume it replies to DMs or mentions.
        // But the requirement says "If the message is conversational".
        // Let's filter out the navigation keywords first (handled above).

        try {
            const result = await model.generateContent(`You are a helpful Thanksgiving host assistant. Reply to this message: ${msg.body}`);
            const response = result.response;
            const text = response.text();
            await msg.reply(text);
        } catch (error) {
            console.error('Error generating AI response:', error);
        }
    }
});

client.initialize();
