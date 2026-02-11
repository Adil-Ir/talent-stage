import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { impactMetrics } from '../../data/mockData';

const CountUp = ({ endValue, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasAnimated(true);
            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.floor(endValue * progress));
                    requestAnimationFrame(animate);
                } else {
                    setCount(endValue);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, endValue, duration, hasAnimated]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
};

const ImpactMetrics = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section id="impact" ref={ref} className="py-24 bg-linear-to-br from-primary-600 via-primary-700 to-accent-700 text-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Measurable Business Impact
                    </h2>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        See how TalentSage transforms recruitment efficiency and delivers real ROI for your organization.
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {impactMetrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-glow-light transition-all duration-500 group"
                        >
                            <div className="text-center">
                                <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <CountUp endValue={metric.value} suffix={metric.suffix} />
                                </div>
                                <p className="text-lg text-primary-100 font-medium">
                                    {metric.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-xl text-primary-100 mb-8">
                        Join hundreds of companies transforming their hiring process with TalentSage
                    </p>
                    <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300">
                        See How It Works
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ImpactMetrics;
