import { Suspense } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import SpokeView from '@/features/spoke/SpokeView';

interface SpokePageProps {
  params: {
    id: string;
  };
}

export default function SpokePage({ params }: SpokePageProps) {
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg" color="primary.600" textAlign="center">
          Thema Details
        </Heading>
      </Box>
      
      <Suspense fallback={<div>Loading...</div>}>
        <SpokeView spokeId={params.id} />
      </Suspense>
    </Container>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: SpokePageProps) {
  return {
    title: `Thema ${params.id} - Wheel of Islam`,
    description: `Leer meer over ${params.id} in de Wheel of Islam`,
  };
} 