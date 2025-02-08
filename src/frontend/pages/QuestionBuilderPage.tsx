import React, { useState, useMemo } from 'react';
import { Box, Button, Heading, xcss } from '@forge/react';
import { Topic, ButtonType, QuestionNode, AnswerOption } from '../../utils/types';
import TopicCard from '../components/QuestionBuilder/TopicCard';
import PreviewBlock from '../components/QuestionBuilder/PreviewBlock';

const pageWrapperStyles = xcss({
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'color.background.neutral.subtle',
    padding: 'space.600',
});

const headerStyles = xcss({
    marginBottom: 'space.400',
});

const addTopicWrapperStyles = xcss({
    marginBottom: 'space.300',
});

function generateTopicId(topics: Topic[]): string {
    if (topics.length === 0) return '1';
    const maxId = Math.max(...topics.map(t => parseInt(t.topicId, 10)));
    return String(maxId + 1);
}

function generateQuestionId(topic: Topic): string {
    const newIndex = topic.questions.length + 1;
    return `${topic.topicId}.${newIndex}`;
}

const QuestionBuilderPage: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

    const allQuestionIds = useMemo(() => {
        const ids: string[] = [];
        topics.forEach(topic => {
            topic.questions.forEach(q => ids.push(q.id));
        });
        return ids;
    }, [topics]);

    const handleAddTopic = () => {
        const newTopicId = generateTopicId(topics);
        const newTopic: Topic = { topicId: newTopicId, questions: [] };
        setTopics(prev => [...prev, newTopic]);
    };

    const handleRemoveTopic = (topicId: string) => {
        setTopics(prev => prev.filter(t => t.topicId !== topicId));
    };

    const handleAddQuestion = (topicId: string) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const newQuestion: QuestionNode = {
                    id: generateQuestionId(t),
                    text: 'New question',
                    type: ButtonType.RadioButton,
                    answers: [],
                };
                return { ...t, questions: [...t.questions, newQuestion] };
            })
        );
    };

    const handleRemoveQuestion = (topicId: string, questionId: string) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.filter(q => q.id !== questionId),
                };
            })
        );
    };

    const handleQuestionTextChange = (topicId: string, questionId: string, newText: string) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.map(q =>
                        q.id === questionId ? { ...q, text: newText } : q
                    ),
                };
            })
        );
    };

    const handleQuestionTypeChange = (topicId: string, questionId: string, newType: ButtonType) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.map(q => {
                        if (q.id !== questionId) return q;
                        if (newType === ButtonType.Checkbox) {
                            const updatedAnswers = q.answers.map(a => ({ ...a, next: 'auto' }));
                            return { ...q, type: newType, answers: updatedAnswers };
                        }
                        return { ...q, type: newType };
                    }),
                };
            })
        );
    };

    const handleAddAnswer = (topicId: string, questionId: string) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const newAnswer: AnswerOption = {
                            label: 'Option ...',
                            next: q.type === ButtonType.Checkbox ? 'auto' : 'unused',
                        };
                        return { ...q, answers: [...q.answers, newAnswer] };
                    }),
                };
            })
        );
    };

    const handleRemoveAnswer = (topicId: string, questionId: string, index: number) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const updated = [...q.answers];
                        updated.splice(index, 1);
                        return { ...q, answers: updated };
                    }),
                };
            })
        );
    };

    const handleAnswerLabelChange = (
        topicId: string,
        questionId: string,
        index: number,
        newLabel: string
    ) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const newAnswers = [...q.answers];
                        newAnswers[index] = { ...newAnswers[index], label: newLabel };
                        return { ...q, answers: newAnswers };
                    }),
                };
            })
        );
    };

    const handleRadioNextChange = (
        topicId: string,
        questionId: string,
        answerIndex: number,
        nextId: string
    ) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                return {
                    ...t,
                    questions: t.questions.map(q => {
                        if (q.id !== questionId) return q;
                        if (q.type !== ButtonType.RadioButton) return q;
                        const newArr = [...q.answers];
                        newArr[answerIndex] = { ...newArr[answerIndex], next: nextId };
                        return { ...q, answers: newArr };
                    }),
                };
            })
        );
    };

    return (
        <Box xcss={pageWrapperStyles}>
            <Heading as="h2">
                Question Builder
            </Heading>

            <Box xcss={addTopicWrapperStyles}>
                <Button appearance="primary" onClick={handleAddTopic}>
                    + Add Topic
                </Button>
            </Box>

            {topics.map(topic => (
                <TopicCard
                    key={topic.topicId}
                    topic={topic}
                    allQuestionIds={allQuestionIds}
                    onRemoveTopic={handleRemoveTopic}
                    onAddQuestion={handleAddQuestion}
                    onRemoveQuestion={handleRemoveQuestion}
                    onQuestionTextChange={handleQuestionTextChange}
                    onQuestionTypeChange={handleQuestionTypeChange}
                    onAddAnswer={handleAddAnswer}
                    onRemoveAnswer={handleRemoveAnswer}
                    onAnswerLabelChange={handleAnswerLabelChange}
                    onRadioNextChange={handleRadioNextChange}
                />
            ))}

            <PreviewBlock data={topics} />
        </Box>
    );
};

export default QuestionBuilderPage;
