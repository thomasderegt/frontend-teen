import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  HStack, 
  Button, 
  Text, 
  Heading,
  Progress,
  useToast
} from '@chakra-ui/react';
import StationStep from '../StationStep';
import ContentNode from '../ContentNode';
import QuizQuestion from '../QuizQuestion';
import ActionItem from '../ActionItem';

interface StationData {
  id: string;
  title: string;
  description: string;
  steps: StepData[];
}

interface StepData {
  id: string;
  stepNumber: number;
  title: string;
  description?: string;
  content: ContentData[];
  isCompleted?: boolean;
}

interface ContentData {
  id: string;
  nodeType: string;
  text: string;
  children?: ContentData[];
  order?: number;
  options?: QuizOption[]; // Voor quiz vragen
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface StationViewProps {
  station: StationData;
  onStepComplete?: (stepId: string) => void;
  onStationComplete?: (stationId: string) => void;
}

export default function StationView({ 
  station, 
  onStepComplete,
  onStationComplete 
}: StationViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const toast = useToast();

  const currentStepData = station.steps[currentStep];
  const totalSteps = station.steps.length;
  const progress = (completedSteps.size / totalSteps) * 100;

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    
    if (onStepComplete) {
      onStepComplete(stepId);
    }

    toast({
      title: 'Stap voltooid!',
      description: 'Je hebt deze stap succesvol afgerond.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleQuizAnswer = (selectedOptionId: string, isCorrect: boolean) => {
    setQuizAnswers(prev => ({
      ...prev,
      [selectedOptionId]: isCorrect
    }));

    // For demo purposes, mark step as complete after answering any quiz question
    handleStepComplete(currentStepData.id);
  };

  const handleActionToggle = (actionId: string, completed: boolean) => {
    if (completed) {
      setCompletedActions(prev => new Set([...prev, actionId]));
      // For demo purposes, mark step as complete after completing any action
      handleStepComplete(currentStepData.id);
    } else {
      setCompletedActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(actionId);
        return newSet;
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Station completed
      if (onStationComplete) {
        onStationComplete(station.id);
      }
      
      toast({
        title: 'Station voltooid!',
        description: 'Gefeliciteerd! Je hebt dit spirituele station afgerond.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderContent = (content: ContentData) => {
    switch (content.nodeType) {
      case 'quiz_question':
        return (
          <QuizQuestion
            id={content.id}
            question={content.text}
            options={content.options || []}
            onAnswer={handleQuizAnswer}
          />
        );
      
      case 'action_item':
        return (
          <ActionItem
            id={content.id}
            text={content.text}
            isCompleted={completedActions.has(content.id)}
            onToggle={handleActionToggle}
          />
        );
      
      default:
        return (
          <ContentNode
            nodeType={content.nodeType}
            text={content.text}
          >
            {content.children?.map(child => (
              <Box key={child.id}>
                {renderContent(child)}
              </Box>
            ))}
          </ContentNode>
        );
    }
  };

  return (
    <Box minH="100vh" bg="transparent" color="text.primary" p={4}>
      <VStack spacing={8} maxW="container.lg" mx="auto">
        {/* Station Header */}
        <Box textAlign="center" py={8}>
          <Heading size="2xl" color="text.primary" mb={4}>
            {station.title}
          </Heading>
          <Text fontSize="lg" color="text.secondary" maxW="2xl">
            {station.description}
          </Text>
        </Box>

        {/* Progress Bar */}
        <Box w="100%" maxW="container.md">
          <Text fontSize="sm" color="text.tertiary" mb={2} textAlign="center">
            Voortgang: {completedSteps.size} van {totalSteps} stappen
          </Text>
          <Progress 
            value={progress} 
            colorScheme="purple" 
            size="lg" 
            borderRadius="full"
          />
        </Box>

        {/* Current Step */}
        <StationStep
          stepNumber={currentStepData.stepNumber}
          title={currentStepData.title}
          description={currentStepData.description}
          isActive={true}
          isCompleted={completedSteps.has(currentStepData.id)}
        >
          <VStack spacing={6} align="stretch">
            {currentStepData.content.map(content => (
              <Box key={content.id}>
                {renderContent(content)}
              </Box>
            ))}
          </VStack>
        </StationStep>

        {/* Navigation */}
        <HStack spacing={4} justify="center">
          <Button
            onClick={handlePreviousStep}
            isDisabled={currentStep === 0}
            colorScheme="gray"
            variant="outline"
          >
            Vorige
          </Button>
          
          <Button
            onClick={handleNextStep}
            colorScheme="purple"
            isDisabled={false}
          >
            {currentStep === totalSteps - 1 ? 'Voltooi Station' : 'Volgende Stap'}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
