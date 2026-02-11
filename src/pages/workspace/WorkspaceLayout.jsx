import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { Briefcase, Users, Home, LogOut, Video, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkspaceLayout = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Overview', path: '/workspace', icon: Home, exact: true },
        { name: 'Jobs', path: '/workspace/jobs', icon: Briefcase },
        { name: 'Screenings', path: '/workspace/screenings', icon: Video },
        { name: 'Candidates', path: '/workspace/candidates', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Sidebar/Top Nav */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            {/* Logo */}
                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="w-8 h-8 bg-linear-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                                    <span className="text-white font-bold">T</span>
                                </div>
                                <span className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">TalentSage</span>
                            </Link>

                            {/* Desktop Nav Links */}
                            <nav className="hidden md:flex space-x-4">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <NavLink
                                            key={link.path}
                                            to={link.path}
                                            end={link.exact}
                                            className={({ isActive }) =>
                                                `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isActive
                                                    ? 'bg-primary-50 text-primary-600'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`
                                            }
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium">{link.name}</span>
                                        </NavLink>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:block">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2"
                            >
                                <span className="font-medium">Recruiter</span>
                                <LogOut size={18} />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden flex flex-col"
                            >
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <span className="font-bold text-gray-900">Navigation</span>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-4 flex-1 flex flex-col space-y-2">
                                    {navLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <NavLink
                                                key={link.path}
                                                to={link.path}
                                                end={link.exact}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                        ? 'bg-primary-50 text-primary-600 shadow-sm'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }`
                                                }
                                            >
                                                <Icon size={20} />
                                                <span className="font-semibold">{link.name}</span>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                                <div className="p-4 border-t border-gray-100">
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            navigate('/');
                                        }}
                                        className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <LogOut size={20} />
                                        <span className="font-semibold">Log Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 overflow-x-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default WorkspaceLayout;
