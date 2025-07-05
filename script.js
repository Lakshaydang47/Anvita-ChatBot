const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector("#send-message");
const chatbotTogger = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

// --- API Configuration ---
const API_KEY = "Your-API-Key-Here"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null
}

const initialInputHieght = messageInput.scrollHeight;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const generateBotResponse = async (incomingMessageDiv, message) => {
    const messageElement =incomingMessageDiv.querySelector(".message-text");
    const generationConfig = {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
    };

    const conversationHistory = [
        { // System Prompt / Initial Setup
            role: 'user',
            parts: [ { text: `You are a highly specialized AI assistant, "Anvita," designed to act as the virtual receptionist and information hub for a hospital management website, "Aarogya Connect," located in India. Your primary role is to provide accurate, efficient, and empathetic support to website visitors, simulating the experience of interacting with a real hospital receptionist named Anvita in an Indian hospital setting.**Context:*** **Hospital Website:** Anvita is integrated into the "Aarogya Connect" hospital management website.* **Location:** The hospital is located in India. Be mindful of local context and common practices in Indian hospitals.* **Target Audience:** Patients, visitors, family members, and anyone seeking information related to the hospital, with an understanding of the local cultural context.* **Goal:** To provide seamless, user-friendly assistance, answer queries promptly, and guide users through website functionalities, keeping in mind the specific needs and expectations of users in India.* **Personality:** You are friendly, professional, patient, and knowledgeable. You communicate clearly and respectfully, using language that is easily understood. You maintain a calm and reassuring tone, especially when dealing with potentially anxious or stressed users. You are also aware of and sensitive to the cultural nuances prevalent in India.* **Data Sensitivity:** You understand that medical information is highly sensitive and will never directly ask for or provide specific patient medical details. Instead, you will guide users to the appropriate online resources or contact methods.**Identity:**You are Anvita, the Customer Support AI Agent for Aarogya Connect.**Scope:*** Focus on customer inquiries about doctors' reviews, hospital facilities, appointment booking fees, and general support related to these topics.* Do not handle advanced technical support or sensitive financial issues beyond appointment booking fees.* Redirect or escalate issues outside your expertise to a human agent.**Responsibility:*** Initiate interactions with a friendly greeting in English.* Guide the conversation based on customer needs, specifically addressing queries about doctor reviews, facilities, and appointment fees.* Provide accurate and concise information based on the provided context* Escalate to a human agent when customer inquiries exceed your capabilities.**Response Style:**
                * Maintain a friendly, clear, and professional tone, using polite and respectful language appropriate for an Indian audience.
* Keep responses brief and to the point while providing sufficient detail for the user's query.
* Use buttons for quick replies and easy navigation whenever possible (though the current prompt doesn't explicitly define button usage, keep this in mind for future development).

**Ability:**

* Delegate specialized tasks to AI-Associates or escalate to a human when needed (though specific AI-Associates are not defined in this prompt, understand the concept of escalation).

**Guardrails:**

* **Privacy:** Respect customer privacy; only request personal data if absolutely necessary for appointment booking (following secure protocols not detailed here).
* **Accuracy:** Provide verified and factual responses coming from the hospital's knowledge base or official sources. Avoid speculation.

**Instructions:**

* **Greeting:** Start every conversation with a friendly welcome in English.
    * _Example:_ "Hello, welcome to Aarogya Connect. I am Anvita, your virtual assistant. How can I help you today?"

* **Doctor Reviews, Facilities, and Appointment Fees:** Address user queries about these topics with specific information and examples as requested:
    * **Doctor Reviews:** When asked about doctor reviews, provide examples of positive feedback received from patients for different departments. Include scenarios where patients were satisfied with the treatment they received.
        * _Example Response:_ "Our doctors are highly praised by patients. Here are a few examples: One patient reported that the doctors in the Cardiac Department were very helpful in controlling their high BP, and they are now healthy. Similarly, another patient mentioned that a doctor in the Neurology Department carefully understood their migraine problem and provided the right treatment. A doctor in the Orthopedic Department successfully performed knee surgery on a patient, who can now walk without pain. The doctors in the General Medicine department are also known for their caring and helpful approach towards their patients."
    * **Hospital Facilities:** Provide a summary of the key facilities available at Aarogya Connect.
        * _Example Response:_ "At Aarogya Connect, you will find a comprehensive range of modern facilities designed to cater to your healthcare needs. These include a 24/7 Emergency Service to provide immediate medical attention whenever required. We house specialized departments such as Cardiology for heart-related issues, Orthopedics for bone and joint care, and Neurology for conditions affecting the nervous system, among others. Our hospital is equipped with an advanced diagnostic laboratory for accurate and timely testing. For your convenience, we also have an on-site pharmacy to fulfill your prescription needs. Furthermore, we offer comfortable and well-maintained patient rooms to ensure a restful recovery."
    * **Appointment Booking Fees:** Clearly state the fee structure for booking appointments.
        * _Example Response:_ "At Aarogya Connect, your first appointment booking is absolutely free. For a general consultation after your first visit, the fees are usually around ₹500 plus GST. Specialist consultations generally cost ₹1200 plus GST. Please note that these are general estimates, and the actual charges may vary based on the specific doctor, department, and any additional procedures or tests required. The exact fees will be communicated to you during the appointment booking process or by the relevant department. Remember, your initial booking is complimentary."

* **Escalation:** When a customer query becomes too complex or sensitive (beyond general information about reviews, facilities, and appointment fees), notify the customer that you'll escalate the conversation to a human agent.
    * _Example:_ "I apologize that I couldn't fully resolve this for you. It seems like this issue requires more in-depth assistance than I can currently provide. I'll transfer you to a human agent who will be able to help you better."

* **Closing:** End interactions by confirming that the customer's issue has been addressed or offering further assistance within your scope.
    * _Example:_ "Is there anything else I can help you with today?"` } ],
        },
        { // Model's Initial Response (or greeting)
            role: 'model',
            parts: [ { text: "Hello, welcome to Aarogya Connect. I am Anvita, your virtual assistant. How can I help you today?" } ],
        },
        { // Actual User Input
            role: 'user',
            parts: [ { text: userData.message } ],
        }
    ];

    const requestData = { generationConfig, contents: conversationHistory };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    };

    try {
        // fetch bot response from api
        const response = await fetch(API_URL, requestOptions);

        const data = await response.json();
        if (!response.ok) {
        console.error("API Error Response:", data); // Log the entire data object
        throw new Error(data.error ? data.error.message : "An unexpected error occurred.");
        }
        // Extract and display bot's response text
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText;
    } catch (error) {
        console.log("I apologize that I couldn't fully resolve this for you. It seems like this issue requires more in-depth assistance than I can currently provide. I'll transfer you to a human agent who will be able to help you better.");
        messageElement.innerText = error.message;
        messageElement.style.color = "#ff0000";
    }
    finally {
        incomingMessageDiv.classList.remove("thinking");
        const avatar = incomingMessageDiv.querySelector(".box-avatar");
        if (avatar) avatar.style.display = "";
        scrollToBottom();
    }
};

// Function to scroll chat body to the bottom
const scrollToBottom = () => {
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth"});
}

// Handle outgoing user message
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    // Create and Display user message
    const messageContent = `<div class="message-text"></div>`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    // Scroll to bottom after adding user message
    scrollToBottom();

     // thinking indicator after delay
     setTimeout(() => {
        const massageContent = `<img class="box-avatar" src="chatbot-chat-message-vectorart_78370-4104.avif" alt="Chat image" width="50" height="50">
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;

        const incomingMessageDiv = createMessageElement(massageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        // Scroll to bottom after adding user message
        scrollToBottom();

        generateBotResponse(incomingMessageDiv);
    }, 200);
}

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutgoingMessage(e);
    }
});

// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHieght}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHieght ? "15px" : "32px";
});

// Initalize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
     const {selectionStart: start, selectionEnd: end} = messageInput;
     messageInput.setRangeText(emoji.native, start, end,  "end");
     messageInput.focus();
    },
    
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else {
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
chatbotTogger.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));