'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  SimpleGrid,
  Alert,
  AlertIcon,
  Badge,
} from '@chakra-ui/react';

// Demo data for guest users
const demoData = {
  user: {
    name: 'Gast Gebruiker',
    email: 'gast@example.com'
  },
  stats: {
    lessonsCompleted: 0,
    totalLessons: 10,
    currentStreak: 0,
    totalTime: 0
  },
  recentActivity: [
    {
      id: 1,
      title: 'Welkom bij Wheel of Islam',
      description: 'Begin je reis door de islamitische leer',
      status: 'not-started',
      icon: '🌟'
    },
    {
      id: 2,
      title: 'De Vijf Zuilen',
      description: 'Leer over de fundamenten van de islam',
      status: 'not-started',
      icon: '🕌'
    },
    {
      id: 3,
      title: 'Profetenverhalen',
      description: 'Ontdek de verhalen van de profeten',
      status: 'not-started',
      icon: '📖'
    }
  ]
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={20}>
        <Text>Laden...</Text>
      </Container>
    );
  }

  const userData = isAuthenticated ? session : demoData.user;
  const stats = isAuthenticated ? {
    lessonsCompleted: 5,
    totalLessons: 10,
    currentStreak: 3,
    totalTime: 120
  } : demoData.stats;

  const recentActivity = isAuthenticated ? [
    {
      id: 1,
      title: 'Geloof (Iman)',
      description: '2 van 5 lessen voltooid',
      status: 'in-progress',
      icon: '🕌'
    },
    {
      id: 2,
      title: 'Gebed (Salah)',
      description: '1 van 3 lessen voltooid',
      status: 'in-progress',
      icon: '🙏'
    },
    {
      id: 3,
      title: 'Vasten (Sawm)',
      description: 'Niet gestart',
      status: 'not-started',
      icon: '🌙'
    }
  ] : demoData.recentActivity;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'not-started': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Voltooid';
      case 'in-progress': return 'Bezig';
      case 'not-started': return 'Niet gestart';
      default: return 'Onbekend';
    }
  };

  return (
    <Container maxW="container.lg" py={20}>
      <VStack spacing={8} align="stretch">
        {/* Guest User Alert */}
        {!isAuthenticated && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Welkom gast gebruiker!</Text>
              <Text fontSize="sm">
                Je kunt de app uitproberen. Log in om je voortgang op te slaan en meer features te ontgrendelen.
              </Text>
            </Box>
          </Alert>
        )}

        {/* Header */}
        <HStack justify="space-between">
          <Box>
            <Heading size="xl">Dashboard</Heading>
            <Text color="gray.600">
              Welkom terug, {(userData as any)?.name || (userData as any)?.email || 'Gebruiker'}
            </Text>
          </Box>
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={() => router.push('/auth/signout')}
            >
              Uitloggen
            </Button>
          ) : (
            <Button
              colorScheme="brand"
              onClick={() => router.push('/auth/signin')}
            >
              Inloggen
            </Button>
          )}
        </HStack>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card>
            <CardBody>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">📚</Text>
                <Text fontWeight="bold" fontSize="xl">
                  {stats.lessonsCompleted}/{stats.totalLessons}
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Lessen voltooid
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">🔥</Text>
                <Text fontWeight="bold" fontSize="xl">
                  {stats.currentStreak}
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Dagen op rij
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">⏱️</Text>
                <Text fontWeight="bold" fontSize="xl">
                  {stats.totalTime} min
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Totale tijd
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">📈</Text>
                <Text fontWeight="bold" fontSize="xl">
                  {Math.round((stats.lessonsCompleted / stats.totalLessons) * 100)}%
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Voortgang
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Recent Activity */}
        <Card>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="md" mb={2}>
                  Recente Activiteit
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  {isAuthenticated ? 'Je laatste activiteiten' : 'Demo activiteiten'}
                </Text>
              </Box>

              <VStack spacing={4} align="stretch">
                {recentActivity.map((activity) => (
                  <HStack
                    key={activity.id}
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    justify="space-between"
                  >
                    <HStack spacing={4}>
                      <Text fontSize="2xl">{activity.icon}</Text>
                      <Box>
                        <Text fontWeight="medium">{activity.title}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {activity.description}
                        </Text>
                      </Box>
                    </HStack>
                    <Badge colorScheme={getStatusColor(activity.status)}>
                      {getStatusText(activity.status)}
                    </Badge>
                  </HStack>
                ))}
              </VStack>

              {!isAuthenticated && (
                <Box textAlign="center" pt={4}>
                  <Text fontSize="sm" color="gray.600" mb={3}>
                    Log in om je echte voortgang te zien en op te slaan
                  </Text>
                  <Button
                    colorScheme="brand"
                    size="sm"
                    onClick={() => router.push('/auth/signin')}
                  >
                    Account aanmaken
                  </Button>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
} 