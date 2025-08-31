import { Suspense } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { getSpoke } from '@/lib/api/hub';
import SpokeViewClient from './SpokeViewClient';
import SpokeViewError from './SpokeViewError';

interface SpokeViewProps {
  spokeId: string;
}

// Server Component for data fetching
async function SpokeViewContent({ spokeId }: SpokeViewProps) {
  try {
    const spoke = await getSpoke(spokeId);
    return <SpokeViewClient spoke={spoke} />;
  } catch (error) {
    console.error('Error loading spoke data:', error);
    return <SpokeViewError />;
  }
}

export default function SpokeView(props: SpokeViewProps) {
  return (
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <VStack spacing={4}>
            <Spinner size="lg" color="primary.500" />
            <Text color="gray.600">Thema laden...</Text>
          </VStack>
        </Box>
      }
    >
      <SpokeViewContent {...props} />
    </Suspense>
  );
} 