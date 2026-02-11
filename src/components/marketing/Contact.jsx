import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const contactInfo = [
        {
            icon: Phone,
            label: 'Phone',
            value: '+(1) 281-786-0706',
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'info@visiontact.com',
        },
    ];

    const locations = [
        {
            city: 'Houston, TX',
            address: '8990 Kirby Dr, Ste 220, Houston, TX 77054, United States of America',
        },
        {
            city: 'Dubai, UAE',
            address: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
        },
    ];

    return (
        <section id="contact" ref={ref} className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Ready to transform your recruitment process? Contact our team today.
                        </p>
                    </motion.div>

                    {/* Contact Grid */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Subject</label>
                                    <input type="text" placeholder="How can we help?" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea rows="4" placeholder="Your message here..." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" required></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 bg-linear-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300">
                                    Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* Info & Locations */}
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Contact Information</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {contactInfo.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50 hover:border-primary-100 transition-colors">
                                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <Icon className="text-primary-600" size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                                                    <p className="text-sm font-bold text-gray-900">{item.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Our Global Offices</h3>
                                <div className="space-y-6">
                                    {locations.map((location, index) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                                            <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center shrink-0">
                                                <MapPin className="text-accent-600" size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{location.city}</p>
                                                <p className="text-sm text-gray-600 leading-relaxed">{location.address}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center pt-8 border-t border-gray-200"
                    >
                        <p className="text-gray-600">
                            © 2026 TalentSage. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
