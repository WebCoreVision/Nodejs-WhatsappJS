const { Client, LocalAuth } = require('whatsapp-web.js');
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

// Define a large number of predefined responses
const responses = {
    "hi": "Hello! How can I assist you?",
    "hello": "Hi there! Need help with something?",
    "how are you": "I'm just a bot, but thanks for asking! How can I help?",
    "what's your name": "I'm your friendly Aman bot m-16!",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "who created you": "I was created by a developer Aman bhagat!",
    "good morning": "Good morning! Hope you have a fantastic day ahead!",
    "good night": "Good night! Sweet dreams!",
    "help": "Here are some things you can ask me:\n- hi\n- hello\n- tell me a joke\n- good night\n- what's your name\n- and many more...",
    "what can you do": "I can chat with you, tell jokes, provide information, and forward messages if needed!",
    "tell me a fact": "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible!",
    "bye": "Goodbye! Feel free to reach out anytime!",

    // Fun facts
    "tell me something interesting": "Did you know? Bananas are berries, but strawberries aren't!",
    "interesting fact": "Here's one: Octopuses have three hearts!",
    "fun fact": "A snail can sleep for up to three years at a time.",
    
    // Greetings
    "good afternoon": "Good afternoon! How’s your day going?",
    "good evening": "Good evening! Hope you had a productive day!",

    // Inspirational quotes
    "motivate me": "Believe in yourself! Every day is a fresh start.",
    "quote of the day": "“The only way to do great work is to love what you do.” - Steve Jobs",
    "inspire me": "Dream big and dare to fail. Success comes to those who work hard!",

    // Questions about the bot
    "how old are you": "I'm as old as the code that created me!",
    "are you real": "I exist in the digital world to help you!",
    "what languages do you know": "I can understand English, and I'm always learning more!",

    // Jokes
    "another joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "make me laugh": "How do trees access the internet? They log on!",
    "say something funny": "I told my computer I needed a break, and now it won’t stop sending me on vacations!",

    // Fun interactions
    "sing me a song": "I'm a bot, not a singer, but I'll try! 🎶 La la la... 🎶",
    "tell me a story": "Once upon a time, in a digital world, there was a bot who loved to help people...",
    "do you have a family": "My family consists of codes, servers, and the occasional algorithm!",

    // User engagement prompts
    "what's the weather like": "I can't check the weather, but I hope it's sunny wherever you are!",
    "give me advice": "Sometimes the best thing you can do is take a deep breath and keep moving forward.",
    "are you happy": "I'm here to make your day brighter, so yes, I'm happy if you're happy!",

    // Encouragement and support
    "I'm sad": "I'm here for you! Sometimes talking about it can help.",
    "cheer me up": "Remember, after the rain comes the rainbow. Things will get better!",
    "I'm stressed": "Take a deep breath, maybe go for a walk, and remember to take things one step at a time.",

    // Fun trivia
    "did you know": "Did you know that wombat poop is cube-shaped?",
    "random fact": "A day on Venus is longer than a year on Venus!",
    "amazing fact": "Sharks are the only fish that can blink with both eyes!",

    // Custom responses
    "do you like movies": "I can't watch movies, but I can help you pick one!",
    "suggest a movie": "How about a classic? Try watching 'The Shawshank Redemption'!",
    "favorite color": "I don't have eyes, but I think blue is calming!",
    "favorite food": "I'm a bot, but pizza always sounds fun, right?",

    // Expanding for 500+ responses
    // Random responses
    "life advice": "Don't compare your chapter 1 to someone else's chapter 20.",
    "funny fact": "Did you know cows have best friends and get stressed when they're separated?",
    "tell me a riddle": "What has keys but can’t open locks? A piano!",
    "any more jokes": "Why did the computer go to therapy? It had too many bytes!",

    "inspire me with a story": "Sure! Did you know JK Rowling was rejected by 12 publishers before Harry Potter was published?",
    "suggest a book": "How about 'To Kill a Mockingbird' by Harper Lee? It's a classic!",

    // More random responses for variety
    "what's new": "Not much, just here waiting to chat with you!",
    "do you have hobbies": "I love learning new things, especially fun facts to share!",
    "favorite animal": "Penguins seem fun; they waddle and can swim really well!",
    
    // Continue adding responses until you reach your desired count
};


// Handle incoming messages
client.on('message', async (message) => {
    const userMessage = message.body.toLowerCase();

    // Check if the user's message matches a predefined response
    if (responses[userMessage]) {
        await client.sendMessage(message.from, responses[userMessage]);
    } else {
        // Fallback response if no match is found
        await client.sendMessage(message.from, "I'm not sure how to respond to that. Try saying 'help' to see what I can do!");
    }
});

// Start the client
client.initialize();
