import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useAssistantStore } from '../../stores/assistantStore';
import Avatar from './Avatar';
import ChatPanel from './ChatPanel';

const AssistantWidget = () => {
    const { isOpen, isMinimized, toggleOpen, close, toggleMinimize } = useAssistantStore();

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={toggleOpen}
                        className="fixed bottom-6 right-6 z-50 shadow-2xl hover:shadow-glow transition-all duration-300 rounded-full"
                    >
                        <Avatar />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? '80px' : '600px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-linear-to-r from-primary-600 to-accent-600">
                            <div className="flex items-center space-x-3">
                                <Avatar />
                                <div className="text-white">
                                    <h3 className="font-semibold">AI Assistant</h3>
                                    <p className="text-xs text-primary-100">Always here to help</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={toggleMinimize}
                                    className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                                >
                                    {isMinimized ? <Maximize2 size={18} /> : <Minus size={18} />}
                                </button>
                                <button
                                    onClick={close}
                                    className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Content */}
                        {!isMinimized && (
                            <div className="flex-1 overflow-hidden">
                                <ChatPanel />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AssistantWidget;
