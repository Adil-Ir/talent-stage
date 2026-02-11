import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { useAssistantStore } from '../../stores/assistantStore';
import { useRecruitmentStore } from '../../stores/recruitmentStore';
import { formatDateTime } from '../../utils/helpers';
import Button from '../ui/Button';

const ChatPanel = () => {
    const { messages, addMessage, processCommand, avatarState, startListening, stopListening, startSpeaking, stopSpeaking } = useAssistantStore();
    const recruitmentStore = useRecruitmentStore();
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const messagesEndRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;

            recognitionInstance.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                stopListening();
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                stopListening();
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
                stopListening();
            };

            setRecognition(recognitionInstance);
        }

        // Cleanup on unmount
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Stop any current speech when sending a new message
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            stopSpeaking();
        }

        addMessage('user', input);
        const userInput = input;
        setInput('');

        await processCommand(userInput, recruitmentStore);
    };

    const toggleVoiceInput = () => {
        if (!recognition) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            try {
                recognition.stop();
            } catch (err) {
                console.error('Error stopping recognition:', err);
            }
            setIsListening(false);
            stopListening();
        } else {
            // Stop TTS if it's playing
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                stopSpeaking();
            }

            try {
                recognition.start();
                setIsListening(true);
                startListening();
            } catch (err) {
                console.error('Error starting recognition:', err);
            }
        }
    };

    const toggleSpeakMessage = (text) => {
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                stopSpeaking();
            } else {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.onstart = () => startSpeaking();
                utterance.onend = () => stopSpeaking();
                utterance.onerror = () => stopSpeaking();
                window.speechSynthesis.speak(utterance);
            }
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`rounded-2xl px-4 py-2 ${message.role === 'user'
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                                }`}>
                                <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-2">
                                {formatDateTime(message.timestamp)}
                            </p>

                            {/* Suggested Actions */}
                            {message.suggestedActions && message.suggestedActions.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    {message.suggestedActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInput(action.label)}
                                            className="block w-full text-left px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Speaker Icon for Assistant Messages */}
                            {message.role === 'assistant' && (
                                <button
                                    onClick={() => toggleSpeakMessage(message.content)}
                                    className="mt-1 text-xs text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                                >
                                    <span>{avatarState === 'speaking' ? '⏹ Stop' : '🔊 Play'}</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            disabled={avatarState === 'thinking'}
                        />
                        {avatarState === 'thinking' && (
                            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" size={20} />
                        )}
                    </div>

                    <button
                        onClick={toggleVoiceInput}
                        className={`p-2 rounded-lg transition-colors ${isListening
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || avatarState === 'thinking'}
                        size="md"
                    >
                        <Send size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
