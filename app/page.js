'use client';

import { useState, useRef, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hey, I'm Max.Ai — how can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');

    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
    }, 500);
  };

  const generateResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // Voice commands
    if (lowerMsg.includes('open youtube')) {
      setTimeout(() => window.open('https://youtube.com', '_blank'), 500);
      return "Opening YouTube for you! 🎥";
    }
    if (lowerMsg.includes('open google')) {
      setTimeout(() => window.open('https://google.com', '_blank'), 500);
      return "Opening Google! 🔍";
    }
    if (lowerMsg.includes('open github')) {
      setTimeout(() => window.open('https://github.com', '_blank'), 500);
      return "Opening GitHub! 💻";
    }

    // Coding help
    if (lowerMsg.includes('code') || lowerMsg.includes('programming') || lowerMsg.includes('debug')) {
      return "I'd love to help with coding! Whether you need help debugging, writing clean code, or learning a new language, just share what you're working on. I support Python, JavaScript, Java, C++, and more! 💻";
    }

    // Writing help
    if (lowerMsg.includes('write') || lowerMsg.includes('essay') || lowerMsg.includes('caption') || lowerMsg.includes('story')) {
      return "I'm great at writing! Need an essay, caption, story, or any text? Tell me the topic and style you want, and I'll craft something amazing for you. ✍️";
    }

    // Study help
    if (lowerMsg.includes('study') || lowerMsg.includes('learn') || lowerMsg.includes('explain') || lowerMsg.includes('teach')) {
      return "I'm here to help you learn! Ask me to explain any topic, break down complex concepts, or guide you through your studies. What would you like to understand better? 📚";
    }

    // Productivity
    if (lowerMsg.includes('task') || lowerMsg.includes('organize') || lowerMsg.includes('productivity') || lowerMsg.includes('schedule')) {
      return "Let's boost your productivity! I can help you organize tasks, create schedules, set priorities, and manage your time effectively. What do you need help with? 📋";
    }

    // Creative ideas
    if (lowerMsg.includes('idea') || lowerMsg.includes('creative') || lowerMsg.includes('brainstorm')) {
      return "I love brainstorming! Whether it's for a project, business, content creation, or anything creative, I'm here to spark ideas. What are you working on? 💡";
    }

    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hey there! Great to see you! What can I help you with today? 😊";
    }

    // About Max.Ai
    if (lowerMsg.includes('who are you') || lowerMsg.includes('what are you') || lowerMsg.includes('tell me about yourself')) {
      return "I'm Max.Ai, your smart companion created by Aryan Singh! I can help with answering questions, coding, writing, learning, task management, and creative thinking. Think of me as your all-in-one assistant! 🤖✨";
    }

    // Thank you
    if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
      return "You're very welcome! Happy to help anytime! 😊";
    }

    // Default response
    return "That's an interesting question! I'm here to help with coding, writing, learning, tasks, creative ideas, and much more. Could you tell me more about what you need? 🌟";
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice recognition is not supported in your browser. Please try Chrome or Edge.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <div className="logo-icon">M</div>
          <div>
            <h1>Max.Ai</h1>
            <p className="tagline">Your smart companion for everything</p>
          </div>
        </div>
        <div className="creator">Created by Aryan Singh</div>
      </div>

      <div className="capabilities">
        <div className="capability">💬 Answer Questions</div>
        <div className="capability">💻 Code & Debug</div>
        <div className="capability">✍️ Write & Edit</div>
        <div className="capability">📚 Study & Learn</div>
        <div className="capability">📋 Manage Tasks</div>
        <div className="capability">💡 Creative Ideas</div>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              <div className="message-content">
                {msg.type === 'ai' && <span className="avatar">M</span>}
                <span className="text">{msg.text}</span>
                {msg.type === 'user' && <span className="avatar user-avatar">U</span>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything... (Try: 'open YouTube' or 'help me code')"
            rows="1"
          />
          <button
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceInput}
            title="Voice input"
          >
            🎤
          </button>
          <button onClick={handleSend} className="send-btn">
            Send →
          </button>
        </div>
      </div>

      <div className="footer">
        <p>Try commands like: "open YouTube" • "help me code" • "write an essay" • "explain quantum physics"</p>
      </div>
    </div>
  );
}
