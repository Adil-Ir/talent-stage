import { describe, it, expect, vi } from 'vitest';
import { useAssistantStore } from '../stores/assistantStore';
import { useRecruitmentStore } from '../stores/recruitmentStore';

describe('AI Assistant Command Processing', () => {
    it('should process shortlist command and update candidates', async () => {
        // Setup recruitment store
        useRecruitmentStore.setState({
            candidates: [
                { id: 'c1', jobId: 'job-1', stage: 'applied', score: 90 },
                { id: 'c2', jobId: 'job-1', stage: 'applied', score: 80 },
                { id: 'c3', jobId: 'job-1', stage: 'applied', score: 95 },
            ],
        });

        const assistantStore = useAssistantStore.getState();
        const recruitmentStore = useRecruitmentStore.getState();

        // Set current job
        assistantStore.setCurrentJobId('job-1');

        // Add command message
        assistantStore.addMessage('user', 'shortlist top candidates');

        // Process command
        await assistantStore.processCommand('shortlist top candidates', recruitmentStore);

        // Verify candidates were shortlisted
        const shortlisted = recruitmentStore.getCandidatesByJob('job-1')
            .filter(c => c.stage === 'shortlisted');

        expect(shortlisted.length).toBeGreaterThan(0);

        // Verify response message was added
        const messages = useAssistantStore.getState().messages;
        const lastMessage = messages[messages.length - 1];
        expect(lastMessage.role).toBe('assistant');
        expect(lastMessage.content).toContain('shortlisted');
    });

    it('should generate rubric for job', async () => {
        useRecruitmentStore.setState({
            jobs: [
                { id: 'job-1', title: 'Frontend Engineer', department: 'Engineering' },
            ],
            rubrics: {},
        });

        const assistantStore = useAssistantStore.getState();
        const recruitmentStore = useRecruitmentStore.getState();

        assistantStore.setCurrentJobId('job-1');

        await assistantStore.processCommand('generate evaluation rubric', recruitmentStore);

        // Verify rubric was generated
        const rubric = recruitmentStore.getRubric('job-1');
        expect(rubric).toBeDefined();
        expect(rubric.criteria.length).toBeGreaterThan(0);
    });

    it('should handle schedule interview command', async () => {
        const assistantStore = useAssistantStore.getState();
        const recruitmentStore = useRecruitmentStore.getState();

        await assistantStore.processCommand('schedule interview', recruitmentStore);

        const messages = useAssistantStore.getState().messages;
        const lastMessage = messages[messages.length - 1];

        expect(lastMessage.role).toBe('assistant');
        expect(lastMessage.content.toLowerCase()).toContain('interview');
    });
});
