'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  useToast,
  Badge,
} from '@chakra-ui/react';

// Theme opties
const themeOptions = [
  {
    id: 'blue',
    name: 'Blauw',
    description: 'Standaard blauw thema',
    color: '#0087FF',
    icon: '🔵'
  },
  {
    id: 'green',
    name: 'Groen',
    description: 'Natuurlijk groen thema',
    color: '#22C55E',
    icon: '🟢'
  },
  {
    id: 'purple',
    name: 'Paars',
    description: 'Creatief paars thema',
    color: '#A855F7',
    icon: '🟣'
  },
  {
    id: 'orange',
    name: 'Oranje',
    description: 'Energiek oranje thema',
    color: '#F97316',
    icon: '🟠'
  },
  {
    id: 'monochrome',
    name: 'Zwart-Wit',
    description: 'Minimalistisch zwart-wit thema',
    color: '#6B7280',
    icon: '⚫'
  }
];

export default function SettingsPage() {
  const [currentTheme, setCurrentTheme] = useState('monochrome');
  const toast = useToast();

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'monochrome';
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('selectedTheme', themeId);
    
    toast({
      title: 'Thema gewijzigd',
      description: `Thema is gewijzigd naar ${themeOptions.find(t => t.id === themeId)?.name}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    // Reload page to apply theme (simplified approach)
    window.location.reload();
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl">Instellingen</Heading>
          <Text color="gray.600" mt={2}>
            Pas je persoonlijke voorkeuren aan
          </Text>
        </Box>

        {/* Theme Settings */}
        <Card>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="md" mb={2}>
                  Thema
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Kies een thema dat bij je past
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {themeOptions.map((theme) => (
                  <Card
                    key={theme.id}
                    cursor="pointer"
                    border={currentTheme === theme.id ? '2px solid' : '1px solid'}
                    borderColor={currentTheme === theme.id ? 'brand.500' : 'gray.200'}
                    _hover={{
                      borderColor: 'brand.400',
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                    transition="all 0.2s"
                    onClick={() => handleThemeChange(theme.id)}
                  >
                    <CardBody>
                      <VStack spacing={3} align="center">
                        <Box
                          width="60px"
                          height="60px"
                          borderRadius="full"
                          bg={theme.color}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="2xl"
                        >
                          {theme.icon}
                        </Box>
                        
                        <VStack spacing={1} align="center">
                          <Text fontWeight="semibold">{theme.name}</Text>
                          <Text fontSize="sm" color="gray.600" textAlign="center">
                            {theme.description}
                          </Text>
                        </VStack>

                        {currentTheme === theme.id && (
                          <Badge colorScheme="brand" variant="solid">
                            Actief
                          </Badge>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Guest User Notice */}
        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Heading size="md" mb={2}>
                  Account
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Log in om je instellingen op te slaan en te synchroniseren
                </Text>
              </Box>

              <HStack justify="space-between" p={4} bg="gray.50" borderRadius="md">
                <Box>
                  <Text fontWeight="medium">Status</Text>
                  <Text fontSize="sm" color="gray.600">
                    Je bent momenteel een gast gebruiker
                  </Text>
                </Box>
                <Button size="sm" colorScheme="brand" variant="outline">
                  Inloggen
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
} 