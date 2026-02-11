import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, FileText, Award, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import { capabilitiesData } from '../../data/mockData';

const iconMap = {
    Users,
    FileText,
    Award,
    Calendar,
    TrendingUp,
    MessageCircle,
};

const Capabilities = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % capabilitiesData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + capabilitiesData.length) % capabilitiesData.length);
    };

    return (
        <section id="features" ref={ref} className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Powerful AI Capabilities
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        TalentSage combines cutting-edge AI technology with intuitive design to revolutionize your recruitment process.
                    </p>
                </motion.div>

                {/* 3D Carousel */}
                <div className="relative max-w-6xl mx-auto">
                    <div className="relative h-125 flex items-center justify-center perspective-1000">
                        {capabilitiesData.map((capability, index) => {
                            const Icon = iconMap[capability.icon];
                            const offset = index - activeIndex;
                            const absOffset = Math.abs(offset);

                            return (
                                <motion.div
                                    key={capability.id}
                                    className="absolute w-full max-w-md"
                                    animate={{
                                        x: typeof window !== 'undefined' && window.innerWidth < 768 ? `${offset * 110}%` : `${offset * 100}%`,
                                        scale: absOffset === 0 ? 1 : 0.8,
                                        z: absOffset === 0 ? 0 : -100,
                                        opacity: absOffset > 1 ? 0 : 1,
                                        rotateY: offset * 15,
                                    }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                                        <div className="w-16 h-16 bg-linear-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-6">
                                            <Icon className="text-white" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {capability.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {capability.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center space-x-4 mt-12">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
                        >
                            <ChevronLeft className="text-primary-600" />
                        </button>

                        {/* Dots */}
                        <div className="flex space-x-2">
                            {capabilitiesData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === activeIndex
                                        ? 'bg-primary-600 w-8'
                                        : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
                        >
                            <ChevronRight className="text-primary-600" />
                        </button>
                    </div>
                </div>

                {/* Grid View for Mobile */}
                <div className="mt-16 md:hidden grid gap-6">
                    {capabilitiesData.map((capability) => {
                        const Icon = iconMap[capability.icon];
                        return (
                            <motion.div
                                key={capability.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                            >
                                <div className="w-12 h-12 bg-linear-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center mb-4">
                                    <Icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {capability.title}
                                </h3>
                                <p className="text-gray-600">
                                    {capability.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
