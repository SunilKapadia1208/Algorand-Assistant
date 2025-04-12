// Import the required VS Code API
const vscode = require('vscode');

// Import the chatbot logic
const { getResponse } = require('./chatbotnew');

/**
 * Activates the extension when it's loaded in VS Code.
 * @param {vscode.ExtensionContext} context - The extension context provided by VS Code.
 */
function activate(context) {
    console.log('Algorand Chatbot is now active!');

    // Register a command to start the chatbot
    let disposable = vscode.commands.registerCommand('algorand-chatbot.start', () => {
        // Create an input box for user interaction
        const inputBox = vscode.window.createInputBox();
        inputBox.title = "Algorand Chatbot";
        inputBox.prompt = "Ask me anything about Algorand!";
        inputBox.placeholder = "Type your question here...";

        // Handle user input
        inputBox.onDidChangeValue((value) => {
            if (value.trim().toLowerCase() === 'exit') {
                inputBox.hide(); // Close the input box if the user types "exit"
                return;
            }

            // Get the chatbot's response
            const response = getResponse(value);
            vscode.window.showInformationMessage(`ChatBot: ${response}`);
        });

        // Show the input box
        inputBox.show();
    });

    // Add the command to the extension context
    context.subscriptions.push(disposable);
}

/**
 * Deactivates the extension when it's unloaded from VS Code.
 */
function deactivate() {
    console.log('Algorand Chatbot has been deactivated.');
}

// Export the activate and deactivate functions
module.exports = {
    activate,
    deactivate
};