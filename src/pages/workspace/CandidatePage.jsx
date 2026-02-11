import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Award, FileText, Calendar, ChevronRight } from 'lucide-react';
import { useRecruitmentStore } from '../../stores/recruitmentStore';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import VideoReview from '../../components/video/VideoReview';
import { formatDateTime } from '../../utils/helpers';

const CandidatePage = () => {
    const { candidateId } = useParams();
    const navigate = useNavigate();
    const { getCandidate, getCandidateAuditEvents, updateCandidateStage, updateVideoScreening } = useRecruitmentStore();

    const candidate = getCandidate(candidateId);
    const auditEvents = getCandidateAuditEvents(candidateId);
    const [activeTab, setActiveTab] = useState('profile');

    if (!candidate) {
        return <div>Candidate not found</div>;
    }

    const handleStageChange = (newStage) => {
        updateCandidateStage(candidateId, newStage, 'Current Recruiter');
    };

    const stageOptions = [
        { value: 'applied', label: 'Applied' },
        { value: 'shortlisted', label: 'Shortlisted' },
        { value: 'interview', label: 'Interview' },
        { value: 'offer', label: 'Offer' },
        { value: 'rejected', label: 'Rejected' },
    ];

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
                <ArrowLeft size={20} />
                <span>Back</span>
            </button>

            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                        <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-20 h-20 rounded-full border-4 border-gray-100"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                                    <Mail size={16} />
                                    <span>{candidate.email}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                                    <Phone size={16} />
                                    <span>{candidate.phone}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                                    <MapPin size={16} />
                                    <span>{candidate.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                        <div className="text-4xl font-bold text-primary-600 mb-1">{candidate.score}</div>
                        <div className="text-sm text-gray-600 mb-4">Overall Score</div>
                        <Select
                            value={candidate.stage}
                            onChange={(e) => handleStageChange(e.target.value)}
                            options={stageOptions}
                            className="w-full sm:min-w-37.5"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-8 px-6 min-w-max">
                        {['profile', 'video', 'audit'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 border-b-2 font-medium capitalize transition-colors ${activeTab === tab
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Experience & Education */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                                    <p className="text-gray-700">{candidate.experience}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                                    <p className="text-gray-700">{candidate.education}</p>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map((skill, index) => (
                                        <Badge key={index} variant="primary">{skill}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* AI Evaluation */}
                            {candidate.evaluation && (
                                <div className="bg-linear-to-br from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                                        <Award className="text-primary-600" />
                                        <span>AI Evaluation</span>
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        {Object.entries({
                                            'Technical Skills': candidate.evaluation.technicalScore,
                                            'Communication': candidate.evaluation.communicationScore,
                                            'Culture Fit': candidate.evaluation.cultureFitScore,
                                        }).map(([key, value]) => (
                                            <div key={key} className="bg-white rounded-lg p-4">
                                                <div className="text-3xl font-bold text-primary-600 mb-1">{value}</div>
                                                <div className="text-sm text-gray-600">{key}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{candidate.evaluation.summary}</p>
                                </div>
                            )}

                            {/* Resume */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Resume</h3>
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="text-gray-600" size={32} />
                                            <div>
                                                <p className="font-medium text-gray-900">Resume.pdf</p>
                                                <p className="text-sm text-gray-600">PDF Document</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Download</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'video' && (
                        <VideoReview candidate={candidate} onUpdate={updateVideoScreening} />
                    )}

                    {activeTab === 'audit' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
                            <div className="space-y-4">
                                {auditEvents.length === 0 && (
                                    <p className="text-gray-500">No activity yet</p>
                                )}
                                {auditEvents.map((event, index) => (
                                    <div key={event.id} className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Calendar className="text-primary-600" size={20} />
                                            </div>
                                            {index < auditEvents.length - 1 && (
                                                <div className="w-0.5 h-full bg-gray-200 mt-2" style={{ minHeight: '30px' }} />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-900">{event.description}</h4>
                                                    <Badge variant="info" size="sm">{event.type.replace('_', ' ')}</Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">By {event.user}</p>
                                                <p className="text-xs text-gray-500">{formatDateTime(event.timestamp)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidatePage;
