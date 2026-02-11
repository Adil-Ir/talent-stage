import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRecruitmentStore } from '../../stores/recruitmentStore';
import Button from '../../components/ui/Button';

const WorkspaceOverview = () => {
    const navigate = useNavigate();
    const { jobs, candidates } = useRecruitmentStore();

    const stats = [
        {
            label: 'Active Jobs',
            value: jobs.filter(j => j.status === 'active').length,
            icon: Briefcase,
            color: 'text-primary-600',
            bgColor: 'bg-primary-100',
        },
        {
            label: 'Total Candidates',
            value: candidates.length,
            icon: Users,
            color: 'text-accent-600',
            bgColor: 'bg-accent-100',
        },
        {
            label: 'Shortlisted',
            value: candidates.filter(c => c.stage === 'shortlisted').length,
            icon: TrendingUp,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            label: 'Interviews Pending',
            value: candidates.filter(c => c.stage === 'interview').length,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to TalentSage</h1>
                <p className="text-gray-600">Here's an overview of your recruitment pipeline</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                    <Icon className={stat.color} size={24} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Button
                        variant="primary"
                        onClick={() => navigate('/workspace/jobs')}
                        size="lg"
                        className="w-full"
                    >
                        View All Jobs
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/workspace/jobs')}
                        size="lg"
                        className="w-full"
                    >
                        View Candidates
                    </Button>
                    <Button
                        variant="accent"
                        size="lg"
                        className="w-full"
                    >
                        Post New Job
                    </Button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Jobs</h2>
                <div className="space-y-4">
                    {jobs.slice(0, 3).map((job) => (
                        <div
                            key={job.id}
                            onClick={() => navigate(`/workspace/jobs/${job.id}`)}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                <p className="text-sm text-gray-600">{job.applicants} applicants</p>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkspaceOverview;
