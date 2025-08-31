'use client';

import { Heading, Text, Button, VStack, Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} textAlign="center">
        <Heading size="2xl" color="primary.500">
          404
        </Heading>
        <Heading size="lg">
          Pagina niet gevonden
        </Heading>
        <Text fontSize="lg" color="text.secondary">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </Text>
        <Button
          colorScheme="primary"
          size="lg"
          onClick={() => router.push('/')}
        >
          Terug naar home
        </Button>
      </VStack>
    </Container>
  );
} 