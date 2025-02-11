import React, { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Text,
    Textfield,
    Select,
    xcss,
    Modal,
    ModalBody,
    ModalTransition,
    ModalTitle,
    ModalFooter,
    ModalHeader
} from '@forge/react';
import { QuestionNode, ButtonType } from '../../../utils/types';
import AnswerList from './AnswerList';

interface Props {
    topicId: string;
    question: QuestionNode;
    allQuestions: QuestionNode[];
    level: number;
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

const displayRowStyle = xcss({
    display: 'block',
    marginBottom: 'space.200'
});

const displayCellStyle = (width: string) =>
    xcss({
        display: 'inline-block',
        verticalAlign: 'middle',
        width
    });

const headerStyle = xcss({
    display: 'block',
    marginBottom: 'space.200',
    fontWeight: 'bold'
});

const QuestionNodeCard: React.FC<Props> = ({topicId, question, allQuestions, level, onRemoveQuestion, onQuestionTextChange, onQuestionTypeChange, onAddAnswer, onRemoveAnswer, onAnswerLabelChange, onRadioNextChange, onCheckBoxNextChange, onAddSubQuestion, onRemoveSubQuestion}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Box
                xcss={xcss({
                    display: 'block',
                    marginBottom: 'space.400',
                    padding: 'space.400',
                    borderWidth: 'border.width',
                    borderColor: level === 0 ? 'color.border.accent.blue' : 'color.border',
                    borderStyle: 'solid',
                    borderRadius: 'border.radius',
                    backgroundColor: level === 0 ? 'elevation.surface.sunken' : 'elevation.surface.raised'
                })}
            >
                <Box xcss={headerStyle}>
                    <Box xcss={displayCellStyle('70%')}>
                        <Heading as="h4">Question {question.id}</Heading>
                    </Box>
                    <Box xcss={displayCellStyle('30%')}>
                        <Button appearance="default" onClick={() => setIsModalOpen(true)}>
                            Edit
                        </Button>
                        <Button appearance="danger" onClick={() => onRemoveQuestion(topicId, question.id)}>
                            Remove
                        </Button>
                    </Box>
                </Box>
                <Box xcss={displayRowStyle}>
                    <Box xcss={displayCellStyle('100%')}>
                        <Text>Text: {question.text || "No text"}</Text>
                    </Box>
                </Box>
                <Box xcss={displayRowStyle}>
                    <Box xcss={displayCellStyle('100%')}>
                        <Text>Type: {question.type}</Text>
                    </Box>
                </Box>
                <Box xcss={headerStyle}>
                    <Text>Answers:</Text>
                </Box>
                {question.answers.length > 0 ? (
                    question.answers.map((ans, idx) => (
                        <Box key={idx} xcss={displayRowStyle}>
                            <Box xcss={displayCellStyle('50%')}>
                                <Text>{ans.label || "No label"}</Text>
                            </Box>
                            <Box xcss={displayCellStyle('50%')}>
                                <Text>Next: {ans.next !== 'unused' ? ans.next : '-'}</Text>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box xcss={displayRowStyle}>
                        <Text>No answers</Text>
                    </Box>
                )}
            </Box>
            <ModalTransition>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)} width="medium">
                        <ModalHeader>
                            <ModalTitle>Edit Question {question.id}</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Box xcss={displayRowStyle}>
                                <Textfield
                                    placeholder="Question text"
                                    value={question.text}
                                    onChange={e => onQuestionTextChange(topicId, question.id, e.target.value)}
                                />
                            </Box>
                            <Box xcss={displayRowStyle}>
                                <Select
                                    placeholder="Question Type"
                                    options={[
                                        { label: ButtonType.RadioButton, value: ButtonType.RadioButton },
                                        { label: ButtonType.Checkbox, value: ButtonType.Checkbox }
                                    ]}
                                    value={{ label: question.type, value: question.type }}
                                    onChange={option => {
                                        if (!option) return;
                                        onQuestionTypeChange(topicId, question.id, option.value as string);
                                    }}
                                />
                            </Box>
                            <Box xcss={displayRowStyle}>
                                <AnswerList
                                    topicId={topicId}
                                    question={question}
                                    allQuestions={allQuestions}
                                    level={level}
                                    onRemoveAnswer={onRemoveAnswer}
                                    onAnswerLabelChange={onAnswerLabelChange}
                                    onRadioNextChange={onRadioNextChange}
                                    onAddSubQuestion={onAddSubQuestion}
                                    onRemoveSubQuestion={onRemoveSubQuestion}
                                    onRemoveQuestion={onRemoveQuestion}
                                    onQuestionTextChange={onQuestionTextChange}
                                    onQuestionTypeChange={onQuestionTypeChange}
                                    onAddAnswer={onAddAnswer}
                                    onCheckBoxNextChange={onCheckBoxNextChange}
                                />
                            </Box>
                            <Box xcss={displayRowStyle}>
                                <Button appearance="default" onClick={() => onAddAnswer(topicId, question.id)}>
                                    + Add Answer
                                </Button>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button appearance="subtle" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button appearance="primary" onClick={() => setIsModalOpen(false)}>
                                Save
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
};

export default QuestionNodeCard;
