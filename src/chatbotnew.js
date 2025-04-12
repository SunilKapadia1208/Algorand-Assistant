// Define the knowledge base
const knowledgeBase = [
    {
        patterns: ["what is algorand", "what is algo"],
        responses: ["Algorand is a blockchain platform designed for scalability and security."]
    },
    {
        patterns: ["how to write a smart contract", "teal tutorial"],
        responses: ["You can write Algorand smart contracts using Python. Refer to the official docs for examples."]
    },
    {
        patterns: ["algorand sdk", "sdk for algorand"],
        responses: ["Algorand provides SDKs for Python, JavaScript, Go, and Java. Check out the official GitHub repository."]
    },
    {
        patterns: ["how to deploy a contract"],
        responses: ["To deploy a smart contract, compile it using algod or the SDK, then send it to the network."]
    }
];

// Preprocessing functions
function tokenize(input) {
    return input.toLowerCase().split(/\s+/); // Split into lowercase tokens
}

function stem(word) {
    // Simplified stemming logic
    const suffixes = ["ing", "ed", "s"];
    for (let suffix of suffixes) {
        if (word.endsWith(suffix)) {
            return word.slice(0, -suffix.length);
        }
    }
    return word;
}

function preprocess(input) {
    return tokenize(input).map(stem);
}

// Matching logic
function findBestMatch(input) {
    const processedInput = preprocess(input);

    let bestMatch = null;
    let highestScore = 0;

    for (let entry of knowledgeBase) {
        for (let pattern of entry.patterns) {
            const processedPattern = preprocess(pattern);
            const commonWords = processedInput.filter(word => processedPattern.includes(word));
            const score = commonWords.length / processedPattern.length;

            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry;
            }
        }
    }

    return bestMatch;
}

// Response generation
function getResponse(input) {
    const match = findBestMatch(input);
    if (match) {
        const randomIndex = Math.floor(Math.random() * match.responses.length);
        return match.responses[randomIndex];
    } else {
        return "I'm sorry, I didn't understand that.";
    }
}

// Export the getResponse function
module.exports = { getResponse };