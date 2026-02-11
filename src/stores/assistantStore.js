import { create } from 'zustand';
import { generateId } from '../utils/helpers';

export const useAssistantStore = create((set, get) => ({
    // State
    isOpen: false,
    isMinimized: false,
    messages: [
        {
            id: 'msg-1',
            role: 'assistant',
            content: 'Hi! I\'m your TalentSage AI Assistant. I can help you shortlist candidates, generate evaluation rubrics, schedule interviews, and more. How can I assist you today?',
            timestamp: new Date().toISOString(),
        },
    ],
    avatarState: 'idle', // idle, listening, thinking, speaking
    isListening: false,
    isSpeaking: false,
    currentJobId: null,

    // Actions
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen, isMinimized: false })),
    close: () => set({ isOpen: false }),
    toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),

    setAvatarState: (state) => set({ avatarState: state }),

    addMessage: (role, content, suggestedActions = []) => {
        const message = {
            id: generateId(),
            role,
            content,
            suggestedActions,
            timestamp: new Date().toISOString(),
        };
        set((state) => ({ messages: [...state.messages, message] }));
    },

    setCurrentJobId: (jobId) => set({ currentJobId: jobId }),

    startListening: () => set({ isListening: true, avatarState: 'listening' }),
    stopListening: () => set({ isListening: false }),

    startSpeaking: () => set({ isSpeaking: true, avatarState: 'speaking' }),
    stopSpeaking: () => set({ isSpeaking: false, avatarState: 'idle' }),

    processCommand: async (command, recruitmentStore) => {
        set({ avatarState: 'thinking' });

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const lowerCommand = command.toLowerCase();
        let response = '';
        let suggestedActions = [];

        // Command: Shortlist top candidates
        if (lowerCommand.includes('shortlist') && lowerCommand.includes('candidate')) {
            const jobId = get().currentJobId || (recruitmentStore.jobs[0]?.id) || 'job-1';
            const count = recruitmentStore.shortlistTopCandidates(jobId);
            response = `I've successfully shortlisted ${count} top candidates with scores above 85 for this position. You can review them in the Shortlisted tab.`;
            suggestedActions = [
                { label: 'View Shortlisted Candidates', action: 'view_shortlisted' },
            ];
        }
        // Command: Generate rubric
        else if (lowerCommand.includes('generate') && lowerCommand.includes('rubric')) {
            const jobId = get().currentJobId || (recruitmentStore.jobs[0]?.id) || 'job-1';
            recruitmentStore.generateRubricForJob(jobId);
            response = 'I\'ve generated a customized evaluation rubric based on the job requirements. The rubric includes weighted criteria for technical skills, problem-solving, communication, and culture fit.';
            suggestedActions = [
                { label: 'View Rubric', action: 'view_rubric' },
                { label: 'Edit Rubric', action: 'edit_rubric' },
            ];
        }
        // Command: Schedule interview
        else if (lowerCommand.includes('schedule') && lowerCommand.includes('interview')) {
            response = 'I can help you schedule an interview. Please select a candidate and provide your preferred date and time.';
            suggestedActions = [
                { label: 'Open Schedule Modal', action: 'schedule_interview' },
            ];
        }
        // Command: Show candidates
        else if (lowerCommand.includes('show') || lowerCommand.includes('view')) {
            if (lowerCommand.includes('candidate')) {
                response = 'Here are the current candidates. You can filter by stage or search by name.';
                suggestedActions = [
                    { label: 'View All Candidates', action: 'view_candidates' },
                ];
            } else if (lowerCommand.includes('job')) {
                response = 'Here are all active job postings.';
                suggestedActions = [
                    { label: 'View Jobs', action: 'view_jobs' },
                ];
            }
        }
        // Default response
        else {
            response = 'I can help you with:\n• Shortlisting top candidates\n• Generating evaluation rubrics\n• Scheduling interviews\n• Viewing candidates and jobs\n\nWhat would you like to do?';
            suggestedActions = [
                { label: 'Shortlist Top Candidates', action: 'shortlist' },
                { label: 'Generate Rubric', action: 'generate_rubric' },
                { label: 'Schedule Interview', action: 'schedule' },
            ];
        }

        get().addMessage('assistant', response, suggestedActions);
        set({ avatarState: 'idle' });
    },

    reset: () => set({
        isOpen: false,
        isMinimized: false,
        messages: [
            {
                id: 'msg-1',
                role: 'assistant',
                content: 'Hi! I\'m your TalentSage AI Assistant. How can I help you today?',
                timestamp: new Date().toISOString(),
            },
        ],
        avatarState: 'idle',
        isListening: false,
        isSpeaking: false,
    }),
}));
