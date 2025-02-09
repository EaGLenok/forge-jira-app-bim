import React from 'react';
import { Box, Button, Textfield, Select, xcss } from '@forge/react';
import { QuestionNode, ButtonType } from '../../../utils/types';

const answerContainerStyles = xcss({
    display: 'block',
    marginTop: 'space.200',
    padding: 'space.200',
    backgroundColor: 'color.background.neutral.subtle',
    borderRadius: 'border.radius',
});

const inputRowStyles = xcss({
    display: 'inline-block',
    marginRight: 'space.100',
});

const removeButtonRowStyles = xcss({
    display: 'inline-block',
    marginLeft: 'space.100',
});

const nextSelectWrapperStyles = xcss({
    display: 'block',
    marginTop: 'space.100',
});

const narrowSelectStyles = xcss({
    display: 'inline-block',
    width: '300px',
});

function parseId(id: string) {
    const [topicStr, questionStr] = id.split('.');
    return {
        topicNum: parseInt(topicStr, 10),
        questionNum: parseInt(questionStr, 10),
    };
}

function isIdAfter(currentId: string, candidateId: string) {
    const current = parseId(currentId);
    const candidate = parseId(candidateId);
    if (candidate.topicNum > current.topicNum) return true;
    if (candidate.topicNum < current.topicNum) return false;
    return candidate.questionNum > current.questionNum;
}

interface Props {
    topicId: string;
    question: QuestionNode;
    allQuestionIds: string[];
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
}

const AnswerList: React.FC<Props> = ({topicId, question, allQuestionIds, onRemoveAnswer, onAnswerLabelChange, onRadioNextChange}) => {
    return (
        <>
            {question.answers.map((ans, idx) => (
                <Box key={idx} xcss={answerContainerStyles}>
                    <Box>
                        <Box xcss={inputRowStyles}>
                            <Textfield
                                placeholder="Answer"
                                value={ans.label}
                                onChange={(e) =>
                                    onAnswerLabelChange(topicId, question.id, idx, e.target.value)
                                }
                            />
                        </Box>
                        <Box xcss={removeButtonRowStyles}>
                            <Button
                                appearance="danger"
                                onClick={() => onRemoveAnswer(topicId, question.id, idx)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Box>

                    {question.type === ButtonType.RadioButton && (
                        <Box xcss={nextSelectWrapperStyles}>
                            <Box xcss={narrowSelectStyles}>
                                <Select
                                    placeholder="Next Question"
                                    options={allQuestionIds
                                        .filter((id) => isIdAfter(question.id, id))
                                        .map((id) => ({ label: id, value: id }))}
                                    value={
                                        ans.next && ans.next !== 'unused'
                                            ? { label: ans.next, value: ans.next }
                                            : null
                                    }
                                    onChange={(option) => {
                                        if (!option) return;
                                        onRadioNextChange(topicId, question.id, idx, option.value);
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            ))}
        </>
    );
};

export default AnswerList;
