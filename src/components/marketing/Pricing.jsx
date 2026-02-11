import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const plans = [
    {
        name: "Starter",
        price: "499",
        description: "Perfect for growing startups and smaller teams.",
        features: [
            "5 Active Job Slots",
            "AI Candidate Ranking",
            "Autonomous Video Screening (Up to 50)",
            "Standard Support",
            "Email Integrations"
        ],
        btnVariant: "outline",
        popular: false
    },
    {
        name: "Professional",
        price: "1,299",
        description: "Advanced AI tools for scaling talent acquisition.",
        features: [
            "Unlimited Job Slots",
            "Advanced Evaluation Rubrics",
            "Unlimited Video Screenings",
            "Priority Support",
            "ATS & HRIS Integrations",
            "Custom AI Voice Avatars"
        ],
        btnVariant: "primary",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solutions for large-scale organizations.",
        features: [
            "White-label AI Voice",
            "Custom LLM Fine-tuning",
            "SLA Guarantee",
            "Dedicated Account Manager",
            "Advanced Security & Compliance",
            "On-premise Deployment Options"
        ],
        btnVariant: "outline",
        popular: false
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 rounded-full px-4 py-1.5 mb-6"
                    >
                        <Sparkles size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">Pricing Plans</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Invest in the <span className="text-primary-600">Future of Hiring</span>
                    </motion.h2>
                    <p className="text-xl text-gray-600">
                        Transparent pricing that scales with your growth. No hidden fees, just pure AI efficiency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-primary-600 shadow-glow-light scale-105 z-10' : 'border-gray-100 shadow-sm'} flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 text-center pt-2">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-center justify-center gap-1">
                                    {plan.price !== "Custom" && <span className="text-2xl font-medium text-gray-500">$</span>}
                                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-gray-500 font-medium">/mo</span>}
                                </div>
                                <p className="text-gray-500 mt-4 text-sm">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                            <Check className="text-green-600" size={12} />
                                        </div>
                                        <span className="text-gray-600 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.btnVariant}
                                className="w-full py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105"
                            >
                                {plan.price === "Custom" ? "Contact Enterprise" : "Start Free Trial"}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
