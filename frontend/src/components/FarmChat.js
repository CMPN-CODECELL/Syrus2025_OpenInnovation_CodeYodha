import React, { useState, useEffect, useRef } from "react";

// CSS is included as a style tag that would typically be in a separate CSS file
// but is shown here for a complete single-file solution
const styles = `
/* Farm Chat Styles */
.farm-chat-container {
  max-width: 600px;
  margin: 80px auto 20px;
  padding: 20px;
  background: #E8ECD7;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(31, 69, 41, 0.2);
  text-align: center;
  font-family: "Poppins", sans-serif;
  border: 2px solid #47663B;
}

/* Chat Titles */
.farm-chat-title {
  font-size: 24px;
  font-weight: bold;
  color: #1F4529;
  margin-bottom: 5px;
}

.farm-chat-subtitle {
  font-size: 14px;
  color: #47663B;
  margin-bottom: 15px;
}

/* Chat Type Selector */
.farm-chat-type-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.farm-chat-type-selector button {
  background: #47663B;
  color: #E8ECD7;
  padding: 10px 18px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin: 0 5px;
  transition: 0.3s;
  font-weight: 500;
}

.farm-chat-type-selector button:hover {
  background: #1F4529;
  transform: translateY(-2px);
}

.farm-chat-type-selector button.active {
  background: #1F4529;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(31, 69, 41, 0.3);
}

/* Chat Box */
.farm-chat-box {
  height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  padding: 15px;
  background: rgba(232, 236, 215, 0.7);
  box-shadow: inset 0 2px 4px rgba(31, 69, 41, 0.2);
  text-align: left;
  display: flex;
  flex-direction: column;
  border: 1px solid #47663B;
}

/* Empty chat state */
.farm-chat-empty {
  color: #47663B;
  text-align: center;
  margin: auto;
  font-style: italic;
  padding: 20px;
  background: rgba(238, 211, 177, 0.3);
  border-radius: 8px;
  max-width: 80%;
}

/* Chat Messages */
.farm-chat-message {
  padding: 10px 14px;
  margin: 8px 0;
  border-radius: 8px;
  font-size: 14px;
  position: relative;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.4;
}

.farm-chat-message.farmer {
  background-color: #EED3B1;
  color: #1F4529;
  align-self: flex-end;
  border-bottom-right-radius: 0;
  margin-left: auto;
  border: 1px solid rgba(31, 69, 41, 0.2);
}

.farm-chat-message.agronomist {
  background-color: #47663B;
  color: #E8ECD7;
  align-self: flex-start;
  border-bottom-left-radius: 0;
  margin-right: auto;
}

.farm-chat-message.network-farmer {
  background-color: #1F4529;
  color: #E8ECD7;
  align-self: flex-start;
  border-bottom-left-radius: 0;
  margin-right: auto;
}

.farm-chat-message .farmer-name {
  font-weight: bold;
  color: #EED3B1;
  margin-right: 5px;
}

/* Timestamp */
.farm-timestamp {
  display: block;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  text-align: right;
}

.farm-chat-message.farmer .farm-timestamp {
  color: rgba(31, 69, 41, 0.7);
}

/* Chat Input */
.farm-chat-input {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.farm-chat-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #47663B;
  border-radius: 5px;
  font-size: 14px;
  margin-right: 10px;
  background-color: #E8ECD7;
  color: #1F4529;
}

.farm-chat-input input:focus {
  outline: none;
  border: 1px solid #1F4529;
  box-shadow: 0 0 4px rgba(31, 69, 41, 0.3);
}

.farm-chat-input input::placeholder {
  color: #47663B;
  opacity: 0.7;
}

.farm-chat-input button {
  background-color: #1F4529;
  color: #E8ECD7;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.farm-chat-input button:hover {
  background-color: #47663B;
  transform: translateY(-2px);
}

.button-text {
  display: inline-block;
  font-weight: 500;
}

.button-icon {
  display: inline-block;
  font-size: 16px;
  transition: transform 0.3s;
}

.farm-chat-input button:hover .button-icon {
  transform: translateX(3px);
}

/* Topic label */
.topic-label {
  background-color: rgba(31, 69, 41, 0.1);
  color: #1F4529;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-block;
  margin: 10px auto;
  align-self: center;
}

/* Scrollbar */
.farm-chat-box::-webkit-scrollbar {
  width: 6px;
}

.farm-chat-box::-webkit-scrollbar-track {
  background: rgba(232, 236, 215, 0.5);
  border-radius: 10px;
}

.farm-chat-box::-webkit-scrollbar-thumb {
  background: #47663B;
  border-radius: 10px;
}

.farm-chat-box::-webkit-scrollbar-thumb:hover {
  background: #1F4529;
}
`;

const FarmChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatType, setChatType] = useState("agronomist"); // Default chat type
  const chatBoxRef = useRef(null);

  // AI Agronomist Responses
  const getAgronomistResponse = (message) => {
    const responses = {
      "What crops grow best in clay soil?": "Clay soil is good for wheat, corn, millet, and many vegetables like cabbage and broccoli. These crops do well in clay's moisture-retentive properties.",
      "When should I plant tomatoes?": "Tomatoes should be planted after the last frost date in your area, typically when soil temperatures reach at least 60°F (16°C).",
      "How do I deal with aphids?": "For aphids, try introducing natural predators like ladybugs, using neem oil spray, or a mild soap solution. For severe infestations, organic insecticides can be considered.",
      "How often should I water my crops?": "Watering frequency depends on your soil type, crop, and climate. Generally, deep watering 1-2 times per week is better than frequent shallow watering.",
      "What's crop rotation?": "Crop rotation is the practice of growing different types of crops in the same area across sequential seasons. It helps prevent soil depletion and reduces pest and disease problems.",
      "Best organic fertilizers?": "Great organic fertilizers include compost, aged manure, fish emulsion, seaweed extract, and bone meal. Each provides different nutrients to support plant health naturally.",
      "How do I test soil pH?": "You can test soil pH with a commercial test kit from garden centers, using a digital pH meter, or sending a sample to your local agricultural extension office for detailed analysis.",
      "When to harvest winter squash?": "Harvest winter squash when the rind is hard and cannot be pierced with a fingernail, the stems begin to dry, and the squash has reached its mature color.",
      "How to prevent tomato blight?": "Prevent tomato blight by spacing plants for good air circulation, using mulch to prevent soil splash, watering at the base, rotating crops, and using resistant varieties when available.",
      "Best cover crops for winter?": "Good winter cover crops include winter rye, hairy vetch, crimson clover, and winter wheat. They protect soil, add organic matter, and some fix nitrogen.",
      "Natural ways to control weeds?": "Natural weed control includes mulching, hand weeding, hoeing, planting cover crops, crop rotation, and using landscape fabric. Vinegar-based herbicides can work for small areas.",
      "Signs of nutrient deficiency in plants?": "Common signs include yellowing leaves (nitrogen), purple leaves (phosphorus), brown leaf edges (potassium), or stunted growth. Different deficiencies show in distinct patterns on leaves.",
      "How to start a compost pile?": "Start composting by layering green materials (kitchen scraps, fresh grass) with brown materials (dry leaves, straw) in a bin or pile. Keep moist but not soggy and turn regularly.",
      "Best time to prune fruit trees?": "Prune most fruit trees during late winter dormancy before spring growth begins. This minimizes stress and disease risk while allowing you to see the branch structure clearly.",
      "How to grow garlic?": "Plant garlic cloves in fall, 4-6 weeks before ground freezes, with pointed end up, 2 inches deep, and 4-6 inches apart. Mulch well and harvest when lower leaves begin to brown.",
    };
    return responses[message] || "I'm your farming advisor! Please provide more details about your farming question.";
  };

  // Sample farmer network conversation
  const farmerNetworkConversation = [
    {
      text: "Has anyone tried companion planting tomatoes with basil? I've heard it helps with pest control.",
      sender: "network-farmer",
      farmerName: "Sarah",
      timestamp: "9:14 AM"
    },
    {
      text: "Yes! I've been doing it for years. The basil really does seem to repel tomato hornworms and some other pests. Plus they taste great together in the kitchen!",
      sender: "network-farmer",
      farmerName: "Miguel",
      timestamp: "9:18 AM"
    },
    {
      text: "I do the same but also add marigolds around the perimeter. Creates a good defensive barrier against nematodes.",
      sender: "network-farmer",
      farmerName: "Priya",
      timestamp: "9:22 AM"
    },
    {
      text: "I've been considering raised beds for my tomatoes this year. Anyone have experience with how much soil depth I need?",
      sender: "network-farmer",
      farmerName: "Sarah",
      timestamp: "9:30 AM"
    },
    {
      text: "For tomatoes, I'd recommend at least 12 inches, but 18-24 is better if you can manage it. They have deep roots.",
      sender: "network-farmer",
      farmerName: "John",
      timestamp: "9:34 AM"
    },
    {
      text: "Agreed with John. I started with 12-inch beds and wished I'd gone deeper. Also, make sure you have good drainage!",
      sender: "network-farmer",
      farmerName: "Miguel", 
      timestamp: "9:40 AM"
    },
    {
      text: "Has anyone tried using coffee grounds in their soil? I have a local café willing to give me their used grounds.",
      sender: "network-farmer",
      farmerName: "Priya",
      timestamp: "9:45 AM"
    },
    {
      text: "Coffee grounds are great! I mix them into my compost. They're slightly acidic, so good for tomatoes, blueberries, and azaleas. Don't use too much at once though.",
      sender: "network-farmer",
      farmerName: "John",
      timestamp: "9:48 AM"
    }
  ];

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { 
        text: input, 
        sender: "farmer", 
        timestamp: new Date().toLocaleTimeString() 
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Simulate agronomist response if the user selects "Ask an Agronomist"
      if (chatType === "agronomist") {
        setTimeout(() => {
          const botResponse = {
            text: getAgronomistResponse(input),
            sender: "agronomist",
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
      }
      
      setInput("");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Load farmer network conversation when switching to that chat type
  useEffect(() => {
    if (chatType === "farmer-network") {
      setMessages(farmerNetworkConversation);
    } else {
      setMessages([]);
    }
  }, [chatType]);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Include the styles in the component */}
      <style>{styles}</style>
      
      <div className="farm-chat-container">
        <h2 className="farm-chat-title">Farming Community Chat</h2>
        <p className="farm-chat-subtitle">Choose your assistance type</p>
        
        {/* Chat Type Selection */}
        <div className="farm-chat-type-selector">
          <button
            className={chatType === "agronomist" ? "active" : ""}
            onClick={() => setChatType("agronomist")}
          >
            Ask an Agronomist
          </button>
          <button
            className={chatType === "farmer-network" ? "active" : ""}
            onClick={() => setChatType("farmer-network")}
          >
            Farmer Network
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="farm-chat-box">
          {chatType === "farmer-network" && messages.length > 0 && (
            <div className="topic-label">Topic: Companion Planting & Garden Soil</div>
          )}
          
          {messages.length === 0 ? (
            <div className="farm-chat-empty">
              {chatType === "agronomist" 
                ? "Ask our agricultural expert about crops, soil, pests, or farming techniques" 
                : "Connect with other farmers to share experiences and advice"}
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`farm-chat-message ${msg.sender}`}>
                {msg.sender === "farmer" ? (
                  <strong>You: </strong>
                ) : chatType === "agronomist" ? (
                  <strong>Agronomist: </strong>
                ) : (
                  <span className="farmer-name">{msg.farmerName}: </span>
                )}
                {msg.text}
                <span className="farm-timestamp">{msg.timestamp}</span>
              </div>
            ))
          )}
          <div ref={chatBoxRef} />
        </div>
        
        {/* Chat Input */}
        <div className="farm-chat-input">
          <input
            type="text"
            placeholder={chatType === "agronomist" 
              ? "Ask about crops, soil, or farming techniques..." 
              : "Join the conversation with other farmers..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>
            <span className="button-text">Send</span>
            <span className="button-icon">→</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FarmChat;