import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import { Box, Heading, Text, xcss, Button } from '@forge/react';
import QuestionDisplay from './QuestionDisplay';
import NavigationButtons from './NavigationButtons';
import UserAnswers from './UserAnswers';
import { Topic, QuestionNode, ButtonType } from '../../../utils/types';

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

interface QuestionLookup {
  [questionId: string]: QuestionNode;
}

interface TopicIndexMap {
  [questionId: string]: number;
}

const Stepper: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [pendingAnswer, setPendingAnswer] = useState('');
  const [pendingAnswers, setPendingAnswers] = useState<string[]>([]);
  const [questionLookup, setQuestionLookup] = useState<QuestionLookup>({});
  const [questionToTopicIndex, setQuestionToTopicIndex] = useState<TopicIndexMap>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const stored: Topic[] = await invoke('getQuestions');
      if (Array.isArray(stored) && stored.length > 0) {
        setTopics(stored);
      } else {
        setTopics([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!topics || topics.length === 0) return;
    const qLookup: QuestionLookup = {};
    const qToTopicIdx: TopicIndexMap = {};
    topics.forEach((topic, tIndex) => {
      topic.questions.forEach((q) => {
        qLookup[q.id] = q;
        qToTopicIdx[q.id] = tIndex;
      });
    });
    setQuestionLookup(qLookup);
    setQuestionToTopicIndex(qToTopicIdx);
    if (history.length === 0 && topics[0].questions.length > 0) {
      setHistory([topics[0].questions[0].id]);
    }
  }, [topics, history]);

  if (loading) {
    return (
        <Box xcss={containerStyles}>
          <Heading as="h1">Loading questions...</Heading>
        </Box>
    );
  }

  if (!topics || topics.length === 0) {
    return (
        <Box xcss={containerStyles}>
          <Heading as="h1">No topics found</Heading>
          <Text>Please add topics/questions first.</Text>
        </Box>
    );
  }

  if (completed) {
    return (
        <Box xcss={containerStyles}>
          <Heading as="h1">Questionnaire</Heading>
          <Box xcss={doneBoxStyles}>
            <Heading as="h2">Thank you for your answers!</Heading>
            <Text>The project cost estimation will be calculated shortly.</Text>
          </Box>
          <Button
              onClick={() => {
                const lastTopic = topics[topics.length - 1];
                const lastQId = lastTopic.questions[lastTopic.questions.length - 1].id;
                setHistory(prev => {
                  if (!prev.includes(lastQId)) {
                    return [...prev, lastQId];
                  }
                  return prev;
                });
                setCompleted(false);
              }}
          >
            Go Back to Last Question
          </Button>
          <UserAnswers history={history} userAnswers={userAnswers} />
        </Box>
    );
  }

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
    const pointer = !answer.next || answer.next === 'unused' ? 'End' : answer.next;
    return {
      name: currentQuestion.id,
      value: answer.label,
      label: `${answer.label} (-> ${pointer})`,
    };
  });

  let nextPointer: string | null = null;
  if (currentQuestion.type === ButtonType.RadioButton) {
    const selected = currentQuestion.answers.find(a => a.label === pendingAnswer);
    nextPointer = selected ? selected.next : null;
  } else if (currentQuestion.type === ButtonType.Checkbox) {
    if (currentQuestion.next && currentQuestion.next !== 'unused') {
      nextPointer = currentQuestion.next;
    }
  }

  const currentTopicIndex = questionToTopicIndex[currentId] || 0;

  const handleNext = () => {
    if (currentQuestion.type === ButtonType.RadioButton) {
      if (!pendingAnswer) return;
      setUserAnswers(prev => ({ ...prev, [currentId]: pendingAnswer }));
    } else if (currentQuestion.type === ButtonType.Checkbox) {
      if (pendingAnswers.length === 0) return;
      setUserAnswers(prev => ({ ...prev, [currentId]: pendingAnswers }));
    }
    if (nextPointer && nextPointer !== 'unused') {
      setHistory(prev => [...prev, nextPointer]);
    } else {
      if (currentTopicIndex < topics.length - 1) {
        const nextTopicFirstQuestion = topics[currentTopicIndex + 1].questions[0].id;
        setHistory(prev => [...prev, nextTopicFirstQuestion]);
      } else {
        setCompleted(true);
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
        <Button onClick={loadQuestions}>Refresh</Button>
        <Heading as="h1">Questionnaire</Heading>
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
        <Box>
          <NavigationButtons
              onBack={handleBack}
              onNext={handleNext}
              disableBack={history.length <= 1}
              disableNext={
                  (currentQuestion.type === ButtonType.RadioButton && !pendingAnswer) ||
                  (currentQuestion.type === ButtonType.Checkbox && pendingAnswers.length === 0)
              }
          />
        </Box>
        <UserAnswers history={history} userAnswers={userAnswers} />
      </Box>
  );
};

export default Stepper;
