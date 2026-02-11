import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How does the AI evaluate candidate quality?",
        answer: "Our AI agents analyze transcripts from video interviews and resume data against your specific job rubrics. It evaluates technical proficiency, communication clarity, and cultural alignment using advanced NLP models trained on diverse recruitment datasets."
    },
    {
        question: "Can I customize the evaluation criteria?",
        answer: "Absolutely! You can use our rubric editor to define exactly what you're looking for, or let our AI assistant generate a custom rubric based on your job description in seconds."
    },
    {
        question: "Is the video screening fully autonomous?",
        answer: "Yes, the AI assistant can conduct preliminary screenings independently. It asks relevant questions, transcribes the conversation, and provides a detailed scoring breakdown for your review."
    },
    {
        question: "How does TalentSage ensure objective assessments?",
        answer: "By using standardized rubrics and AI-driven evaluation, we minimize human bias in the early stages of screening, ensuring every candidate is measured against the same data-driven criteria."
    },
    {
        question: "What platforms does TalentSage integrate with?",
        answer: "TalentSage is designed to work alongside your existing ATS and communication tools, offering easy data export and API integration for seamless workflow synchronization."
    }
];

const FAQItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-100 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-primary-600 transition-colors group"
            >
                <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">{faq.question}</span>
                <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 text-gray-500'} transition-all`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-600 leading-relaxed">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Common <span className="text-primary-600">Questions</span>
                    </motion.h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about scaling your team with AI.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
