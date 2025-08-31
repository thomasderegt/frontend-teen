'use client';

import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { StationView } from '@/components';
import { getStation, StationData } from '@/lib/api/stations';

export default function StationDemoPage() {
  const [station, setStation] = useState<StationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStation = async () => {
      try {
        setLoading(true);
        const stationData = await getStation('wakefulness');
        setStation(stationData);
      } catch (err) {
        setError('Failed to load station data');
        console.error('Error loading station:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStation();
  }, []);

  const handleStepComplete = (stepId: string) => {
    console.log('Step completed:', stepId);
  };

  const handleStationComplete = (stationId: string) => {
    console.log('Station completed:', stationId);
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="lg" color="primary.500" />
          <Text color="text.secondary">Loading station...</Text>
        </VStack>
      </Box>
    );
  }

  if (error || !station) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text color="error" fontSize="lg">
            {error || 'Failed to load station'}
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <StationView
      station={station}
      onStepComplete={handleStepComplete}
      onStationComplete={handleStationComplete}
    />
  );
}
