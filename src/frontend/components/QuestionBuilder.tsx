import React, { useState } from 'react';
import {
    Box,
    Button,
    Textfield,
    Select,
    Heading,
    xcss,
} from '@forge/react';
import {
    ButtonType,
    AnswerOption,
    QuestionNode,
    Topic
} from '../../utils/types';

function generateTopicId(topics: Topic[]): string {
    if (topics.length === 0) return '1';
    const maxId = Math.max(...topics.map(t => parseInt(t.topicId, 10)));
    return String(maxId + 1);
}

function generateQuestionId(topic: Topic): string {
    const newIndex = topic.questions.length + 1;
    return `${topic.topicId}.${newIndex}`;
}

const builderContainerStyles = xcss({
    padding: 'space.400',
});

const topicContainerStyles = xcss({
    borderColor: 'color.border',
    borderStyle: 'solid',
    borderWidth: 'border.width',
    margin: 'space.300',
    padding: 'space.300',
    borderRadius: 'border.radius',
});

const questionContainerStyles = xcss({
    marginLeft: 'space.300',
    borderLeftColor: 'color.border.discovery',
    borderLeftStyle: 'dashed',
    borderLeftWidth: 'border.width',
    padding: 'space.200',
});

const answerContainerStyles = xcss({
    marginLeft: 'space.300',
    paddingTop: 'space.100',
    paddingBottom: 'space.100',
});

const autoTextStyles = xcss({
    fontStyle: 'italic',
    color: 'color.text.subtlest',
});

const previewContainerStyles = xcss({
    backgroundColor: 'color.background.neutral.subtle',
    padding: 'space.300',
    overflow: 'auto',
    marginTop: 'space.300',
});

