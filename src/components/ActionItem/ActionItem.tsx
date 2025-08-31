import React, { useState } from 'react';
import { 
  Box, 
  HStack, 
  Text, 
  Checkbox, 
  VStack, 
  Progress,
  Badge,
  IconButton,
  Tooltip
} from '@chakra-ui/react';

interface ActionItemProps {
  id: string;
  text: string;
  category?: string;
  estimatedTime?: string;
  isCompleted?: boolean;
  onToggle?: (id: string, completed: boolean) => void;
  showProgress?: boolean;
}

export default function ActionItem({ 
  id, 
  text, 
  category,
  estimatedTime,
  isCompleted = false,
  onToggle,
  showProgress = false
}: ActionItemProps) {
  const [completed, setCompleted] = useState(isCompleted);

  const handleToggle = () => {
    const newState = !completed;
    setCompleted(newState);
    
    if (onToggle) {
      onToggle(id, newState);
    }
  };

  return (
    <Box
      p={4}
      borderRadius="lg"
      bg={completed ? 'green.800' : 'orange.800'}
      border="1px solid"
      borderColor={completed ? 'green.400' : 'orange.400'}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'lg'
      }}
    >
      <VStack spacing={3} align="stretch">
        {/* Main Action */}
        <HStack spacing={3} align="flex-start">
          <Checkbox
            isChecked={completed}
            onChange={handleToggle}
            colorScheme="green"
            size="lg"
            mt={1}
          />
          <Text 
            color="white" 
            lineHeight="1.6"
            textDecoration={completed ? 'line-through' : 'none'}
            opacity={completed ? 0.7 : 1}
          >
            {text}
          </Text>
        </HStack>

        {/* Metadata */}
        <HStack spacing={4} justify="space-between">
          {category && (
            <Badge colorScheme="blue" variant="subtle">
              {category}
            </Badge>
          )}
          
          {estimatedTime && (
            <HStack spacing={1}>
              <Text fontSize="sm" color="gray.300">
                ⏱ {estimatedTime}
              </Text>
            </HStack>
          )}
        </HStack>

        {/* Progress Bar */}
        {showProgress && (
          <Box>
            <Progress 
              value={completed ? 100 : 0} 
              colorScheme="green"
              size="sm"
              borderRadius="full"
            />
          </Box>
        )}

        {/* Completion Indicator */}
        {completed && (
          <HStack spacing={2} justify="center">
            <Text fontSize="sm" color="green.400" fontWeight="bold">
              ✓ Voltooid!
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
