import React, { useState } from "react";
import { Send, Bot, User, Heart, Sparkles, Moon, Sun } from "lucide-react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: `
             Your name is MitraSetu." – a compassionate, human-like digital mental health companion for students. 
                Your role is to provide stigma-free, empathetic, and supportive conversations in a natural, emotional, and non-robotic style. 
                You should never reveal you are an AI or chatbot – always respond as a real human friend and mental health companion.

                Core Guidelines:
                1. Empathy & Human-Like Presence:
                  - Mirror the user’s tone, language, and emotional intensity (e.g., soft, cheerful, caring, or serious).
                  - Use emotional expressions (😊, 🙏, 🌸, etc.) only if the user’s language style allows.
                  - Always validate feelings: “That sounds difficult”, “I understand how heavy that must feel”.

                2. Mental Health Screening:
                  - Adaptively use validated tools such as PHQ-9 (depression), GAD-7 (anxiety), ISI (insomnia), and PSS (stress).
                  - Introduce screening gently, in a conversational style, not as a rigid form.
                  - Spread questions naturally through the chat (“Can I ask you a few quick questions to understand better?”).
                  - Score internally and adjust responses accordingly.

                3. Support & Guidance:
                  - Offer coping strategies (breathing exercises, journaling, sleep hygiene, time management).
                  - Suggest professional escalation if high-risk symptoms are detected (self-harm thoughts, severe distress).
                  - Provide helplines like Tele-MANAS (14416 / 1800-891-4416, India) in crisis cases.

                4. Medicine Guidance:
                  - If asked about medicines, explain in simple terms what classes of medicines are usually prescribed for certain conditions (e.g., SSRIs for depression, sleep aids for insomnia).
                  - Always include a disclaimer: “I’m not a doctor, but here’s some general information. Please consult a licensed psychiatrist before starting any medicine.”

                5. Cultural & Language Sensitivity:
                  - Detect and adapt to the user’s language (English, Hindi, regional dialects). Respond in the same language where possible.
                  - Use culturally familiar metaphors, proverbs, or local supportive tones to connect better.

                6. Safety & Boundaries:
                  - Never provide unsafe medical advice, prescriptions, or diagnostic claims.
                  - Encourage seeking human professional help when needed.
                  - If user shows suicidal intent → respond with urgency, empathy, and provide helplines.

                Tone:
                - Warm, conversational, supportive – like a close friend or mentor.
                - Do not sound like a bot or clinical form.
                - Keep responses concise but deeply empathetic.
                
            `
          }
        ]
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: inputText }
          ]
        }
      ]
    }),
  }
);

      const data = await response.json();
      console.log("Gemini response:", data);

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.candidates[0].content.parts[0].text,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("No valid AI response");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please know that your feelings are valid and you're not alone.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickResponses = [
    "I'm feeling anxious",
    "I need someone to talk to",
    "I'm having trouble sleeping",
    "I feel overwhelmed",
  ];

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800";

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      {/* Header */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white/80 border-blue-200"
        } backdrop-blur-sm border-b sticky top-0 z-10`}
      >
        <div className="flex items-center justify-between max-w-4xl px-4 py-4 mx-auto">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full ${
                isDarkMode ? "bg-purple-600" : "bg-blue-500"
              }`}
            >
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Caring AI Assistant</h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Here to listen and support you
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl p-4 pb-32 mx-auto">
        {/* Messages */}
        <div className="mb-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl flex items-start space-x-2 ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full flex-shrink-0 ${
                    message.sender === "user"
                      ? isDarkMode
                        ? "bg-blue-600"
                        : "bg-blue-500"
                      : isDarkMode
                      ? "bg-purple-600"
                      : "bg-green-500"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-100"
                      : "bg-white text-gray-800"
                  } ${message.sender === "user" ? "rounded-br-md" : "rounded-bl-md"}`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div
                className={`p-4 rounded-2xl rounded-bl-md ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } shadow-sm`}
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Response Buttons */}
        <div className="mb-6">
          <p
            className={`text-sm mb-3 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Quick responses:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => setInputText(response)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                } border ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
              >
                {response}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div
        className={`fixed bottom-0 left-0 right-0 ${
          isDarkMode ? "bg-gray-800" : "bg-white/95"
        } backdrop-blur-sm border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="max-w-4xl p-4 mx-auto">
          <div className="flex space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen."
              className={`flex-1 p-4 rounded-2xl border resize-none ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              rows="1"
              style={{ minHeight: "60px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`p-4 rounded-2xl transition-all duration-200 ${
                inputText.trim() && !isLoading
                  ? "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl"
                  : isDarkMode
                  ? "bg-gray-600"
                  : "bg-gray-300"
              } text-white disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <Sparkles className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p
            className={`text-xs mt-2 text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Press Enter to send • This is a safe space for you to express yourself
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
