import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, Video, Award } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: "Define Your Needs",
        description: "Upload your job description or use our AI assistant to generate a precise evaluation rubric in seconds.",
        color: "bg-blue-500"
    },
    {
        icon: UserCheck,
        title: "Source & Screen",
        description: "Candidates are automatically ranked based on their technical skills, experience, and cultural alignment.",
        color: "bg-purple-500"
    },
    {
        icon: Video,
        title: "AI Video Interview",
        description: "Our autonomous assistant conducts preliminary video screenings, transcribing and scoring communication on the fly.",
        color: "bg-indigo-500"
    },
    {
        icon: Award,
        title: "Select the Best",
        description: "Review comprehensive AI insights and make data-driven decisions to hire the top 1% of talent.",
        color: "bg-accent-600"
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        How <span className="text-primary-600">TalentSage</span> Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600"
                    >
                        Our AI-powered workflow streamlines your entire recruitment process, from job definition to final offer.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Connector Line for Desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-100 -z-10" />
                            )}

                            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
