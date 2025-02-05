import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  Heading,
  xcss,
  ProgressBar,
  RadioGroup,
} from '@forge/react';
import { QuestionNode } from '../../utils/types';
import { topics } from '../../utils/constants';

const questionLookup: Record<string, QuestionNode> = {};
const questionToTopicIndex: Record<string, number> = {};

topics.forEach((topic, tIndex) => {
  topic.questions.forEach((q) => {
    questionLookup[q.id] = q;
    questionToTopicIndex[q.id] = tIndex;
  });
});

const totalQuestions = topics.reduce(
    (sum, topic) => sum + topic.questions.length,
    0
);

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
  display: 'block',
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
  display: 'block',
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
  display: 'block',
});

const doneBoxStyles = xcss({
  margin: 'space.500',
  backgroundColor: 'color.background.neutral.subtle',
  borderColor: 'color.border',
  borderWidth: 'border.width',
  borderStyle: 'solid',
  borderRadius: 'border.radius',
  padding: 'space.300',
  display: 'block',
});

const Stepper: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['1.1']);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [pendingAnswer, setPendingAnswer] = useState<string>('');

  const currentId = history[history.length - 1];
  const currentQuestion = questionLookup[currentId];

  if (!currentQuestion) {
    return (
        <Box xcss={containerStyles}>
          <Heading as="h1">Invalid question: {currentId}</Heading>
        </Box>
    );
  }

  const selected = pendingAnswer;
  const selectedOption = currentQuestion.answers.find(
      (a) => a.label === pendingAnswer
  );
  const nextPointer = selectedOption ? selectedOption.next : null;

  const currentTopicIndex = questionToTopicIndex[currentId];
  const confirmedAnswer = userAnswers[currentId];
  const isComplete =
      currentTopicIndex === topics.length - 1 &&
      confirmedAnswer &&
      (!nextPointer || nextPointer === 'unused');

  const visitedCount = history.length;
  const progressValue = isComplete ? 1 : visitedCount / totalQuestions;
  const progressAppearance = isComplete ? 'success' : 'default';

  const options = currentQuestion.answers.map((answer) => {
    const pointer =
        (!answer.next || answer.next === 'unused') ? 'End' : answer.next;
    return {
      name: currentQuestion.id,
      value: answer.label,
      label: `${answer.label} (-> ${pointer})`,
    };
  });

  const handleSelect = (value: string) => {
    setPendingAnswer(value);
  };

  const handleNext = () => {
    if (!pendingAnswer) return;

    setUserAnswers((prev) => ({ ...prev, [currentId]: pendingAnswer }));

    if (nextPointer && nextPointer !== 'unused') {
      setHistory((prev) => [...prev, nextPointer]);
      setPendingAnswer('');
    } else {
      if (currentTopicIndex < topics.length - 1) {
        const nextTopicFirstQuestion =
            topics[currentTopicIndex + 1].questions[0].id;
        setHistory((prev) => [...prev, nextTopicFirstQuestion]);
        setPendingAnswer('');
      } else {
      }
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setUserAnswers((prev) => {
        const newAnswers = { ...prev };
        const removedId = history[history.length - 1];
        delete newAnswers[removedId];
        return newAnswers;
      });
      if (newHistory.length > 0) {
        const newCurrentId = newHistory[newHistory.length - 1];
        if (questionToTopicIndex[newCurrentId] === topics.length - 1) {
          setUserAnswers((prev) => {
            const newAnswers = { ...prev };
            delete newAnswers[newCurrentId];
            return newAnswers;
          });
          setPendingAnswer('');
        }
      }
    }
  };

  return (
      <Box xcss={containerStyles}>
        <Heading as="h1">Questionnaire</Heading>

        <ProgressBar
            ariaLabel="Overall progress"
            value={progressValue}
            appearance={progressAppearance}
        />

        {isComplete ? (
            <Box xcss={doneBoxStyles}>
              <Heading as="h2">Thank you for your answers!</Heading>
              <Text>
                The project cost estimation will be calculated shortly.
              </Text>
            </Box>
        ) : (
            <Box xcss={questionBoxStyles}>
              <Heading as="h2">{currentQuestion.id}</Heading>
              <Text>{currentQuestion.text}</Text>

              {currentQuestion.answers.length > 0 && (
                  <RadioGroup
                      name={currentQuestion.id}
                      options={options}
                      value={selected}
                      onChange={(e) => handleSelect(e.target.value)}
                  />
              )}

              <Box xcss={navButtonBoxStyles}>
                <Button onClick={handleBack} isDisabled={history.length <= 1}>
                  Back
                </Button>
                <Button onClick={handleNext} isDisabled={!pendingAnswer}>
                  Next
                </Button>
              </Box>
            </Box>
        )}

        <Box xcss={visitedPathBoxStyles}>
          <Heading as="h3">User Answers</Heading>
          {history.map((qid) => (
              <Text key={qid}>
                {qid}: {userAnswers[qid] ? userAnswers[qid] : 'No answer'}
              </Text>
          ))}
        </Box>
      </Box>
  );
};

export default Stepper;
