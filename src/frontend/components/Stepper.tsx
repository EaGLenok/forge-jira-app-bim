import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Text,
  Heading,
  xcss,
  ProgressBar,
} from '@forge/react';
import {invoke} from "@forge/bridge";

type AnswerOption = {
  label: string;
  next: string;
};

type QuestionNode = {
  id: string;
  text: string;
  answers: AnswerOption[];
};

const questionData: Record<string, QuestionNode> = {
  q1: {
    id: 'q1',
    text: 'Question 1',
    answers: [
      { label: 'Go to Q2', next: 'q2' },
      { label: 'Go to Q3', next: 'q3' },
    ],
  },
  q2: {
    id: 'q2',
    text: 'Question 2',
    answers: [
      { label: 'Go to Q4', next: 'q4' },
      { label: 'Go to Q5', next: 'q5' },
    ],
  },
  q3: {
    id: 'q3',
    text: 'Question 3',
    answers: [
      { label: 'Go to Q6', next: 'q6' },
      { label: 'Go to Q7', next: 'q7' },
    ],
  },
  q4: { id: 'q4', text: 'Question 4 (end)', answers: [] },
  q5: { id: 'q5', text: 'Question 5 (end)', answers: [] },
  q6: { id: 'q6', text: 'Question 6 (end)', answers: [] },
  q7: { id: 'q7', text: 'Question 7 (end)', answers: [] },
};

const containerStyles = xcss({
  width: '1000px',
  margin: 'space.800',
  padding: 'space.600',
  backgroundColor: 'elevation.surface.sunken',
  boxShadow: 'elevation.shadow.raised',
  borderColor: 'color.border',
  borderWidth: 'border.width',
  borderStyle: 'solid',
  borderRadius: 'border.radius',
  overflow: 'hidden',
});

const questionBoxStyles = xcss({
  margin: 'space.600',
  padding: 'space.500',
  backgroundColor: 'color.background.accent.blue.subtlest',
  borderColor: 'color.border.discovery',
  borderWidth: 'border.width',
  borderStyle: 'solid',
  borderRadius: 'border.radius',
  wordWrap: 'break-word',
});

const answersBoxStyles = xcss({
  margin: 'space.300',
  display: 'inline-block',
  gap: 'space.200',
});

const navButtonBoxStyles = xcss({
  margin: 'space.400',
  display: 'inline-block',
  gap: 'space.200',
});

const visitedPathBoxStyles = xcss({
  margin: 'space.500',
  backgroundColor: 'color.background.neutral.subtle',
  borderColor: 'color.border',
  borderWidth: 'border.width',
  borderStyle: 'dotted',
  borderRadius: 'border.radius',
  padding: 'space.300',
});

const Stepper: React.FC = () => {
  const [apiData, setApiData] = useState(null);
  const [history, setHistory] = useState<string[]>(['q1']);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const currentId = history[history.length - 1];
  const currentQuestion = questionData[currentId];
  if (!currentQuestion) {
    return (
        <Box xcss={containerStyles}>
          <Heading as="h1">Invalid question: {currentId}</Heading>
        </Box>
    );
  }
  const selected = userAnswers[currentId] || '';
  const isLeaf = currentQuestion.answers.length === 0;
  const getRemainingDepth = (qid: string): number => {
    const q = questionData[qid];
    if (!q || q.answers.length === 0) return 1;
    if (userAnswers[qid]) {
      const chosen = q.answers.find(a => a.label === userAnswers[qid]);
      return chosen ? 1 + getRemainingDepth(chosen.next) : 1;
    } else {
      const depths = q.answers.map(a => getRemainingDepth(a.next));
      return 1 + Math.max(...depths);
    }
  };
  const totalBranchLength = (history.length - 1) + getRemainingDepth(currentId);
  const progressValue = isLeaf ? 1 : totalBranchLength > 0 ? history.length / totalBranchLength : 0;
  const progressAppearance = isLeaf ? 'success' : 'default';
  const handleSelect = (label: string) => {
    setUserAnswers(prev => ({ ...prev, [currentId]: label }));
  };
  const handleNext = () => {
    if (isLeaf) return;
    const nextOption = currentQuestion.answers.find(a => a.label === selected);
    if (!nextOption) return;
    setHistory(prev => [...prev, nextOption.next]);
  };
  const handleBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    invoke("fetchExternalData")
        .then((data) => setApiData(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
      <Box xcss={containerStyles}>
        <Box>
          {apiData ? `Fetched URL: ${apiData.url}` : "Loading..."} + 123
        </Box>
        <Heading as="h1">Questionnaire</Heading>
        <ProgressBar
            ariaLabel="Progress"
            value={progressValue}
            appearance={progressAppearance}
        />
        <Box xcss={questionBoxStyles}>
          <Heading as="h2">{currentQuestion.id.toUpperCase()}</Heading>
          <Text>{currentQuestion.text}</Text>
          {!isLeaf && (
              <Box xcss={answersBoxStyles}>
                {currentQuestion.answers.map(a => (
                    <Button
                        key={a.label}
                        onClick={() => handleSelect(a.label)}
                        appearance={selected === a.label ? 'primary' : 'default'}
                    >
                      {a.label}
                    </Button>
                ))}
              </Box>
          )}
          <Box xcss={navButtonBoxStyles}>
            <Button onClick={handleBack} isDisabled={history.length <= 1}>
              Back
            </Button>
            <Button onClick={handleNext} isDisabled={isLeaf || !selected}>
              Next
            </Button>
          </Box>
        </Box>
        <Box xcss={visitedPathBoxStyles}>
          <Heading as="h3">Visited Path</Heading>
          <Text>{history.join(' → ')}</Text>
        </Box>
      </Box>
  );
}

export default Stepper;
