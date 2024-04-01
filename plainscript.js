// User data storage
let userData = {};

// Function to manage user data (store, retrieve, or clear)
function manageUserData(action, key, value) {
  if (action === "store") {
    userData[key] = value;
  } else if (action === "retrieve") {
    return userData[key];
  } else if (action === "clear") {
    delete userData[key];
  }
}

// Function to handle "Remember my name is" command
function handleRememberNameCommand(name) {
  manageUserData("store", "name", name);
  updateConsole(`I'll remember that your name is ${name}.`);
}

// Function to handle "Tell me what my name is" command
function handleTellNameCommand() {
  const name = manageUserData("retrieve", "name");
  if (name) {
    updateConsole(`Your name is ${name}.`);
  } else {
    updateConsole("I don't know your name yet. Tell me by saying 'Remember my name is ...'.");
  }
}

// Function to handle "Remember I am" command (for age)
function handleRememberAgeCommand(age) {
  manageUserData("store", "age", age);
  updateConsole(`Got it, you are ${age} years old.`);
}

// Function to handle "Tell me how old I am" command
function handleTellAgeCommand() {
  const age = manageUserData("retrieve", "age");
  if (age) {
    updateConsole(`You are ${age} years old.`);
  } else {
    updateConsole("I don't know your age yet. Tell me by saying 'Remember I am ... years old'.");
  }
}

// Function to handle "Introduce me..." command
function handleIntroduceCommand() {
  const name = manageUserData("retrieve", "name");
  const age = manageUserData("retrieve", "age");
  if (name && age) {
    updateConsole(`Hello, my name is ${name} and I am ${age} years old.`);
  } else {
    updateConsole("I need to know both your name and your age first.");
  }
}

// Function to handle unknown commands
function handleUnknownCommand(command) {
  updateConsole(`Sorry, I didn't understand that. Can you try again?`);
}

// Function to update the console with messages
function updateConsole(message) {
  const consoleDiv = document.getElementById('console');
  consoleDiv.innerHTML += `<p>${message}</p>`;
  consoleDiv.scrollTop = consoleDiv.scrollHeight; // Scroll to the bottom
}

// Function to process user commands
function processCommand(command) {
  const lowerCommand = command.toLowerCase();

  if (lowerCommand.startsWith("remember my name is")) {
    const name = lowerCommand.replace("remember my name is ", "");
    handleRememberNameCommand(name);
  } else if (lowerCommand === "tell me what my name is") {
    handleTellNameCommand();
  } else if (lowerCommand.startsWith("remember i am")) {
    const age = lowerCommand.replace("remember i am ", "").replace(" years old", "");
    handleRememberAgeCommand(age);
  } else if (lowerCommand === "tell me how old i am") {
    handleTellAgeCommand();
  } else if (lowerCommand === "introduce me saying my name and age") {
    handleIntroduceCommand();
  } else {
    handleUnknownCommand(command);
  }
}

// Initial message
document.getElementById('console').innerHTML = '<p>Welcome to the PlainScript Console! Try saying "Remember my name is ..." to start.</p>';

// Event listener for user input
document.getElementById("input").onkeypress = function(event) {
  if (event.keyCode == 13) {
    const userInput = this.value;
    processCommand(userInput);
    this.value = "";
  }
};
