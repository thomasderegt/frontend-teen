'use client';

import { Box, Heading, Text, Button, VStack, Container, Alert, AlertIcon } from '@chakra-ui/react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} textAlign="center">
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          Er is een fout opgetreden
        </Alert>
        
        <Heading size="lg">
          Oeps! Er ging iets mis
        </Heading>
        
        <Text fontSize="lg" color="text.secondary">
          Er is een onverwachte fout opgetreden. Probeer het opnieuw of neem contact op met de beheerder.
        </Text>
        
        <VStack spacing={4}>
          <Button
            colorScheme="primary"
            size="lg"
            onClick={reset}
          >
            Probeer opnieuw
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Terug naar home
          </Button>
        </VStack>
        
        {process.env.NODE_ENV === 'development' && (
          <Box
            mt={8}
            p={4}
            bg="gray.50"
            borderRadius="md"
            textAlign="left"
            fontSize="sm"
            fontFamily="mono"
          >
            <Text fontWeight="bold" mb={2}>Error Details (Development):</Text>
            <Text>{error.message}</Text>
            {error.digest && (
              <Text mt={2}>Digest: {error.digest}</Text>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
} 