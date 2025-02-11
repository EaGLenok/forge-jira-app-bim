import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import { Box, Button, Heading, xcss } from '@forge/react';
import TopicCard from '../components/QuestionBuilder/TopicCard';
import PreviewBlock from '../components/QuestionBuilder/PreviewBlock';
import { Topic, QuestionNode, ButtonType } from '../../utils/types';

const pageWrapperStyles = xcss({
    display: 'block',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'color.background.neutral.subtle',
    padding: 'space.600'
});

const addTopicWrapperStyles = xcss({
    display: 'block',
    marginBottom: 'space.300'
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

const QuestionBuilderPage = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const stored: Topic[] = await invoke('getQuestions');
                if (Array.isArray(stored) && stored.length > 0) {
                    setTopics(stored);
                } else {
                    console.warn('WARNING: No data found in storage or empty array returned.');
                }
            } catch (error) {
                console.error('Error loading topics from storage:', error);
            }
        })();
    }, []);
    useEffect(() => {
        if (!Array.isArray(topics) || topics.length === 0) return;
        (async () => {
            try {
                await invoke('saveQuestions', topics);
            } catch (error) {
                console.error('ERROR: Failed to save topics to storage:', error);
            }
        })();
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
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                const newQuestion: QuestionNode = {
                    id: generateQuestionId(topic),
                    text: '',
                    type: ButtonType.RadioButton,
                    answers: [],
                    next: 'unused'
                };
                return { ...topic, questions: [...topic.questions, newQuestion] };
            })
        );
    };
    const handleRemoveQuestion = (topicId: string, questionId: string) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return { ...topic, questions: topic.questions.filter(q => q.id !== questionId) };
            })
        );
    };
    const handleQuestionTextChange = (topicId: string, questionId: string, newText: string) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q => (q.id === questionId ? { ...q, text: newText } : q))
                };
            })
        );
    };
    const handleQuestionTypeChange = (topicId: string, questionId: string, newType: ButtonType) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q => {
                        if (q.id !== questionId) return q;
                        if (newType === ButtonType.Checkbox) {
                            return {
                                ...q,
                                type: newType,
                                next: 'unused',
                                answers: q.answers.map(a => ({ ...a, next: 'unused' }))
                            };
                        }
                        return { ...q, type: newType };
                    })
                };
            })
        );
    };
    const handleAddAnswer = (topicId: string, questionId: string) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const newAnswer = { label: '', next: 'unused' };
                        return { ...q, answers: [...q.answers, newAnswer] };
                    })
                };
            })
        );
    };
    const handleRemoveAnswer = (topicId: string, questionId: string, answerIndex: number) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const updated = [...q.answers];
                        updated.splice(answerIndex, 1);
                        return { ...q, answers: updated };
                    })
                };
            })
        );
    };
    const handleAnswerLabelChange = (topicId: string, questionId: string, answerIndex: number, newLabel: string) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const newAnswers = q.answers.map((a, idx) => (idx === answerIndex ? { ...a, label: newLabel } : a));
                        return { ...q, answers: newAnswers };
                    })
                };
            })
        );
    };
    const handleRadioNextChange = (topicId: string, questionId: string, answerIndex: number, nextId: string) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q => {
                        if (q.id !== questionId) return q;
                        const newAnswers = q.answers.map((a, idx) =>
                            idx === answerIndex ? { ...a, next: nextId } : a
                        );
                        return { ...q, answers: newAnswers };
                    })
                };
            })
        );
    };
    const handleCheckBoxNextChange = (topicId: string, questionId: string, nextId: string) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                return {
                    ...topic,
                    questions: topic.questions.map(q =>
                        q.id === questionId ? { ...q, next: nextId } : q
                    )
                };
            })
        );
    };
    const handleAddSubQuestion = (topicId: string, parentQuestionId: string, answerIndex: number) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                const newId = generateQuestionId(topic);
                const newQuestion: QuestionNode = {
                    id: newId,
                    text: '',
                    type: ButtonType.RadioButton,
                    answers: [],
                    next: 'unused'
                };
                const updatedQuestions = topic.questions.map(q => {
                    if (q.id === parentQuestionId) {
                        const updatedAnswers = q.answers.map((ans, idx) =>
                            idx === answerIndex ? { ...ans, next: newId } : ans
                        );
                        return { ...q, answers: updatedAnswers };
                    }
                    return q;
                });
                return { ...topic, questions: [...updatedQuestions, newQuestion] };
            })
        );
    };
    const handleRemoveSubQuestion = (topicId: string, parentQuestionId: string, answerIndex: number) => {
        setTopics(prev =>
            prev.map(topic => {
                if (topic.topicId !== topicId) return topic;
                let subQuestionId = '';
                const updatedQuestions = topic.questions.map(q => {
                    if (q.id === parentQuestionId) {
                        const updatedAnswers = q.answers.map((ans, idx) => {
                            if (idx === answerIndex) {
                                subQuestionId = ans.next;
                                return { ...ans, next: 'unused' };
                            }
                            return ans;
                        });
                        return { ...q, answers: updatedAnswers };
                    }
                    return q;
                });
                const filteredQuestions = updatedQuestions.filter(q => q.id !== subQuestionId);
                return { ...topic, questions: filteredQuestions };
            })
        );
    };
    return (
        <Box xcss={pageWrapperStyles}>
            <Heading as="h2">Question Builder</Heading>
            <Box xcss={addTopicWrapperStyles}>
                <Button appearance="primary" onClick={handleAddTopic}>
                    + Add Topic
                </Button>
            </Box>
            {topics.map(topic => (
                <TopicCard
                    key={topic.topicId}
                    topic={topic}
                    onRemoveTopic={handleRemoveTopic}
                    onAddQuestion={handleAddQuestion}
                    onRemoveQuestion={handleRemoveQuestion}
                    onQuestionTextChange={handleQuestionTextChange}
                    onQuestionTypeChange={handleQuestionTypeChange}
                    onAddAnswer={handleAddAnswer}
                    onRemoveAnswer={handleRemoveAnswer}
                    onAnswerLabelChange={handleAnswerLabelChange}
                    onRadioNextChange={handleRadioNextChange}
                    onCheckBoxNextChange={handleCheckBoxNextChange}
                    onAddSubQuestion={handleAddSubQuestion}
                    onRemoveSubQuestion={handleRemoveSubQuestion}
                />
            ))}
            <PreviewBlock data={topics} />
        </Box>
    );
};

export default QuestionBuilderPage;
