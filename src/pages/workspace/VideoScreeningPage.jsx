import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Search, Filter, Clock, CheckCircle, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecruitmentStore } from '../../stores/recruitmentStore';
import { formatDateTime } from '../../utils/helpers';
import Button from '../../components/ui/Button';

const VideoScreeningPage = () => {
    const navigate = useNavigate();
    const { candidates, jobs } = useRecruitmentStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, pending, reviewed

    // Filter candidates who have submitted video screenings
    const screeningCandidates = candidates.filter(c => c.videoScreening?.submitted);

    const filteredCandidates = screeningCandidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isReviewed = !!c.videoScreening.reviewedBy;

        if (filter === 'pending') return matchesSearch && !isReviewed;
        if (filter === 'reviewed') return matchesSearch && isReviewed;
        return matchesSearch;
    });

    const getJobTitle = (jobId) => {
        const job = jobs.find(j => j.id === jobId);
        return job ? job.title : 'Unknown Job';
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Video Screenings</h1>
                    <p className="text-gray-500 mt-1">Manage and review candidate video interview submissions.</p>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Submitted</span>
                        <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                            <Video size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{screeningCandidates.length}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Review</span>
                        <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                        {screeningCandidates.filter(c => !c.videoScreening.reviewedBy).length}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Reviewed</span>
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                        {screeningCandidates.filter(c => c.videoScreening.reviewedBy).length}
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all' ? 'bg-primary-600 text-white shadow-glow-light' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'pending' ? 'bg-primary-600 text-white shadow-glow-light' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter('reviewed')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'reviewed' ? 'bg-primary-600 text-white shadow-glow-light' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                        Reviewed
                    </button>
                </div>
            </div>

            {/* Candidate List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredCandidates.length > 0 ? (
                        filteredCandidates.map((candidate) => (
                            <motion.div
                                key={candidate.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="relative">
                                        <img
                                            src={candidate.avatar}
                                            alt={candidate.name}
                                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-50"
                                        />
                                        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${candidate.videoScreening.reviewedBy ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                            {candidate.videoScreening.reviewedBy ? <CheckCircle size={14} /> : <Clock size={14} />}
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left h-full">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                                            <span className="hidden md:block text-gray-300">•</span>
                                            <span className="text-gray-500 font-medium">{getJobTitle(candidate.jobId)}</span>
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User size={14} />
                                                <span>{candidate.experience} experience</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Video size={14} />
                                                <span>Submitted {formatDateTime(candidate.appliedDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">AI Match</p>
                                                <p className={`text-2xl font-bold ${candidate.score >= 90 ? 'text-green-600' : candidate.score >= 80 ? 'text-primary-600' : 'text-yellow-600'}`}>
                                                    {candidate.score}%
                                                </p>
                                            </div>
                                            {candidate.videoScreening.scores?.communication && (
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Comm.</p>
                                                    <p className="text-2xl font-bold text-accent-600">
                                                        {candidate.videoScreening.scores.communication}%
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => navigate(`/workspace/candidates/${candidate.id}?tab=video`)}
                                            className="w-full md:w-auto flex items-center justify-center space-x-2"
                                        >
                                            <span>Review Screening</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-50 rounded-2xl p-12 text-center"
                        >
                            <Video className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-lg font-semibold text-gray-900">No screenings found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search query.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VideoScreeningPage;
