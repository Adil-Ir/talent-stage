import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar } from 'lucide-react';
import { useRecruitmentStore } from '../../stores/recruitmentStore';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/helpers';

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { getJob, getCandidatesByJob, rubrics, updateRubric } = useRecruitmentStore();

    const job = getJob(jobId);
    const candidates = getCandidatesByJob(jobId);
    const [activeTab, setActiveTab] = useState('candidates');
    const [rubric, setRubric] = useState(rubrics[jobId] || rubrics.default);

    if (!job) {
        return <div>Job not found</div>;
    }

    const candidatesByStage = {
        applied: candidates.filter(c => c.stage.toLowerCase() === 'applied'),
        shortlisted: candidates.filter(c => c.stage.toLowerCase() === 'shortlisted'),
        interview: candidates.filter(c => c.stage.toLowerCase() === 'interview'),
        offer: candidates.filter(c => c.stage.toLowerCase() === 'offer'),
        rejected: candidates.filter(c => c.stage.toLowerCase() === 'rejected'),
    };

    const handleRubricUpdate = () => {
        updateRubric(jobId, rubric);
        alert('Rubric saved successfully!');
    };

    const updateCriterion = (index, field, value) => {
        const newCriteria = [...rubric.criteria];
        newCriteria[index] = { ...newCriteria[index], [field]: value };
        setRubric({ ...rubric, criteria: newCriteria });
    };

    const totalWeight = rubric.criteria.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <button
                onClick={() => navigate('/workspace/jobs')}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
                <ArrowLeft size={20} />
                <span>Back to Jobs</span>
            </button>

            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <p className="text-gray-600">{job.department} • {job.location} • {job.type}</p>
                    </div>
                    <Badge variant="success">{job.status}</Badge>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <Users size={18} />
                        <span>{candidates.length} total applicants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar size={18} />
                        <span>Posted {formatDate(job.postedDate)}</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                        <button
                            onClick={() => setActiveTab('candidates')}
                            className={`py-4 border-b-2 font-medium transition-colors ${activeTab === 'candidates'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Candidates ({candidates.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('rubric')}
                            className={`py-4 border-b-2 font-medium transition-colors ${activeTab === 'rubric'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Evaluation Rubric
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === 'candidates' && (
                        <div className="space-y-6">
                            {Object.entries(candidatesByStage).map(([stage, stageCandidates]) => (
                                <div key={stage}>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize flex items-center space-x-2">
                                        <span>{stage}</span>
                                        <Badge>{stageCandidates.length}</Badge>
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {stageCandidates.map((candidate) => (
                                            <div
                                                key={candidate.id}
                                                onClick={() => navigate(`/workspace/candidates/${candidate.id}`)}
                                                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={candidate.avatar}
                                                        alt={candidate.name}
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                                                        <p className="text-sm text-gray-600">{candidate.experience} experience</p>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-primary-600">{candidate.score}</div>
                                                        <div className="text-xs text-gray-500">score</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {stageCandidates.length === 0 && (
                                        <p className="text-gray-500 text-sm">No candidates in this stage</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'rubric' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Evaluation Criteria</h3>
                                    <p className="text-sm text-gray-600">Define how candidates will be evaluated</p>
                                </div>
                                <Badge variant={totalWeight === 100 ? 'success' : 'warning'}>
                                    Total Weight: {totalWeight}%
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                {rubric.criteria.map((criterion, index) => (
                                    <div key={criterion.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Criterion Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={criterion.name}
                                                    onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Weight (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={criterion.weight}
                                                    onChange={(e) => updateCriterion(index, 'weight', parseInt(e.target.value) || 0)}
                                                    min="0"
                                                    max="100"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    value={criterion.description}
                                                    onChange={(e) => updateCriterion(index, 'description', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalWeight !== 100 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-yellow-800 text-sm">
                                        ⚠️ Total weight must equal 100%. Currently: {totalWeight}%
                                    </p>
                                </div>
                            )}

                            <Button
                                onClick={handleRubricUpdate}
                                disabled={totalWeight !== 100}
                                variant="primary"
                                size="lg"
                            >
                                Save Rubric
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
