import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Radio, 
  RadioGroup, 
  Button, 
  Alert, 
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider
} from '@chakra-ui/react';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

interface QuizQuestionProps {
  id: string;
  question: string;
  options: QuizOption[];
  feedback?: string;
  onAnswer?: (selectedOptionId: string, isCorrect: boolean) => void;
  showFeedback?: boolean;
}

export default function QuizQuestion({ 
  id, 
  question, 
  options, 
  feedback,
  onAnswer,
  showFeedback = false 
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = () => {
    if (!selectedOption) return;

    const selectedOptionData = options.find(opt => opt.id === selectedOption);
    const correct = selectedOptionData?.isCorrect || false;
    
    setIsCorrect(correct);
    setHasAnswered(true);
    
    if (onAnswer) {
      onAnswer(selectedOption, correct);
    }
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (hasAnswered) {
      setHasAnswered(false);
    }
  };

  return (
    <Box
      p={6}
      borderRadius="lg"
      bg="green.900"
      border="1px solid"
      borderColor="green.500"
      mb={6}
    >
      <VStack spacing={4} align="stretch">
        {/* Question */}
        <Text fontSize="lg" fontWeight="bold" color="white" lineHeight="1.6">
          {question}
        </Text>

        {/* Options */}
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          <VStack spacing={3} align="stretch">
            {options.map((option) => (
              <Radio 
                key={option.id} 
                value={option.id}
                colorScheme="green"
                isDisabled={hasAnswered}
              >
                <Text color="white">
                  {option.text}
                </Text>
              </Radio>
            ))}
          </VStack>
        </RadioGroup>

        {/* Answer Button */}
        <Button
          onClick={handleAnswer}
          colorScheme="green"
          isDisabled={!selectedOption || hasAnswered}
          alignSelf="center"
        >
          {hasAnswered ? 'Beantwoord' : 'Beantwoord Vraag'}
        </Button>

        {/* Feedback */}
        {hasAnswered && (
          <Alert
            status={isCorrect ? 'success' : 'error'}
            borderRadius="md"
          >
            <AlertIcon />
            <Box>
              <AlertTitle>
                {isCorrect ? 'Correct!' : 'Niet helemaal juist'}
              </AlertTitle>
              <AlertDescription>
                {isCorrect ? feedback : 'Bekijk de feedback hieronder.'}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Individual Option Feedback */}
        {hasAnswered && showFeedback && (
          <VStack spacing={3} align="stretch">
            <Divider borderColor="green.400" />
            <Text fontSize="sm" color="green.200" fontWeight="bold">
              Uitleg per antwoord:
            </Text>
            {options.map((option) => (
              <Box
                key={option.id}
                p={3}
                borderRadius="md"
                bg={option.isCorrect ? 'green.800' : 'red.800'}
                border="1px solid"
                borderColor={option.isCorrect ? 'green.400' : 'red.400'}
              >
                <Text fontSize="sm" color="white" fontWeight="bold">
                  {option.text}
                </Text>
                {option.feedback && (
                  <Text fontSize="sm" color="gray.200" mt={1}>
                    {option.feedback}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}


