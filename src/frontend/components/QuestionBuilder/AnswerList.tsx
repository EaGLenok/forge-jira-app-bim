import React from 'react';
import { Box, Button, Text, Textfield, Select, xcss } from '@forge/react';
import { QuestionNode } from '../../../utils/types';

const answerContainerStyles = xcss({
    display: 'block',
    marginTop: 'space.200',
    padding: 'space.200',
    backgroundColor: 'color.background.neutral.subtle',
    borderRadius: 'border.radius',
});

const labelInputWrapperStyles = xcss({
    display: 'block',
    marginBottom: 'space.100',
});

const radioSelectWrapperStyles = xcss({
    display: 'block',
    marginBottom: 'space.100',
});

const removeButtonWrapperStyles = xcss({
    display: 'block',
    marginTop: 'space.100',
});

function parseId(id: string) {
    const [tStr, qStr] = id.split('.');
    return { topicNum: parseInt(tStr, 10), questionNum: parseInt(qStr, 10) };
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
                    <Box xcss={labelInputWrapperStyles}>
                        <Textfield
                            name="AnswerLabel"
                            value={ans.label}
                            onChange={(e) =>
                                onAnswerLabelChange(topicId, question.id, idx, e.target.value)
                            }
                        />
                    </Box>

                    {question.type === 'RadioButton' && (
                        <Box xcss={radioSelectWrapperStyles}>
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
                    )}

                    {question.type === 'Checkbox' && (
                        <Box xcss={{ marginTop: 'space.100' }}>
                            <Text>
                                Next: {ans.next} (auto)
                            </Text>
                        </Box>
                    )}

                    <Box xcss={removeButtonWrapperStyles}>
                        <Button
                            appearance="subtle"
                            onClick={() => onRemoveAnswer(topicId, question.id, idx)}
                        >
                            Remove
                        </Button>
                    </Box>
                </Box>
            ))}
        </>
    );
};

export default AnswerList;
