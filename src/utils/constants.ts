import { Topic, ButtonType } from './types';

export const topics = [
    {
        topicId: '1',
        questions: [
            {
                id: '1.1',
                text: 'Topic 1 - Question 1: What is your primary objective?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Option A', next: '1.3' },
                    { label: 'Option B', next: '1.4' },
                    { label: 'Option C', next: '2.1' }
                ]
            },
            {
                id: '1.2',
                text: 'Topic 1 - Question 2: Which market segment interests you most?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Segment A', next: '1.4' },
                    { label: 'Segment B', next: '1.5' },
                    { label: 'Segment C', next: '1.7' }
                ]
            },
            {
                id: '1.3',
                text: 'Topic 1 - Question 3: Select all relevant business areas (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Area A', next: '1.4' },
                    { label: 'Area B', next: '1.4' },
                    { label: 'Area C', next: '1.4' }
                ]
            },
            {
                id: '1.4',
                text: 'Topic 1 - Question 4: What is your expected timeline?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Short term', next: '1.6' },
                    { label: 'Medium term', next: '1.7' },
                    { label: 'Long term', next: '2.1' }
                ]
            },
            {
                id: '1.5',
                text: 'Topic 1 - Question 5: Which resources will you allocate?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'In-house', next: '1.6' },
                    { label: 'Outsourced', next: '1.7' },
                    { label: 'Hybrid', next: '2.1' }
                ]
            },
            {
                id: '1.6',
                text: 'Topic 1 - Question 6: How will you measure success?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'KPIs', next: '1.7' },
                    { label: 'ROI', next: '2.1' },
                    { label: 'Other metrics', next: '1.7' }
                ]
            },
            {
                id: '1.7',
                text: 'Topic 1 - Question 7 (Final): Confirm your strategy selections (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Strategy Confirmed', next: '2.1' },
                    { label: 'Need Revision', next: '2.1' }
                ]
            }
        ]
    },
    {
        topicId: '2',
        questions: [
            {
                id: '2.1',
                text: 'Topic 2 - Question 1: What is your core value proposition?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Value A', next: '2.3' },
                    { label: 'Value B', next: '2.4' },
                    { label: 'Value C', next: '3.1' }
                ]
            },
            {
                id: '2.2',
                text: 'Topic 2 - Question 2: Which customer segment do you target?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Segment X', next: '2.4' },
                    { label: 'Segment Y', next: '2.5' },
                    { label: 'Segment Z', next: '2.7' }
                ]
            },
            {
                id: '2.3',
                text: 'Topic 2 - Question 3: Select all channels you currently use (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Online', next: '2.4' },
                    { label: 'Retail', next: '2.4' },
                    { label: 'Wholesale', next: '2.4' }
                ]
            },
            {
                id: '2.4',
                text: 'Topic 2 - Question 4: What is your advertising budget range?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Under $10k', next: '2.6' },
                    { label: '$10k-$50k', next: '2.7' },
                    { label: 'Over $50k', next: '3.1' }
                ]
            },
            {
                id: '2.5',
                text: 'Topic 2 - Question 5: How do you plan to scale your operations?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Organic Growth', next: '2.7' },
                    { label: 'Acquisitions', next: '2.7' },
                    { label: 'Joint Ventures', next: '3.1' }
                ]
            },
            {
                id: '2.6',
                text: 'Topic 2 - Question 6: Which performance metrics matter most?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Customer Retention', next: '2.7' },
                    { label: 'Market Share', next: '3.1' },
                    { label: 'Profit Margin', next: '2.7' }
                ]
            },
            {
                id: '2.7',
                text: 'Topic 2 - Question 7 (Final): Finalize your channel strategy (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Channels Confirmed', next: '3.1' },
                    { label: 'Reassess Strategy', next: '3.1' }
                ]
            }
        ]
    },
    {
        topicId: '3',
        questions: [
            {
                id: '3.1',
                text: 'Topic 3 - Question 1: Which development methodology do you follow?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Agile', next: '3.3' },
                    { label: 'Waterfall', next: '3.4' },
                    { label: 'Hybrid', next: '4.1' }
                ]
            },
            {
                id: '3.2',
                text: 'Topic 3 - Question 2: How many team members are involved?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: '1-5', next: '3.4' },
                    { label: '6-10', next: '3.3' },
                    { label: '11+', next: '4.1' }
                ]
            },
            {
                id: '3.3',
                text: 'Topic 3 - Question 3: Select all tools your team uses (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Version Control', next: '3.4' },
                    { label: 'CI/CD', next: '3.4' },
                    { label: 'Issue Tracker', next: '3.4' }
                ]
            },
            {
                id: '3.4',
                text: 'Topic 3 - Question 4: What is your deployment frequency?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Daily', next: '3.6' },
                    { label: 'Weekly', next: '3.7' },
                    { label: 'Monthly', next: '4.1' }
                ]
            },
            {
                id: '3.5',
                text: 'Topic 3 - Question 5: How do you ensure code quality?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Automated Tests', next: '3.7' },
                    { label: 'Code Reviews', next: '3.7' },
                    { label: 'Both', next: '4.1' }
                ]
            },
            {
                id: '3.6',
                text: 'Topic 3 - Question 6: Which environment do you prioritize?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Staging', next: '3.7' },
                    { label: 'Production', next: '4.1' },
                    { label: 'Both', next: '3.7' }
                ]
            },
            {
                id: '3.7',
                text: 'Topic 3 - Question 7 (Final): Confirm your development tool selections (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Tools Confirmed', next: '4.1' },
                    { label: 'Reevaluate', next: '4.1' }
                ]
            }
        ]
    },
    {
        topicId: '4',
        questions: [
            {
                id: '4.1',
                text: 'Topic 4 - Question 1: Which programming language is primary for your project?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'JavaScript', next: '4.3' },
                    { label: 'Python', next: '4.2' },
                    { label: 'Java', next: '5.1' }
                ]
            },
            {
                id: '4.2',
                text: 'Topic 4 - Question 2: What is your preferred framework?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'React', next: '4.4' },
                    { label: 'Angular', next: '4.4' },
                    { label: 'Vue', next: '4.7' }
                ]
            },
            {
                id: '4.3',
                text: 'Topic 4 - Question 3: Select all frameworks you are considering (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'React-based', next: '4.4' },
                    { label: 'Angular-based', next: '4.4' },
                    { label: 'Vue-based', next: '4.4' }
                ]
            },
            {
                id: '4.4',
                text: 'Topic 4 - Question 4: Do you use TypeScript in your project?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Yes', next: '4.6' },
                    { label: 'No', next: '4.7' },
                    { label: 'Sometimes', next: '4.7' }
                ]
            },
            {
                id: '4.5',
                text: 'Topic 4 - Question 5: How do you manage application state?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Redux', next: '4.7' },
                    { label: 'Context API', next: '4.7' },
                    { label: 'MobX', next: '5.1' }
                ]
            },
            {
                id: '4.6',
                text: 'Topic 4 - Question 6: How important is UI consistency for you?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Very important', next: '4.7' },
                    { label: 'Moderately important', next: '5.1' },
                    { label: 'Not important', next: '4.7' }
                ]
            },
            {
                id: '4.7',
                text: 'Topic 4 - Question 7 (Final): Finalize your frontend technology selections (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Selections Confirmed', next: '5.1' },
                    { label: 'Reevaluate', next: '5.1' }
                ]
            }
        ]
    },
    {
        topicId: '5',
        questions: [
            {
                id: '5.1',
                text: 'Topic 5 - Question 1: What is your sales strategy?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Direct Sales', next: '5.3' },
                    { label: 'Channel Partners', next: '5.4' },
                    { label: 'Mixed', next: '6.1' }
                ]
            },
            {
                id: '5.2',
                text: 'Topic 5 - Question 2: Which CRM system do you use?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Salesforce', next: '5.4' },
                    { label: 'HubSpot', next: '5.3' },
                    { label: 'Other', next: '6.1' }
                ]
            },
            {
                id: '5.3',
                text: 'Topic 5 - Question 3: Select all channels used for lead generation (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Email Marketing', next: '5.4' },
                    { label: 'Social Media', next: '5.4' },
                    { label: 'SEO/SEM', next: '5.4' }
                ]
            },
            {
                id: '5.4',
                text: 'Topic 5 - Question 4: How long is your typical sales cycle?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Less than 1 month', next: '5.6' },
                    { label: '1-3 months', next: '5.7' },
                    { label: 'More than 3 months', next: '6.1' }
                ]
            },
            {
                id: '5.5',
                text: 'Topic 5 - Question 5: How do you qualify leads?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Automated scoring', next: '5.7' },
                    { label: 'Manual review', next: '5.7' },
                    { label: 'Hybrid approach', next: '6.1' }
                ]
            },
            {
                id: '5.6',
                text: 'Topic 5 - Question 6: Which performance metric is key for you?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Conversion Rate', next: '5.7' },
                    { label: 'Customer Retention', next: '6.1' },
                    { label: 'Sales Growth', next: '5.7' }
                ]
            },
            {
                id: '5.7',
                text: 'Topic 5 - Question 7 (Final): Confirm your sales process selections (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Process Confirmed', next: '6.1' },
                    { label: 'Reassess', next: '6.1' }
                ]
            }
        ]
    },
    {
        topicId: '6',
        questions: [
            {
                id: '6.1',
                text: 'Topic 6 - Question 1: What is your customer support model?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'In-house', next: '6.3' },
                    { label: 'Outsourced', next: '6.4' },
                    { label: 'Hybrid', next: '7.1' }
                ]
            },
            {
                id: '6.2',
                text: 'Topic 6 - Question 2: Which support channels do you offer?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Phone', next: '6.4' },
                    { label: 'Email', next: '6.3' },
                    { label: 'Chat', next: '7.1' }
                ]
            },
            {
                id: '6.3',
                text: 'Topic 6 - Question 3: Select all support channels you provide (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Live Chat', next: '6.4' },
                    { label: 'Social Media', next: '6.4' },
                    { label: 'Helpdesk', next: '6.4' }
                ]
            },
            {
                id: '6.4',
                text: 'Topic 6 - Question 4: How do you measure customer satisfaction?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Surveys', next: '6.6' },
                    { label: 'NPS', next: '6.7' },
                    { label: 'Direct Feedback', next: '7.1' }
                ]
            },
            {
                id: '6.5',
                text: 'Topic 6 - Question 5: What is your average response time?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Under 1 hour', next: '6.7' },
                    { label: '1-3 hours', next: '7.1' },
                    { label: 'Over 3 hours', next: '6.7' }
                ]
            },
            {
                id: '6.6',
                text: 'Topic 6 - Question 6: Do you offer 24/7 support?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Yes', next: '6.7' },
                    { label: 'No', next: '7.1' },
                    { label: 'Planned', next: '6.7' }
                ]
            },
            {
                id: '6.7',
                text: 'Topic 6 - Question 7 (Final): Confirm your support model selections (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Support Confirmed', next: '7.1' },
                    { label: 'Need Adjustments', next: '7.1' }
                ]
            }
        ]
    },
    {
        topicId: '7',
        questions: [
            {
                id: '7.1',
                text: 'Topic 7 - Question 1: What is your overall business strategy?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Growth', next: '7.3' },
                    { label: 'Stability', next: '7.2' },
                    { label: 'Innovation', next: 'unused' }
                ]
            },
            {
                id: '7.2',
                text: 'Topic 7 - Question 2: Which market trends affect you most?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Digitalization', next: '7.3' },
                    { label: 'Sustainability', next: '7.4' },
                    { label: 'Globalization', next: 'unused' }
                ]
            },
            {
                id: '7.3',
                text: 'Topic 7 - Question 3: Select all trends relevant to your business (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Remote Work', next: '7.4' },
                    { label: 'Green Energy', next: '7.4' },
                    { label: 'E-commerce', next: '7.4' }
                ]
            },
            {
                id: '7.4',
                text: 'Topic 7 - Question 4: How do you approach risk management?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Proactive', next: '7.6' },
                    { label: 'Reactive', next: '7.7' },
                    { label: 'Mixed', next: 'unused' }
                ]
            },
            {
                id: '7.5',
                text: 'Topic 7 - Question 5: What is your investment priority?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Technology', next: '7.7' },
                    { label: 'Infrastructure', next: '7.6' },
                    { label: 'R&D', next: 'unused' }
                ]
            },
            {
                id: '7.6',
                text: 'Topic 7 - Question 6: Which regions are you focusing on?',
                type: ButtonType.RadioButton,
                answers: [
                    { label: 'Domestic', next: '7.7' },
                    { label: 'International', next: 'unused' },
                    { label: 'Both', next: '7.7' }
                ]
            },
            {
                id: '7.7',
                text: 'Topic 7 - Question 7 (Final): Finalize your business strategy selections (Select all that apply)',
                type: ButtonType.Checkbox,
                answers: [
                    { label: 'Strategy Finalized', next: 'unused' },
                    { label: 'Reassess', next: 'unused' }
                ]
            }
        ]
    }
];
