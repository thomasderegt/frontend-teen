import React from 'react';
import { Box, VStack, Heading, Text, Progress } from '@chakra-ui/react';

interface StationStepProps {
  stepNumber: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
}

const stepTitles = {
  1: 'Read & Learn',
  2: 'Goals',
  3: 'Quiz',
  4: 'Actions',
  5: 'Completion'
};

const stepColors = {
  1: 'purple',
  2: 'blue', 
  3: 'green',
  4: 'orange',
  5: 'teal'
};

export default function StationStep({ 
  stepNumber, 
  title, 
  description, 
  children, 
  isActive = false,
  isCompleted = false 
}: StationStepProps) {
  const colorScheme = stepColors[stepNumber as keyof typeof stepColors] || 'gray';
  const stepTitle = stepTitles[stepNumber as keyof typeof stepTitles] || title;

  return (
    <Box
      bg="background.secondary"
      borderRadius="xl"
      p={6}
      border="2px solid"
      borderColor={isActive ? `${colorScheme}.500` : 'border.secondary'}
      position="relative"
      transition="all 0.2s"
      _hover={{
        borderColor: isActive ? `${colorScheme}.400` : 'border.primary'
      }}
    >
      {/* Step Header */}
      <VStack spacing={3} mb={6} align="stretch">
        <Box display="flex" alignItems="center" gap={3}>
          <Box
            w={8}
            h={8}
            borderRadius="full"
            bg={isCompleted ? `${colorScheme}.500` : `${colorScheme}.600`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
            fontSize="sm"
          >
            {stepNumber}
          </Box>
          <Heading size="md" color="text.primary">
            {stepTitle}
          </Heading>
          {isCompleted && (
            <Box
              w={5}
              h={5}
              borderRadius="full"
              bg="green.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              ✓
            </Box>
          )}
        </Box>
        
        {description && (
          <Text color="text.secondary" fontSize="sm">
            {description}
          </Text>
        )}
      </VStack>

      {/* Step Content */}
      <Box>
        {children}
      </Box>

      {/* Progress indicator */}
      {isActive && (
        <Box mt={4}>
          <Progress 
            value={isCompleted ? 100 : 0} 
            colorScheme={colorScheme}
            size="sm"
            borderRadius="full"
          />
        </Box>
      )}
    </Box>
  );
}
