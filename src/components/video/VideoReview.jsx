import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Check, X, Clock, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

const AIScreeningSummary = ({ screening }) => {
    if (!screening || !screening.submitted) {
        return (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-500">No screening submitted yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis Summary</h4>
                {screening.reviewedBy ? (
                    <p className="text-sm text-gray-500">
                        Reviewed by {screening.reviewedBy} • {screening.decision ? 'Decision: ' + screening.decision.toUpperCase() : 'Pending decision'}
                    </p>
                ) : (
                    <p className="text-sm text-yellow-600">Pending review</p>
                )}
            </div>

            {/* Transcript */}
            <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Transcript</h5>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{screening.transcript}</p>
                </div>
            </div>

            {/* Scoring Breakdown */}
            {screening.scores && Object.keys(screening.scores).length > 0 && (
                <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-3">Scoring Breakdown</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {Object.entries(screening.scores).map(([key, value]) => (
                            <div key={key}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs sm:text-sm capitalize text-gray-700">{key}</span>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">{value}/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className={`h-1.5 sm:h-2 rounded-full ${value >= 80 ? 'bg-green-500' :
                                            value >= 60 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendation */}
            {screening.recommendation && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 sm:p-4">
                    <h5 className="text-sm font-semibold text-primary-900 mb-1 sm:mb-2">AI Recommendation</h5>
                    <p className="text-sm sm:text-base text-primary-800">{screening.recommendation}</p>
                </div>
            )}
        </div>
    );
};

const VideoReview = ({ candidate, onUpdate }) => {
    const [decision, setDecision] = useState(candidate.videoScreening?.decision || null);
    const [notes, setNotes] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSubmitDecision = (newDecision) => {
        const updatedScreening = {
            ...candidate.videoScreening,
            decision: newDecision,
            reviewedBy: 'Current Recruiter',
            reviewedAt: new Date().toISOString(),
            notes,
        };
        setDecision(newDecision);
        onUpdate(candidate.id, updatedScreening);
    };

    if (!candidate.videoScreening?.submitted) {
        return (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Clock className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">Candidate hasn't submitted video screening yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Video Player Placeholder */}
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary-600/20 to-accent-600/20" />
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                    {isPlaying ? (
                        <Pause className="text-white" size={32} />
                    ) : (
                        <Play className="text-white ml-1" size={32} />
                    )}
                </button>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
                    Video Screening Recording
                </div>
            </div>

            {/* AI Analysis */}
            <AIScreeningSummary screening={candidate.videoScreening} />

            {/* Decision Controls */}
            {!decision && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Your Decision</h4>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add your notes here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows={3}
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="primary"
                            onClick={() => handleSubmitDecision('pass')}
                            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                        >
                            <Check size={18} />
                            <span>Pass - Move Forward</span>
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => handleSubmitDecision('hold')}
                            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                        >
                            <Clock size={18} />
                            <span>Hold - Review Later</span>
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleSubmitDecision('reject')}
                            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                        >
                            <X size={18} />
                            <span>Reject</span>
                        </Button>
                    </div>
                </div>
            )}

            {decision && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                        ✓ Decision recorded: {decision.toUpperCase()}
                    </p>
                </div>
            )}
        </div>
    );
};

export default VideoReview;
