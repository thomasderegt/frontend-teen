'use client';

import { Text, VStack, Button } from '@chakra-ui/react';

export default function SpokeViewError() {
  return (
    <VStack spacing={4} p={8}>
      <Text color="error.500" fontSize="lg">
        Er is een fout opgetreden bij het laden van dit thema.
      </Text>
      <Text color="gray.600">
        Het thema kon niet worden geladen. Probeer het later opnieuw.
      </Text>
      <Button
        variant="outline"
        onClick={() => window.history.back()}
      >
        Terug naar Wheel
      </Button>
    </VStack>
  );
} 