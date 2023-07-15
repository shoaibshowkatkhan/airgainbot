// Function to handle paper clip button click
function openFileInput() {
    // Get the previous user input
    var previousInput = document.getElementById("userInput").value;

    // Append the previous input to the chat window
    if (previousInput) {
        var chatBody = document.querySelector(".card-body");

        var userMessageContainer = document.createElement("div");
        userMessageContainer.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4");

        var userMessageTextContainer = document.createElement("div");
        var userMessageText = document.createElement("p");
        userMessageText.classList.add("small", "p-2", "me-3", "mb-1", "text-white", "rounded-3", "bg-primary");
        userMessageText.textContent = previousInput;
        userMessageTextContainer.appendChild(userMessageText);

        var userMessageImage = document.createElement("img");
        userMessageImage.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp";
        userMessageImage.alt = "User Avatar";
        userMessageImage.style.width = "45px";
        userMessageImage.style.height = "100%";

        userMessageContainer.appendChild(userMessageTextContainer);
        userMessageContainer.appendChild(userMessageImage);

        chatBody.appendChild(userMessageContainer);
    }

    // Trigger the file input
    document.getElementById("fileInput").click();
}

// Function to handle sending user message to API
function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    var chatBody = document.querySelector(".card-body");

    // User message
    var userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4");

    var userMessageTextContainer = document.createElement("div");
    var userMessageText = document.createElement("p");
    userMessageText.classList.add("small", "p-2", "me-3", "mb-1", "text-white", "rounded-3", "bg-primary");
    userMessageText.textContent = userInput;
    userMessageTextContainer.appendChild(userMessageText);

    var userMessageImage = document.createElement("img");
    userMessageImage.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp";
    userMessageImage.alt = "User Avatar";
    userMessageImage.style.width = "45px";
    userMessageImage.style.height = "100%";

    userMessageContainer.appendChild(userMessageTextContainer);
    userMessageContainer.appendChild(userMessageImage);

    // Append user message to chat body
    chatBody.appendChild(userMessageContainer);

    document.getElementById("userInput").value = "";
}

// Function to remove follow-up questions from the chat window
function removeFollowUpQuestions(response) {
    const startIndex = response.indexOf("Follow-up Questions:");
    if (startIndex !== -1) {
        response = response.slice(0, startIndex);
    }
    return response.trim();
}

// Updated sendMessage function to handle API response
function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    var chatBody = document.querySelector(".card-body");

    // User message
    var userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4");

    var userMessageTextContainer = document.createElement("div");
    var userMessageText = document.createElement("p");
    userMessageText.classList.add("small", "p-2", "me-3", "mb-1", "text-white", "rounded-3", "bg-primary");
    userMessageText.textContent = userInput;
    userMessageTextContainer.appendChild(userMessageText);

    var userMessageImage = document.createElement("img");
    userMessageImage.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp";
    userMessageImage.alt = "User Avatar";
    userMessageImage.style.width = "45px";
    userMessageImage.style.height = "100%";

    userMessageContainer.appendChild(userMessageTextContainer);
    userMessageContainer.appendChild(userMessageImage);

    // Append user message to chat body
    chatBody.appendChild(userMessageContainer);

    // Send user message to API
    fetch("https://revaibotqna-batchfunc.azurewebsites.net/api/ApiQnA", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userInput })
    })
        .then(response => response.json())
        .then(data => {
            // Check if response contains a system response
            if (data && data.response) {
                // Remove everything after opening square bracket [
                var systemResponse = data.response.replace(/\[.*/gm, '').trim();

                // Remove follow-up questions text
                systemResponse = removeFollowUpQuestions(systemResponse);

                // System response
                var systemResponseContainer = document.createElement("div");
                systemResponseContainer.classList.add("d-flex", "flex-row", "justify-content-start", "mb-4");

                var systemResponseImage = document.createElement("img");
                systemResponseImage.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp";
                systemResponseImage.alt = "System Avatar";
                systemResponseImage.style.width = "45px";
                systemResponseImage.style.height = "100%";

                var systemResponseTextContainer = document.createElement("div");
                var systemResponseText = document.createElement("p");
                systemResponseText.classList.add("small", "p-2", "ms-3", "mb-1", "rounded-3");
                systemResponseText.style.backgroundColor = "#f5f6f7";
                systemResponseText.textContent = systemResponse;

                systemResponseTextContainer.appendChild(systemResponseText);
                systemResponseContainer.appendChild(systemResponseImage);
                systemResponseContainer.appendChild(systemResponseTextContainer);

                // Append system response to chat body
                chatBody.appendChild(systemResponseContainer);
            }
        })
        .catch(error => console.log(error));

    document.getElementById("userInput").value = "";
}
