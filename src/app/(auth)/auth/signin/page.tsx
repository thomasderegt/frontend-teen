'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Container,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Ongeldige inloggegevens');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Er is een fout opgetreden');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={8}>
        <Heading size="xl">Inloggen</Heading>
        
        <Box as="form" onSubmit={handleSubmit} w="full">
          <VStack spacing={6}>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.com"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Wachtwoord</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Jouw wachtwoord"
              />
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="primary"
              size="lg"
              w="full"
              isLoading={isLoading}
            >
              Inloggen
            </Button>
          </VStack>
        </Box>
        
        <Text fontSize="sm" color="text.secondary">
          Demo: Gebruik willekeurige email en wachtwoord
        </Text>
      </VStack>
    </Container>
  );
} 