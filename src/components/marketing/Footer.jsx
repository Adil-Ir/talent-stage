import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-linear-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">T</span>
                            </div>
                            <span className="text-xl font-bold">TalentSage</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Revolutionizing recruitment with autonomous AI agents that find, screen, and evaluate top-tier talent.
                        </p>
                        <div className="flex space-x-4">
                            <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
                            <Linkedin className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
                            <Github className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Solutions</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Get in Touch</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary-500" />
                                <span>hello@talentsage.ai</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin size={18} className="text-primary-500" />
                                <span>Silicon Valley, CA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 TalentSage AI. All rights reserved.</p>
                    <p>Designed for the next generation of HR.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
