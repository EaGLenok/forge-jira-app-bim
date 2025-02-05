import { Topic } from './types';

export const topics: Topic[] = [
    {
        topicId: '1',
        questions: [
            {
                id: '1.1',
                text: 'Which cloud provider do you plan to use?',
                answers: [
                    { label: 'AWS', next: '1.3' },
                    { label: 'Azure', next: '1.2' },
                    { label: 'Google Cloud', next: '1.5' },
                ],
            },
            {
                id: '1.2',
                text: 'Do you require multi-region deployment?',
                answers: [
                    { label: 'Yes', next: '1.3' },
                    { label: 'No', next: '1.3' },
                ],
            },
            {
                id: '1.3',
                text: 'Do you need a managed database service?',
                answers: [
                    { label: 'Yes', next: '1.4' },
                    { label: 'No', next: '1.4' },
                ],
            },
            {
                id: '1.4',
                text: 'Do you require a content delivery network (CDN)?',
                answers: [
                    { label: 'Yes', next: '1.5' },
                    { label: 'No', next: 'unused' },
                ],
            },
            {
                id: '1.5',
                text: 'Extra question in Topic 1 for testing arbitrary pointers.',
                answers: [
                    { label: 'Option A', next: 'unused' },
                    { label: 'Option B', next: 'unused' },
                ],
            },
        ],
    },
    {
        topicId: '2',
        questions: [
            {
                id: '2.1',
                text: 'What type of project are you planning?',
                answers: [
                    { label: 'Web application', next: '2.3' },
                    { label: 'Mobile application', next: '2.2' },
                    { label: 'Enterprise system', next: '2.2' },
                    { label: 'Other', next: '2.2' },
                ],
            },
            {
                id: '2.2',
                text: 'How many users do you expect in the initial phase?',
                answers: [
                    { label: 'Less than 1000', next: '2.3' },
                    { label: 'Between 1000 and 10,000', next: '2.3' },
                    { label: 'More than 10,000', next: 'unused' },
                ],
            },
            {
                id: '2.3',
                text: 'What is your estimated budget range?',
                answers: [
                    { label: 'Less than $50k', next: 'unused' },
                    { label: '$50k - $200k', next: 'unused' },
                    { label: 'More than $200k', next: 'unused' },
                ],
            },
        ],
    },
    {
        topicId: '3',
        questions: [
            {
                id: '3.1',
                text: 'What is the estimated duration of the project?',
                answers: [
                    { label: 'Less than 3 months', next: '3.2' },
                    { label: 'Between 3 and 6 months', next: '3.3' },
                    { label: 'More than 6 months', next: '3.3' },
                ],
            },
            {
                id: '3.2',
                text: 'Is ongoing support and maintenance required?',
                answers: [
                    { label: 'Yes', next: '3.3' },
                    { label: 'No', next: 'unused' },
                ],
            },
            {
                id: '3.3',
                text: 'Do you plan to scale the project in the future?',
                answers: [
                    { label: 'Yes', next: 'unused' },
                    { label: 'No', next: 'unused' },
                ],
            },
        ],
    },
    {
        topicId: '4',
        questions: [
            {
                id: '4.1',
                text: 'Which programming language is primarily used in your project?',
                answers: [
                    { label: 'JavaScript', next: '4.2' },
                    { label: 'Python', next: '4.3' },
                    { label: 'Java', next: '4.2' },
                ],
            },
            {
                id: '4.2',
                text: 'Do you require a microservices architecture?',
                answers: [
                    { label: 'Yes', next: '4.3' },
                    { label: 'No', next: 'unused' },
                ],
            },
            {
                id: '4.3',
                text: 'Are you using a specific framework?',
                answers: [
                    { label: 'React', next: 'unused' },
                    { label: 'Angular', next: 'unused' },
                    { label: 'Vue', next: 'unused' },
                ],
            },
        ],
    },
    {
        topicId: '5',
        questions: [
            {
                id: '5.1',
                text: 'Do you plan to integrate third-party services?',
                answers: [
                    { label: 'Yes', next: '5.2' },
                    { label: 'No', next: 'unused' },
                ],
            },
            {
                id: '5.2',
                text: 'Which service do you plan to integrate?',
                answers: [
                    { label: 'Payment Gateway', next: '5.3' },
                    { label: 'Messaging Service', next: 'unused' },
                    { label: 'Analytics', next: '5.3' },
                ],
            },
            {
                id: '5.3',
                text: 'Is custom integration required?',
                answers: [
                    { label: 'Yes', next: 'unused' },
                    { label: 'No', next: 'unused' },
                ],
            },
        ],
    },
];
