import React from 'react';
import { Box, Button, Textfield, Select, xcss } from '@forge/react';
import { QuestionNode, ButtonType } from '../../../utils/types';
import QuestionNodeCard from './QuestionNodeCard';

interface Props {
    topicId: string;
    question: QuestionNode;
    allQuestions: QuestionNode[];
    level: number;
    onRemoveAnswer: (topicId: string, questionId: string, answerIndex: number) => void;
    onAnswerLabelChange: (topicId: string, questionId: string, answerIndex: number, newLabel: string) => void;
    onRadioNextChange: (topicId: string, questionId: string, answerIndex: number, nextId: string) => void;
    onAddSubQuestion: (topicId: string, parentQuestionId: string, answerIndex: number) => void;
    onRemoveSubQuestion: (topicId: string, parentQuestionId: string, answerIndex: number) => void;
    onRemoveQuestion: (topicId: string, questionId: string) => void;
    onQuestionTextChange: (topicId: string, questionId: string, newText: string) => void;
    onQuestionTypeChange: (topicId: string, questionId: string, newType: string) => void;
    onAddAnswer: (topicId: string, questionId: string) => void;
    onCheckBoxNextChange: (topicId: string, questionId: string, nextId: string) => void;
}

function isIdAfter(currentId: string, candidateId: string): boolean {
    const parseId = (id: string) => id.split('.').map(Number);
    const current = parseId(currentId);
    const candidate = parseId(candidateId);
    for (let i = 0; i < Math.max(current.length, candidate.length); i++) {
        if ((candidate[i] || 0) > (current[i] || 0)) return true;
        if ((candidate[i] || 0) < (current[i] || 0)) return false;
    }
    return false;
}

const tableRowStyle = xcss({
    display: 'block',
    marginBottom: 'space.200'
});

const tableCellStyle = (width: string) =>
    xcss({
        display: 'inline-block',
        verticalAlign: 'middle',
        width
    });

const tableHeaderStyle = xcss({
    display: 'block',
    marginBottom: 'space.200',
    fontWeight: 'bold'
});

const nestedContainerStyle = xcss({
    display: 'block',
    marginLeft: 'space.300',
    marginTop: 'space.200'
});

const AnswerList: React.FC<Props> = ({topicId, question, allQuestions, level, onRemoveAnswer, onAnswerLabelChange, onRadioNextChange, onAddSubQuestion, onRemoveSubQuestion, onRemoveQuestion, onQuestionTextChange, onQuestionTypeChange, onAddAnswer, onCheckBoxNextChange}) => {
    const headerColumns =
        question.type === ButtonType.RadioButton
            ? [
                { label: 'Answer', width: '40%' },
                { label: 'Nest question', width: '25%' },
                { label: 'Subqestion', width: '20%' },
                { label: 'Action', width: '15%' }
            ]
            : [
                { label: 'Answer', width: '50%' },
                { label: 'Subqestion', width: '30%' },
                { label: 'Action', width: '20%' }
            ];
    return (
        <Box>
            <Box xcss={tableHeaderStyle}>
                {headerColumns.map((col, index) => (
                    <Box key={index} xcss={tableCellStyle(col.width)}>
                        {col.label}
                    </Box>
                ))}
            </Box>
            {question.answers.map((ans, idx) => {
                const availableOptions = allQuestions
                    .filter(q => isIdAfter(question.id, q.id))
                    .map(q => ({ label: q.id, value: q.id }));
                const nestedQuestion =
                    ans.next && ans.next !== 'unused'
                        ? allQuestions.find(q => q.id === ans.next)
                        : undefined;
                return (
                    <Box key={idx}>
                        <Box xcss={tableRowStyle}>
                            <Box xcss={tableCellStyle(headerColumns[0].width)}>
                                <Textfield
                                    placeholder="Answer"
                                    value={ans.label}
                                    onChange={e => onAnswerLabelChange(topicId, question.id, idx, e.target.value)}
                                />
                            </Box>
                            {question.type === ButtonType.RadioButton && (
                                <Box xcss={tableCellStyle(headerColumns[1].width)}>
                                    <Select
                                        placeholder="Next Question"
                                        options={availableOptions}
                                        value={
                                            ans.next && ans.next !== 'unused'
                                                ? { label: ans.next, value: ans.next }
                                                : null
                                        }
                                        onChange={option => {
                                            if (!option) return;
                                            onRadioNextChange(topicId, question.id, idx, option.value as string);
                                        }}
                                    />
                                </Box>
                            )}
                            <Box
                                xcss={tableCellStyle(
                                    question.type === ButtonType.RadioButton
                                        ? headerColumns[2].width
                                        : headerColumns[1].width
                                )}
                            >
                                {(!ans.next || ans.next === 'unused') ? (
                                    <Button appearance="primary" onClick={() => onAddSubQuestion(topicId, question.id, idx)}>
                                        + Add Sub‑Question
                                    </Button>
                                ) : (
                                    <Button appearance="subtle" onClick={() => onRemoveSubQuestion(topicId, question.id, idx)}>
                                        Remove Sub‑Question
                                    </Button>
                                )}
                            </Box>
                            <Box
                                xcss={tableCellStyle(
                                    question.type === ButtonType.RadioButton
                                        ? headerColumns[3].width
                                        : headerColumns[2].width
                                )}
                            >
                                <Button appearance="danger" onClick={() => onRemoveAnswer(topicId, question.id, idx)}>
                                    Remove Answer
                                </Button>
                            </Box>
                        </Box>
                        {nestedQuestion && (
                            <Box xcss={nestedContainerStyle}>
                                <QuestionNodeCard
                                    topicId={topicId}
                                    question={nestedQuestion}
                                    allQuestions={allQuestions}
                                    level={level + 1}
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
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default AnswerList;
