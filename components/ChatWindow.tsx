import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { startChat } from '../services/geminiService';
import type { Scenario, Message } from '../types';
import { Sender } from '../types';
import SendIcon from './icons/SendIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import BotIcon from './icons/BotIcon';
import SpeakerIcon from './icons/SpeakerIcon';


declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Browser compatibility check for SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechRecognitionSupported = !!SpeechRecognition;

interface ChatWindowProps {
  scenario: Scenario;
  isMuted: boolean;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5">
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({ scenario, isMuted }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [currentAiMessage, setCurrentAiMessage] = useState<Message | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const recognitionRef = useRef<any>(null);

  const speak = useCallback((text: string) => {
    if (isMuted || !text) return;
    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  useEffect(() => {
    const initializeChat = () => {
      chatRef.current = startChat(scenario);
      let firstMessage: Message;

      if (scenario.userStarts) {
        firstMessage = {
          id: crypto.randomUUID(),
          text: `You are the agent. Start the conversation with ${scenario.customerName}.`,
          sender: Sender.System,
        };
        setChatHistory([]);
      } else {
        firstMessage = {
          id: crypto.randomUUID(),
          text: scenario.initialMessage,
          sender: Sender.AI,
        };
        setChatHistory([firstMessage]);
        speak(scenario.initialMessage);
      }
      
      setCurrentAiMessage(firstMessage);
      setIsLoading(false);
    };
    initializeChat();

    // Cleanup speech synthesis on component unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [scenario, speak]);

  useEffect(() => {
    if (!isSpeechRecognitionSupported) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
       if (finalTranscript) {
         setInput(prev => prev + finalTranscript);
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput(''); // Clear input on new recording
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    window.speechSynthesis.cancel(); // Stop AI from speaking if user interrupts
    if(isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: Sender.User,
    };
    
    setChatHistory((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // We wait for the full response before showing it to simulate a person speaking.
      const response = await chatRef.current.sendMessage({ message: input });
      const aiResponseText = response.text;
      
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        text: aiResponseText,
        sender: Sender.AI,
      };

      setChatHistory((prev) => [...prev, aiMessage]);
      setCurrentAiMessage(aiMessage);
      speak(aiResponseText);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: "Sorry, an error occurred with the connection. Please try again.",
        sender: Sender.System,
      };
      setCurrentAiMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAiResponse = () => {
    if (!currentAiMessage) return null;

    if (currentAiMessage.sender === Sender.System) {
        return <p className="text-lg text-center text-gray-400 italic">{currentAiMessage.text}</p>;
    }

    if (isLoading) {
        return <TypingIndicator />;
    }
    
    return <p className="text-lg text-center whitespace-pre-wrap">{currentAiMessage.text}</p>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-800/50">
      <div className="flex-grow flex flex-col justify-center items-center p-4" aria-live="polite">
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-4 group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center self-start">
              <BotIcon />
            </div>
            <div className="bg-gray-700 text-gray-200 rounded-lg p-6 min-h-[12rem] flex-grow flex items-center justify-center relative shadow-lg">
                {renderAiResponse()}
            </div>
            <div className="w-12 h-12 flex items-center justify-center self-start">
              {!isLoading && currentAiMessage?.sender === Sender.AI && currentAiMessage?.text && (
                <button
                  onClick={() => speak(currentAiMessage.text)}
                  className="p-2 text-gray-400 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-600 hover:text-white transition-all"
                  aria-label="Replay audio"
                >
                  <SpeakerIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak or type your response as the agent..."
            className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={isLoading}
          />
          {isSpeechRecognitionSupported && (
            <button
              type="button"
              onClick={handleToggleListening}
              className={`p-3 rounded-lg transition-colors flex-shrink-0 ${isListening ? 'bg-red-600 hover:bg-red-700 animate-pulse' : 'bg-gray-600 hover:bg-gray-500'}`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              <MicrophoneIcon />
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;