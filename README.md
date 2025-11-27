# Thanksgiving WhatsApp Bot

This is a project that is intended to guide and help the guests that are arriving to the thanksgiving party. This bot acts as an assistant to the host and helps the guests queries.

## Features

- **Guest List Restriction**: The bot only responds to phone numbers listed in `guest_list.csv`.
- **Personalized Responses**: Addresses guests by their name as defined in the guest list.
- **AI-Powered Chat**: Uses Google Gemini to answer conversational queries in a helpful and friendly manner.
- **Location Assistance**: Automatically provides the party address and Google Maps link when asked about location or directions.
- **Host Broadcast**: Allows the host to broadcast images and messages to all guests using the `!broadcast` command.

## Prerequisites

- Node.js installed on your machine.
- A WhatsApp account (to act as the host).
- A Google Gemini API Key.

## Setup

1.  **Clone the repository** (or download the files).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory with the following content:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    GUEST_LIST_PATH=guest_list.csv
    ```
4.  **Prepare Guest List**:
    Ensure `guest_list.csv` exists in the root directory with the following format:
    ```csv
    Name,PhoneNumber
    Mom,19135550101
    Dad,19135550102
    Friend,1234567890
    ```
    *Note: Phone numbers should include the country code without `+` or spaces.*

## Running the Bot

1.  Start the bot:
    ```bash
    npm start
    ```
2.  Scan the QR code displayed in the terminal using your WhatsApp mobile app (Linked Devices).
3.  The bot is now ready!

## Usage

- **Guests**: Simply message the bot number. If you are on the guest list, the bot will reply.
- **Host**:
    - **Broadcast**: Send an image with the caption `!broadcast Your message here` to send it to all guests.