const QuestionBuilderPage: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

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
                const newQ: QuestionNode = {
                    id: generateQuestionId(t),
                    text: 'New question',
                    type: ButtonType.RadioButton,
                    answers: [],
                };
                return { ...t, questions: [...t.questions, newQ] };
            })
        );
    };

    const handleRemoveQuestion = (topicId: string, questionId: string) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const filtered = t.questions.filter(q => q.id !== questionId);
                return { ...t, questions: filtered };
            })
        );
    };

    const handleQuestionTextChange = (
        topicId: string,
        questionId: string,
        newText: string
    ) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const updatedQuestions = t.questions.map(q =>
                    q.id === questionId ? { ...q, text: newText } : q
                );
                return { ...t, questions: updatedQuestions };
            })
        );
    };

    const handleQuestionTypeChange = (
        topicId: string,
        questionId: string,
        newType: ButtonType
    ) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const updatedQuestions = t.questions.map(q => {
                    if (q.id !== questionId) return q;
                    if (newType === ButtonType.Checkbox) {
                        const updatedAnswers = q.answers.map(a => ({ ...a, next: 'auto' }));
                        return { ...q, type: newType, answers: updatedAnswers };
                    }
                    return { ...q, type: newType };
                });
                return { ...t, questions: updatedQuestions };
            })
        );
    };

    const handleAddAnswer = (topicId: string, questionId: string) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const updatedQuestions = t.questions.map(q => {
                    if (q.id !== questionId) return q;
                    const newAnswer: AnswerOption = {
                        label: 'Option ...',
                        next: q.type === ButtonType.Checkbox ? 'auto' : 'unused',
                    };
                    return { ...q, answers: [...q.answers, newAnswer] };
                });
                return { ...t, questions: updatedQuestions };
            })
        );
    };

    const handleRemoveAnswer = (
        topicId: string,
        questionId: string,
        index: number
    ) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const updatedQuestions = t.questions.map(q => {
                    if (q.id !== questionId) return q;
                    const newAnswers = [...q.answers];
                    newAnswers.splice(index, 1);
                    return { ...q, answers: newAnswers };
                });
                return { ...t, questions: updatedQuestions };
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
                const updatedQuestions = t.questions.map(q => {
                    if (q.id !== questionId) return q;
                    const newAnswers = [...q.answers];
                    newAnswers[index] = { ...newAnswers[index], label: newLabel };
                    return { ...q, answers: newAnswers };
                });
                return { ...t, questions: updatedQuestions };
            })
        );
    };

    const handleAnswerNextChange = (
        topicId: string,
        questionId: string,
        index: number,
        newNext: string
    ) => {
        setTopics(prev =>
            prev.map(t => {
                if (t.topicId !== topicId) return t;
                const updatedQuestions = t.questions.map(q => {
                    if (q.id !== questionId) return q;
                    if (q.type !== ButtonType.RadioButton) return q;
                    const newAnswers = [...q.answers];
                    newAnswers[index] = { ...newAnswers[index], next: newNext };
                    return { ...q, answers: newAnswers };
                });
                return { ...t, questions: updatedQuestions };
            })
        );
    };

    return (
        <Box xcss={builderContainerStyles}>
            <Heading as="h2">Question Builder</Heading>
            <Button onClick={handleAddTopic}>Add topic</Button>
            {topics.map(topic => (
                <Box key={topic.topicId} xcss={topicContainerStyles}>
                    <Heading as="h3">
                        Topic {topic.topicId}{' '}
                        <Button
                            appearance="danger"
                            onClick={() => handleRemoveTopic(topic.topicId)}
                        >
                            Remove Topic
                        </Button>
                    </Heading>
                    <Button onClick={() => handleAddQuestion(topic.topicId)}>Add Question</Button>
                    {topic.questions.map(question => (
                        <Box key={question.id} xcss={questionContainerStyles}>
                            <Heading as="h4">
                                Question {question.id}{' '}
                                <Button
                                    appearance="danger"
                                    onClick={() => handleRemoveQuestion(topic.topicId, question.id)}
                                >
                                    Remove Question
                                </Button>
                            </Heading>
                            <Textfield
                                name="Question Text"
                                value={question.text}
                                onChange={e =>
                                    handleQuestionTextChange(topic.topicId, question.id, e.target.value)
                                }
                            />
                            <Select
                                placeholder="Question Type"
                                options={[
                                    { label: ButtonType.RadioButton, value: ButtonType.RadioButton },
                                    { label: ButtonType.Checkbox, value: ButtonType.Checkbox },
                                ]}
                                value={{
                                    label: question.type,
                                    value: question.type,
                                }}
                                onChange={selectedOption => {
                                    if (!selectedOption) return;
                                    handleQuestionTypeChange(
                                        topic.topicId,
                                        question.id,
                                        selectedOption.value as ButtonType
                                    );
                                }}
                            />
                            <Button onClick={() => handleAddAnswer(topic.topicId, question.id)}>
                                Add Answer
                            </Button>
                            {question.answers.map((ans, idx) => (
                                <Box key={idx} xcss={answerContainerStyles}>
                                    <Textfield
                                        name="Answer Label"
                                        value={ans.label}
                                        onChange={e =>
                                            handleAnswerLabelChange(
                                                topic.topicId,
                                                question.id,
                                                idx,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {question.type === ButtonType.RadioButton && (
                                        <Textfield
                                            name="Next Question ID"
                                            value={ans.next}
                                            onChange={e =>
                                                handleAnswerNextChange(
                                                    topic.topicId,
                                                    question.id,
                                                    idx,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                    {question.type === ButtonType.Checkbox && (
                                        <Box xcss={autoTextStyles}>Next: {ans.next} (auto)</Box>
                                    )}
                                    <Button
                                        appearance="subtle"
                                        onClick={() => handleRemoveAnswer(topic.topicId, question.id, idx)}
                                    >
                                        Remove Answer
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            ))}
            <Heading as="h4">Current Topics</Heading>
            <Box xcss={previewContainerStyles}>
                <Box>{JSON.stringify(topics, null, 2)}</Box>
            </Box>
        </Box>
    );
};

export default QuestionBuilderPage;
