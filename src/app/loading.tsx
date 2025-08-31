'use client';

import { Spinner, Text, VStack, Container } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={6} textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.500"
          size="xl"
        />
        <Text fontSize="lg" color="text.secondary">
          Laden...
        </Text>
      </VStack>
    </Container>
  );
} 