import React from 'react';
import { Box, Heading, Text, xcss } from '@forge/react';

interface UserAnswersProps {
    history: string[];
    userAnswers: Record<string, string | string[]>;
}

const visitedPathBoxStyles = xcss({
    margin: 'space.500',
    backgroundColor: 'color.background.neutral.subtle',
    borderColor: 'color.border',
    borderWidth: 'border.width',
    borderStyle: 'dotted',
    borderRadius: 'border.radius',
    padding: 'space.300',
    display: 'block',
});

const UserAnswers: React.FC<UserAnswersProps> = ({ history, userAnswers }) => (
    <Box xcss={visitedPathBoxStyles}>
        <Heading as="h3">User Answers</Heading>
        {history.map((qid) => (
            <Text key={qid}>
                {qid}: {userAnswers[qid] ? JSON.stringify(userAnswers[qid]) : 'No answer'}
            </Text>
        ))}
    </Box>
);

export default UserAnswers;
