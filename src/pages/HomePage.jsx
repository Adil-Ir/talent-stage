import React from 'react';
import Header from '../components/marketing/Header';
import Hero from '../components/marketing/Hero';
import Capabilities from '../components/marketing/Capabilities';
import ImpactMetrics from '../components/marketing/ImpactMetrics';
import HowItWorks from '../components/marketing/HowItWorks';
import Testimonials from '../components/marketing/Testimonials';
import Pricing from '../components/marketing/Pricing';
import FAQ from '../components/marketing/FAQ';
import Contact from '../components/marketing/Contact';
import Footer from '../components/marketing/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header />
            <div className="relative">
                <Hero />
                <Capabilities />
                <HowItWorks />
                <ImpactMetrics />
                <Testimonials />
                <Pricing />
                <FAQ />
                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
