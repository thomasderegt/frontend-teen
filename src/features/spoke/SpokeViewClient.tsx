'use client';

import { Box, Text, VStack, Heading, Badge, Progress, HStack, Button } from '@chakra-ui/react';
import { Spoke } from '@/lib/api/hub';

interface SpokeViewClientProps {
  spoke: Spoke;
}

export default function SpokeViewClient({ spoke }: SpokeViewClientProps) {
  return (
    <VStack spacing={6} align="start" p={6} maxW="4xl" mx="auto">
      {/* Header */}
      <VStack align="start" spacing={4} width="100%">
        <HStack spacing={4} align="center">
          <Text fontSize="4xl">{spoke.icon}</Text>
          <VStack align="start" spacing={1}>
            <Heading size="lg" color="primary.600">
              {spoke.title}
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {spoke.description}
            </Text>
          </VStack>
        </HStack>
        
        <HStack spacing={4}>
          <Badge 
            colorScheme={
              spoke.status === 'completed' ? 'green' : 
              spoke.status === 'in-progress' ? 'blue' : 'gray'
            }
            variant="subtle"
            px={3}
            py={1}
          >
            {spoke.status === 'completed' ? 'Voltooid' :
             spoke.status === 'in-progress' ? 'Bezig' : 'Niet gestart'}
          </Badge>
          <Badge colorScheme="purple" variant="outline" px={3} py={1}>
            {spoke.category}
          </Badge>
          <Badge colorScheme="orange" variant="outline" px={3} py={1}>
            {spoke.estimatedDuration}
          </Badge>
        </HStack>
      </VStack>

      {/* Progress Section */}
      <Box width="100%" p={6} bg="gray.50" borderRadius="lg">
        <VStack spacing={4} align="start">
          <Heading size="md" color="gray.700">
            Jouw Voortgang
          </Heading>
          
          <VStack spacing={2} width="100%">
            <HStack justify="space-between" width="100%">
              <Text fontSize="sm" color="gray.600">
                Lessen voltooid
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.700">
                {spoke.lessonsCompleted} van {spoke.totalLessons}
              </Text>
            </HStack>
            
            <Progress
              value={spoke.progress}
              size="lg"
              colorScheme={
                spoke.status === 'completed' ? 'green' : 
                spoke.status === 'in-progress' ? 'blue' : 'gray'
              }
              borderRadius="full"
              width="100%"
            />
            
            <Text fontSize="sm" color="gray.500">
              {spoke.progress}% voltooid
            </Text>
          </VStack>
        </VStack>
      </Box>

      {/* Action Buttons */}
      <HStack spacing={4} width="100%" justify="center">
        <Button
          colorScheme="primary"
          size="lg"
          px={8}
          onClick={() => {
            // Navigate to first lesson or continue where left off
            console.log('Start learning:', spoke.id);
          }}
        >
          {spoke.status === 'not-started' ? 'Start Leren' :
           spoke.status === 'in-progress' ? 'Doorgaan' : 'Herhalen'}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          px={8}
          onClick={() => {
            // Navigate back to wheel
            window.history.back();
          }}
        >
          Terug naar Wheel
        </Button>
      </HStack>

      {/* Content Preview */}
      <Box width="100%" p={6} bg="white" borderRadius="lg" border="1px solid" borderColor="gray.200">
        <VStack spacing={4} align="start">
          <Heading size="md" color="gray.700">
            Wat ga je leren?
          </Heading>
          
          <Text color="gray.600" lineHeight="1.6">
            In dit thema ga je dieper in op {spoke.title.toLowerCase()}. 
            Je leert over de fundamenten, praktische toepassingen en spirituele aspecten.
            Elke les bouwt voort op de vorige en helpt je om een dieper begrip te ontwikkelen.
          </Text>
          
          <Text color="gray.600" lineHeight="1.6">
            Na het voltooien van dit thema heb je een solide basis in {spoke.title.toLowerCase()} 
            en kun je deze kennis toepassen in je dagelijks leven.
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
} 