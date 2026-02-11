import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useAssistantStore } from '../../stores/assistantStore';

const Avatar = () => {
    const { avatarState } = useAssistantStore();

    const getAvatarAnimation = () => {
        switch (avatarState) {
            case 'listening':
                return {
                    scale: [1, 1.1, 1],
                    transition: { duration: 1, repeat: Infinity },
                };
            case 'thinking':
                return {
                    rotate: [0, 360],
                    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
                };
            case 'speaking':
                return {
                    scale: [1, 1.05, 1, 1.05, 1],
                    transition: { duration: 0.8, repeat: Infinity },
                };
            default:  // idle
                return {
                    scale: [1, 1.02, 1],
                    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                };
        }
    };

    return (
        <div className="relative w-16 h-16">
            {/* Main Avatar Circle */}
            <motion.div
                animate={getAvatarAnimation()}
                className="w-full h-full bg-linear-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center shadow-lg"
            >
                <span className="text-white text-2xl font-bold">AI</span>
            </motion.div>

            {/* State Indicators */}
            {avatarState === 'listening' && (
                <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-primary-400 rounded-full"
                />
            )}

            {avatarState === 'speaking' && (
                <div className="absolute -right-1 -bottom-1">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    />
                </div>
            )}

            {avatarState === 'thinking' && (
                <div className="absolute -right-1 -bottom-1">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white animate-pulse" />
                </div>
            )}
        </div>
    );
};

export default Avatar;
