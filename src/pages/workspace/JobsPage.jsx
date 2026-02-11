import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Users, Search } from 'lucide-react';
import { useRecruitmentStore } from '../../stores/recruitmentStore';
import { useAssistantStore } from '../../stores/assistantStore';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const JobsPage = () => {
    const navigate = useNavigate();
    const { jobs } = useRecruitmentStore();
    const { setCurrentJobId } = useAssistantStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleJobClick = (jobId) => {
        setCurrentJobId(jobId);
        navigate(`/workspace/jobs/${jobId}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Openings</h1>
                <p className="text-gray-600">Manage and review all active job postings</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>

            {/* Jobs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => handleJobClick(job.id)}
                        className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                <Briefcase className="text-primary-600" size={24} />
                            </div>
                            <Badge variant="success">{job.status}</Badge>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {job.title}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users size={16} />
                                <span>{job.applicants} applicants</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">
                            {job.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <span className="text-sm font-medium text-primary-600">View Details →</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No jobs found matching your search</p>
                </div>
            )}
        </div>
    );
};

export default JobsPage;
