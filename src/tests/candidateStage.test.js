import { describe, it, expect, beforeEach } from 'vitest';
import { useRecruitmentStore } from '../stores/recruitmentStore';

describe('Recruitment Store - Candidate Stage Management', () => {
    beforeEach(() => {
        // Reset store state before each test
        useRecruitmentStore.setState({
            candidates: [
                {
                    id: 'test-1',
                    name: 'Test Candidate',
                    stage: 'applied',
                    score: 85,
                    jobId: 'job-1',
                },
            ],
            auditEvents: [],
        });
    });

    it('should update candidate stage and create audit event', () => {
        const { updateCandidateStage, getCandidate, auditEvents } = useRecruitmentStore.getState();

        // Update stage
        updateCandidateStage('test-1', 'shortlisted', 'Test Recruiter');

        // Get updated candidate
        const candidate = getCandidate('test-1');

        // Verify stage was updated
        expect(candidate.stage).toBe('shortlisted');

        // Verify audit event was created
        const events = useRecruitmentStore.getState().auditEvents;
        expect(events.length).toBeGreaterThan(0);
        expect(events[0].type).toBe('stage_change');
        expect(events[0].candidateId).toBe('test-1');
        expect(events[0].user).toBe('Test Recruiter');
    });

    it('should shortlist top candidates based on score threshold', () => {
        const { shortlistTopCandidates, getCandidatesByJob } = useRecruitmentStore.getState();

        // Add more candidates
        useRecruitmentStore.setState({
            candidates: [
                { id: 'c1', jobId: 'job-1', stage: 'applied', score: 90 },
                { id: 'c2', jobId: 'job-1', stage: 'applied', score: 75 },
                { id: 'c3', jobId: 'job-1', stage: 'applied', score: 88 },
            ],
        });

        // Shortlist candidates with score >= 85
        const count = shortlistTopCandidates('job-1', 85);

        // Verify correct number shortlisted
        expect(count).toBe(2);

        // Verify candidates were moved to shortlisted
        const candidates = getCandidatesByJob('job-1');
        const shortlisted = candidates.filter(c => c.stage === 'shortlisted');
        expect(shortlisted.length).toBe(2);
        expect(shortlisted.every(c => c.score >= 85)).toBe(true);
    });
});
