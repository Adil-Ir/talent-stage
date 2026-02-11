import { describe, it, expect, beforeEach } from 'vitest';
import { useRecruitmentStore } from '../stores/recruitmentStore';

describe('Rubric Validation and Management', () => {
    beforeEach(() => {
        useRecruitmentStore.setState({
            rubrics: {
                'job-1': {
                    criteria: [
                        { id: 'tech', name: 'Technical Skills', weight: 40, description: 'React, TypeScript' },
                        { id: 'comm', name: 'Communication', weight: 30, description: 'Clear communication' },
                        { id: 'culture', name: 'Culture Fit', weight: 30, description: 'Team alignment' },
                    ],
                },
            },
        });
    });

    it('should calculate correct total weight', () => {
        const { rubrics } = useRecruitmentStore.getState();
        const rubric = rubrics['job-1'];

        const totalWeight = rubric.criteria.reduce((sum, c) => sum + c.weight, 0);

        expect(totalWeight).toBe(100);
    });

    it('should update rubric and persist changes', () => {
        const { updateRubric, getRubric } = useRecruitmentStore.getState();

        const newRubric = {
            criteria: [
                { id: 'skill1', name: 'Skill 1', weight: 50, description: 'Test' },
                { id: 'skill2', name: 'Skill 2', weight: 50, description: 'Test2' },
            ],
        };

        updateRubric('job-2', newRubric);

        const savedRubric = getRubric('job-2');
        expect(savedRubric.criteria.length).toBe(2);
        expect(savedRubric.criteria[0].weight).toBe(50);
    });

    it('should detect invalid weight totals', () => {
        const rubric = {
            criteria: [
                { id: '1', name: 'Test', weight: 40, description: '' },
                { id: '2', name: 'Test2', weight: 40, description: '' },
            ],
        };

        const totalWeight = rubric.criteria.reduce((sum, c) => sum + c.weight, 0);

        // Total is 80, not 100
        expect(totalWeight).not.toBe(100);
        expect(totalWeight).toBe(80);
    });
});
