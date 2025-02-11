import React, { useState } from 'react';
import { Box, Button, Heading, Text, xcss } from '@forge/react';
import QuestionNodeCard from './QuestionNodeCard';
import { Topic } from '../../../utils/types';

interface Props {
    topic: Topic;
    onRemoveTopic: (topicId: string) => void;
    onAddQuestion: (topicId: string) => void;
    onRemoveQuestion: (topicId: string, questionId: string) => void;
    onQuestionTextChange: (topicId: string, questionId: string, newText: string) => void;
    onQuestionTypeChange: (topicId: string, questionId: string, newType: string) => void;
    onAddAnswer: (topicId: string, questionId: string) => void;
    onRemoveAnswer: (topicId: string, questionId: string, answerIndex: number) => void;
    onAnswerLabelChange: (topicId: string, questionId: string, answerIndex: number, newLabel: string) => void;
    onRadioNextChange: (topicId: string, questionId: string, answerIndex: number, nextId: string) => void;
    onCheckBoxNextChange: (topicId: string, questionId: string, nextId: string) => void;
    onAddSubQuestion: (topicId: string, parentQuestionId: string, answerIndex: number) => void;
    onRemoveSubQuestion: (topicId: string, parentQuestionId: string, answerIndex: number) => void;
}

const rowStyle = xcss({
    display: 'block',
    borderBottomWidth: 'border.width',
    borderBottomColor: 'color.border',
    borderBottomStyle: 'solid',
    padding: 'space.200'
});

const cellStyle = (width: string) =>
    xcss({
        display: 'inline-block',
        verticalAlign: 'middle',
        width
    });

const expandedContainer = xcss({
    display: 'block',
    padding: 'space.200'
});

const TopicCard: React.FC<Props> = ({topic, onRemoveTopic, onAddQuestion, onRemoveQuestion, onQuestionTextChange, onQuestionTypeChange, onAddAnswer, onRemoveAnswer, onAnswerLabelChange, onRadioNextChange, onCheckBoxNextChange, onAddSubQuestion, onRemoveSubQuestion}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Box>
            <Box xcss={rowStyle}>
                <Box xcss={cellStyle('20%')}>
                    <Heading as="h4">Topic {topic.topicId}</Heading>
                </Box>
                <Box xcss={cellStyle('20%')}>
                    <Text>Questions: {topic.questions.length}</Text>
                </Box>
                <Box xcss={cellStyle('40%')}>
                    <Button appearance="default" onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Collapse' : 'Expand'}
                    </Button>
                </Box>
                <Box xcss={cellStyle('20%')}>
                    <Button appearance="danger" onClick={() => onRemoveTopic(topic.topicId)}>
                        Remove
                    </Button>
                </Box>
            </Box>
            {expanded && (
                <Box xcss={expandedContainer}>
                    <Button appearance="default" onClick={() => onAddQuestion(topic.topicId)}>
                        + Add Question
                    </Button>
                    {topic.questions.map(q => (
                        <QuestionNodeCard
                            key={q.id}
                            topicId={topic.topicId}
                            question={q}
                            allQuestions={topic.questions}
                            level={0}
                            onRemoveQuestion={onRemoveQuestion}
                            onQuestionTextChange={onQuestionTextChange}
                            onQuestionTypeChange={onQuestionTypeChange}
                            onAddAnswer={onAddAnswer}
                            onRemoveAnswer={onRemoveAnswer}
                            onAnswerLabelChange={onAnswerLabelChange}
                            onRadioNextChange={onRadioNextChange}
                            onCheckBoxNextChange={onCheckBoxNextChange}
                            onAddSubQuestion={onAddSubQuestion}
                            onRemoveSubQuestion={onRemoveSubQuestion}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TopicCard;
