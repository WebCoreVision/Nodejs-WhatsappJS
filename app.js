const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth() // Persist session data
});

// Generate and display QR code for WhatsApp Web
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Please scan the QR code with WhatsApp.');
});

// Log in once authenticated
client.on('authenticated', () => {
    console.log('Authenticated successfully!');
});

// Handle incoming messages
client.on('message', async (message) => {
    console.log(`Received message: ${message.body}`);

    // Respond to specific messages
    if (message.body.toLowerCase() === 'send options') {
        await sendOptions(message.from);
    }
});

// Function to send a button message
async function sendOptions(chatId) {
    const buttonMessage = new Buttons(
        'Choose an option:', // Body message
        [
            { buttonId: 'option1', buttonText: { displayText: 'Option 1' }, type: 1 },
            { buttonId: 'option2', buttonText: { displayText: 'Option 2' }, type: 1 },
            { buttonId: 'option3', buttonText: { displayText: 'Option 3' }, type: 1 }
        ],
        'Header Text', // Header
        'Footer Text' // Footer
    );

    await client.sendMessage(chatId, buttonMessage);
};

// Listen for button response
client.on('button-response', async (buttonResponse) => {
    console.log(`Button pressed: ${buttonResponse.selectedButtonId}`);
    
    let responseMessage;
    switch (buttonResponse.selectedButtonId) {
        case 'option1':
            responseMessage = 'You selected Option 1!';
            break;
        case 'option2':
            responseMessage = 'You selected Option 2!';
            break;
        case 'option3':
            responseMessage = 'You selected Option 3!';
            break;
        default:
            responseMessage = 'Unknown option!';
    }

    await client.sendMessage(buttonResponse.from, responseMessage);
});

// Start the client
client.initialize();
