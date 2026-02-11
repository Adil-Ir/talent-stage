import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jobs as initialJobs, candidates as initialCandidates, rubricTemplates, auditEvents as initialAuditEvents } from '../data/mockData';
import { generateId } from '../utils/helpers';

export const useRecruitmentStore = create(
    persist(
        (set, get) => ({
            // State
            jobs: initialJobs,
            candidates: initialCandidates,
            rubrics: { ...rubricTemplates },
            auditEvents: initialAuditEvents,

            // Job actions
            getJob: (jobId) => {
                return get().jobs.find((job) => job.id === jobId);
            },

            // Candidate actions
            getCandidatesByJob: (jobId) => {
                return get().candidates.filter((candidate) => candidate.jobId === jobId);
            },

            getCandidate: (candidateId) => {
                return get().candidates.find((candidate) => candidate.id === candidateId);
            },

            getCandidatesByStage: (jobId, stage) => {
                return get().candidates.filter(
                    (candidate) => candidate.jobId === jobId && candidate.stage.toLowerCase() === stage.toLowerCase()
                );
            },

            updateCandidateStage: (candidateId, newStage, user = 'AI Assistant') => {
                set((state) => {
                    const candidate = state.candidates.find((c) => c.id === candidateId);
                    if (!candidate) return state;

                    const oldStage = candidate.stage;

                    const newAuditEvent = {
                        id: generateId(),
                        candidateId,
                        type: 'stage_change',
                        timestamp: new Date().toISOString(),
                        description: `Moved from ${oldStage} to ${newStage}`,
                        user,
                        metadata: { from: oldStage, to: newStage },
                    };

                    return {
                        candidates: state.candidates.map((c) =>
                            c.id === candidateId ? { ...c, stage: newStage } : c
                        ),
                        auditEvents: [newAuditEvent, ...state.auditEvents],
                    };
                });
            },

            shortlistTopCandidates: (jobId, threshold = 85) => {
                set((state) => {
                    const jobCandidates = state.candidates.filter(
                        (c) => c.jobId === jobId && c.stage.toLowerCase() === 'applied' && c.score >= threshold
                    );

                    const updatedCandidates = state.candidates.map((c) => {
                        if (jobCandidates.find((jc) => jc.id === c.id)) {
                            return { ...c, stage: 'shortlisted' };
                        }
                        return c;
                    });

                    const newAuditEvents = jobCandidates.map((c) => ({
                        id: generateId(),
                        candidateId: c.id,
                        type: 'stage_change',
                        timestamp: new Date().toISOString(),
                        description: 'Moved from applied to shortlisted by AI Assistant',
                        user: 'AI Assistant',
                        metadata: { from: 'applied', to: 'shortlisted' },
                    }));

                    return {
                        candidates: updatedCandidates,
                        auditEvents: [...newAuditEvents, ...state.auditEvents],
                    };
                });

                // eslint-disable-next-line no-undef
                return jobCandidates.length;
            },

            updateVideoScreening: (candidateId, screeningData) => {
                set((state) => ({
                    candidates: state.candidates.map((c) =>
                        c.id === candidateId
                            ? { ...c, videoScreening: { ...c.videoScreening, ...screeningData } }
                            : c
                    ),
                }));
            },

            // Rubric actions
            getRubric: (jobId) => {
                return get().rubrics[jobId] || get().rubrics.default;
            },

            updateRubric: (jobId, rubric) => {
                set((state) => ({
                    rubrics: { ...state.rubrics, [jobId]: rubric },
                }));

                // Add audit event
                set((state) => ({
                    auditEvents: [
                        {
                            id: generateId(),
                            jobId,
                            type: 'rubric_updated',
                            timestamp: new Date().toISOString(),
                            description: 'Evaluation rubric updated',
                            user: 'Recruiter',
                        },
                        ...state.auditEvents,
                    ],
                }));
            },

            generateRubricForJob: (jobId) => {
                const job = get().getJob(jobId);
                if (!job) return;

                const rubricTemplateMap = {
                    'Frontend': 'job-1',
                    'Design': 'job-2',
                    'DevOps': 'default',
                    'Data': 'default',
                    'Sales': 'default',
                };

                const templateKey = rubricTemplateMap[job.department] || 'default';
                const template = rubricTemplates[templateKey];

                set((state) => ({
                    rubrics: { ...state.rubrics, [jobId]: template },
                }));

                // Add audit event
                set((state) => ({
                    auditEvents: [
                        {
                            id: generateId(),
                            jobId,
                            type: 'rubric_generated',
                            timestamp: new Date().toISOString(),
                            description: 'Evaluation rubric generated by AI Assistant',
                            user: 'AI Assistant',
                        },
                        ...state.auditEvents,
                    ],
                }));
            },

            // Audit actions
            addAuditEvent: (event) => {
                set((state) => ({
                    auditEvents: [{ ...event, id: generateId(), timestamp: new Date().toISOString() }, ...state.auditEvents],
                }));
            },

            getCandidateAuditEvents: (candidateId) => {
                return get().auditEvents.filter((event) => event.candidateId === candidateId);
            },

            // Interview scheduling
            scheduleInterview: (candidateId, interviewData) => {
                set((state) => {
                    const newAuditEvent = {
                        id: generateId(),
                        candidateId,
                        type: 'interview_scheduled',
                        timestamp: new Date().toISOString(),
                        description: `Interview scheduled for ${interviewData.date} at ${interviewData.time}`,
                        user: 'AI Assistant',
                        metadata: interviewData,
                    };

                    return {
                        auditEvents: [newAuditEvent, ...state.auditEvents],
                    };
                });
            },
        }),
        {
            name: 'recruitment-storage',
            partialize: (state) => ({ rubrics: state.rubrics }), // Only persist rubrics
        }
    )
);
