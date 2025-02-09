import React from 'react';
import { Box, Button, Heading, xcss } from '@forge/react';
import QuestionCard from './QuestionCard';
import { Topic, ButtonType } from '../../../utils/types';

const topicContainerStyles = xcss({
    display: 'block',
    marginBottom: 'space.400',
    padding: 'space.400',
    borderWidth: 'border.width',
    borderColor: 'color.border',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    backgroundColor: 'elevation.surface.raised',
});

const headingRowStyles = xcss({
    display: 'inline-block',
    marginRight: 'space.100',
});

const removeButtonWrapperStyles = xcss({
    display: 'inline-block',
    marginLeft: 'space.100',
});

const addQuestionWrapperStyles = xcss({
    display: 'block',
    marginTop: 'space.200',
});

interface Props {
    topic: Topic;
    allQuestionIds: string[];
    onRemoveTopic: (topicId: string) => void;
    onAddQuestion: (topicId: string) => void;
    onRemoveQuestion: (topicId: string, questionId: string) => void;
    onQuestionTextChange: (topicId: string, questionId: string, newText: string) => void;
    onQuestionTypeChange: (topicId: string, questionId: string, newType: ButtonType) => void;
    onAddAnswer: (topicId: string, questionId: string) => void;
    onRemoveAnswer: (topicId: string, questionId: string, index: number) => void;
    onAnswerLabelChange: (
        topicId: string,
        questionId: string,
        index: number,
        newLabel: string
    ) => void;
    onRadioNextChange: (
        topicId: string,
        questionId: string,
        answerIndex: number,
        nextId: string
    ) => void;
    onCheckBoxNextChange: (
        topicId: string,
        questionId: string,
        nextId: string
    ) => void;
}

const TopicCard: React.FC<Props> = ({topic, allQuestionIds, onRemoveTopic, onAddQuestion, onRemoveQuestion, onQuestionTextChange, onQuestionTypeChange, onAddAnswer, onRemoveAnswer, onAnswerLabelChange, onRadioNextChange, onCheckBoxNextChange}) => {
    return (
        <Box xcss={topicContainerStyles}>
            <Box xcss={headingRowStyles}>
                <Heading as="h3">Topic {topic.topicId}</Heading>
            </Box>
            <Box xcss={removeButtonWrapperStyles}>
                <Button appearance="danger" onClick={() => onRemoveTopic(topic.topicId)}>
                    Remove
                </Button>
            </Box>

            <Box xcss={addQuestionWrapperStyles}>
                <Button appearance="default" onClick={() => onAddQuestion(topic.topicId)}>
                    + Add Question
                </Button>
            </Box>

            {topic.questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    topicId={topic.topicId}
                    question={question}
                    allQuestionIds={allQuestionIds}
                    onRemoveQuestion={onRemoveQuestion}
                    onQuestionTextChange={onQuestionTextChange}
                    onQuestionTypeChange={onQuestionTypeChange}
                    onAddAnswer={onAddAnswer}
                    onRemoveAnswer={onRemoveAnswer}
                    onAnswerLabelChange={onAnswerLabelChange}
                    onRadioNextChange={onRadioNextChange}
                    onCheckBoxNextChange={onCheckBoxNextChange}
                />
            ))}
        </Box>
    );
};

export default TopicCard;
