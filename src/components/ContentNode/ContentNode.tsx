import React from 'react';
import { Box, VStack, Text, Heading, List, ListItem } from '@chakra-ui/react';


interface ContentNodeProps {
  nodeType: string;
  text: string;
  children?: React.ReactNode;
  order?: number;
  className?: string;
}

export default function ContentNode({ 
  nodeType, 
  text, 
  children, 
  order,
  className 
}: ContentNodeProps) {
  // Render different content types based on nodeType
  switch (nodeType) {
    case 'intro':
      return (
        <Box mb={6}>
          <Text fontSize="lg" lineHeight="1.6" color="text.primary" fontStyle="italic" textAlign="center">
            {text}
          </Text>
          {children}
        </Box>
      );

    case 'quran':
      return (
        <Box 
          p={6} 
          borderRadius="lg" 
          bg="background.card" 
          border="1px solid" 
          borderColor="accent.neonPurple" 
          mb={6} 
          textAlign="center"
        >
          <Text fontSize="lg" lineHeight="1.6" color="text.primary" fontStyle="italic">
            {text}
          </Text>
          {children}
        </Box>
      );

    case 'explanation':
      return (
        <Box 
          p={6} 
          borderRadius="lg" 
          bg="background.card" 
          border="1px solid" 
          borderColor="accent.neonPurple" 
          mb={6} 
          textAlign="center"
        >
          <Text fontSize="xl" lineHeight="1.6" color="text.primary">
            {text}
          </Text>
          {children}
        </Box>
      );

    case 'part':
      return (
        <Box
          p={6}
          borderRadius="lg"
          bg="background.card"
          border="1px solid"
          borderColor="accent.neonPurple"
          textAlign="left"
          mb={4}
        >
          <Text fontSize="md" lineHeight="1.6" color="text.primary">
            {text}
          </Text>
          {children}
        </Box>
      );

    case 'goals_list':
      return (
        <VStack spacing={4} align="stretch" mb={6}>
          <Heading size="md" textAlign="center" color="text.primary" mb={4}>
            {text}
          </Heading>
          <List spacing={3}>
            {children}
          </List>
        </VStack>
      );

    case 'goal_item':
      return (
        <ListItem display="flex" alignItems="flex-start" gap={3}>
          <Text color="accent.green" mt={1} fontSize="lg">✓</Text>
          <Text color="text.primary" lineHeight="1.6">
            {text}
          </Text>
        </ListItem>
      );

    case 'action_part':
      return (
        <Box p={6} borderRadius="lg" bg="orange.900" border="1px solid" borderColor="orange.500" mb={4}>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="white" textAlign="center">
              {text}
            </Heading>
            {children}
          </VStack>
        </Box>
      );

    case 'action_item':
      return (
        <Box p={4} borderRadius="md" bg="orange.800" border="1px solid" borderColor="orange.400">
          <Text color="white" lineHeight="1.6">
            {text}
          </Text>
        </Box>
      );

    case 'closing':
      return (
        <Box p={6} borderRadius="lg" bg="teal.900" border="1px solid" borderColor="teal.500" textAlign="center">
          <Text fontSize="lg" lineHeight="1.6" color="white">
            {text}
          </Text>
          {children}
        </Box>
      );

    default:
      return (
        <Box mb={4}>
          <Text color="white" lineHeight="1.6">
            {text}
          </Text>
          {children}
        </Box>
      );
  }
}
