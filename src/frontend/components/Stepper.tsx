import React, { useState } from 'react';
import { Box, Heading, Text, xcss } from '@forge/react';
import { QuestionNode } from '../../utils/types';
import { topics } from '../../utils/constants';
import QuestionDisplay from './QuestionDisplay';
import NavigationButtons from './NavigationButtons';
import UserAnswers from './UserAnswers';
import ProgressIndicator from './ProgressIndicator';

const questionLookup: Record<string, QuestionNode> = {};
const questionToTopicIndex: Record<string, number> = {};

topics.forEach((topic, tIndex) => {
  topic.questions.forEach((q) => {
    questionLookup[q.id] = q;
    questionToTopicIndex[q.id] = tIndex;
  });
});

const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

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
  const [pendingAnswer, setPendingAnswer] = useState<string>('');
  const [pendingAnswers, setPendingAnswers] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [history, setHistory] = useState<string[]>(['1.1']);

  const currentId = history[history.length - 1];
  const currentQuestion = questionLookup[currentId];

  if (!currentQuestion) {
    return (
        <Box xcss={containerStyles}>
          <Heading as="h1">Invalid question: {currentId}</Heading>
        </Box>
    );
  }

  const options = currentQuestion.answers.map((answer) => {
    const pointer = (!answer.next || answer.next === 'unused') ? 'End' : answer.next;
    return {
      name: currentQuestion.id,
      value: answer.label,
      label: `${answer.label} (-> ${pointer})`,
    };
  });

  let nextPointer: string | null = null;
  if (currentQuestion.type === 'RadioButton') {
    const selectedOption = currentQuestion.answers.find(a => a.label === pendingAnswer);
    nextPointer = selectedOption ? selectedOption.next : null;
  } else if (currentQuestion.type === 'Checkbox' && pendingAnswers.length > 0) {
    const selectedOption = currentQuestion.answers.find(a => a.label === pendingAnswers[0]);
    nextPointer = selectedOption ? selectedOption.next : null;
  }

  const currentTopicIndex = questionToTopicIndex[currentId];
  const confirmedAnswer = userAnswers[currentId];
  const isComplete = currentTopicIndex === topics.length - 1 &&
      confirmedAnswer && (!nextPointer || nextPointer === 'unused');

  const visitedCount = history.length;
  const progressValue = isComplete ? 1 : visitedCount / totalQuestions;
  const progressAppearance = isComplete ? 'success' : 'default';

  const handleNext = () => {
    if (currentQuestion.type === 'RadioButton') {
      if (!pendingAnswer) return;
      setUserAnswers(prev => ({ ...prev, [currentId]: pendingAnswer }));
    }
    if (currentQuestion.type === 'Checkbox') {
      if (pendingAnswers.length === 0) return;
      setUserAnswers(prev => ({ ...prev, [currentId]: pendingAnswers }));
    }
    if (nextPointer && nextPointer !== 'unused') {
      setHistory(prev => [...prev, nextPointer]);
    } else {
      if (currentTopicIndex < topics.length - 1) {
        const nextTopicFirstQuestion = topics[currentTopicIndex + 1].questions[0].id;
        setHistory(prev => [...prev, nextTopicFirstQuestion]);
      }
    }
    setPendingAnswer('');
    setPendingAnswers([]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const removedId = history[history.length - 1];
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setUserAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[removedId];
        return newAnswers;
      });
      setPendingAnswer('');
      setPendingAnswers([]);
    }
  };

  return (
      <Box xcss={containerStyles}>
        <Heading as="h1">Questionnaire</Heading>
        {isComplete ? (
            <Box xcss={doneBoxStyles}>
              <Heading as="h2">Thank you for your answers!</Heading>
              <Text>The project cost estimation will be calculated shortly.</Text>
            </Box>
        ) : (
            <>
              <QuestionDisplay
                  questionId={currentQuestion.id}
                  text={currentQuestion.text}
                  options={options}
                  type={currentQuestion.type}
                  pendingAnswer={pendingAnswer}
                  pendingAnswers={pendingAnswers}
                  onRadioChange={setPendingAnswer}
                  onCheckboxChange={setPendingAnswers}
              />
              <NavigationButtons
                  onBack={handleBack}
                  onNext={handleNext}
                  disableBack={history.length <= 1}
                  disableNext={
                      (currentQuestion.type === 'RadioButton' && !pendingAnswer) ||
                      (currentQuestion.type === 'Checkbox' && pendingAnswers.length === 0)
                  }
              />
            </>
        )}
        <UserAnswers history={history} userAnswers={userAnswers} />
      </Box>
  );
};

export default Stepper;
