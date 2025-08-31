'use client';

import { useState, useEffect } from 'react';
import { Box, HStack, VStack, Button, Text, useToast, Spinner, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import SVGWheelMenuNav from '@/patterns/WheelMenuNav';
import { getHub, getWheelTypes } from '@/lib/api/hub';

export default function HomePage() {
  const [selectedWheelType, setSelectedWheelType] = useState<'outward' | 'inward'>('inward');
  const [selectedVariant, setSelectedVariant] = useState<'circle' | 'donut'>('donut');
  const [wheelData, setWheelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const toast = useToast();
  const router = useRouter();
  const wheelTypes = getWheelTypes();

  useEffect(() => {
    const loadWheelData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHub(selectedWheelType);
        setWheelData(data);
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de wheel data.');
      } finally {
        setLoading(false);
      }
    };

    loadWheelData();
  }, [selectedWheelType]);

  const handleWheelTypeChange = (wheelType: 'outward' | 'inward') => {
    setSelectedWheelType(wheelType);
    const wheelInfo = wheelTypes.find(w => w.id === wheelType);
    
    toast({
      title: wheelInfo?.title,
      description: wheelInfo?.description,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleItemClick = (item: any, index: number) => {
    // Show toast notification
    toast({
      title: `Clicked: ${item.title}`,
      description: `ID: ${item.id}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    
    // Navigate to wakefulness
    if (item.id === 'wakefulness') {
      router.push('/intro-wakefulness');
      return;
    }
    
    if (item.title.toLowerCase().includes('wakefulness')) {
      router.push('/intro-wakefulness');
      return;
    }
    
    // Navigate based on item type or ID
    if (item.id === 'prayer' || item.title.toLowerCase().includes('prayer')) {
      router.push('/spoke/prayer');
    } else if (item.id === 'quran' || item.title.toLowerCase().includes('quran')) {
      router.push('/spoke/quran');
    } else if (item.id === 'dhikr' || item.title.toLowerCase().includes('dhikr')) {
      router.push('/spoke/dhikr');
    } else if (item.id === 'charity' || item.title.toLowerCase().includes('charity')) {
      router.push('/spoke/charity');
    } else if (item.id === 'fasting' || item.title.toLowerCase().includes('fasting')) {
      router.push('/spoke/fasting');
    } else if (item.id === 'hajj' || item.title.toLowerCase().includes('hajj')) {
      router.push('/spoke/hajj');
    } else {
      // Default fallback - navigate to spoke with item ID
      router.push(`/spoke/${item.id}`);
    }
  };

  const handleSpinWheel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newRotation = (spinRotation + 45) % 360;
    setSpinRotation(newRotation);
  };

  if (loading) {
    return (
      <Box minH="100vh" p={4}>
        <Center minH="400px">
          <VStack spacing={4}>
            <Spinner size="lg" color="white" />
            <Text color="white">Loading wheel data...</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  if (error || !wheelData) {
    return (
      <Box minH="100vh" p={4}>
        <Center minH="400px">
          <VStack spacing={4} textAlign="center">
            <Text fontSize="lg" color="red.400" mb={4}>
              {error || 'Er is een fout opgetreden bij het laden van de wheel data.'}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Probeer de pagina te verversen of neem contact op met de beheerder.
            </Text>
            <Button 
              onClick={() => window.location.reload()} 
              colorScheme="blue"
            >
              Ververs Pagina
            </Button>
          </VStack>
        </Center>
      </Box>
    );
  }

  // Convert hub data to center format
  const center = {
    id: wheelData.hub.id,
    title: wheelData.hub.title,
    description: wheelData.hub.description,
    image: wheelData.hub.image
  };

  // Convert spokes data to items format
  const items = wheelData.spokes.map((spoke: any) => ({
    id: spoke.id,
    title: spoke.title,
    description: spoke.description,
    icon: spoke.icon,
    status: spoke.status,
    progress: spoke.progress,
    lessonsCompleted: spoke.lessonsCompleted,
    totalLessons: spoke.totalLessons,
    category: spoke.category,
    estimatedDuration: spoke.estimatedDuration
  }));

  return (
    <Box 
      minH="100vh" 
      p={4} 
      display="flex" 
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Wheel Content - Always use donut mode */}
      <Box position="relative" flex="1" display="flex" alignItems="center" justifyContent="center">
        
        {/* Center - blijft stil staan */}
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1}>
          <SVGWheelMenuNav
            center={center}
            items={[]}
            size="lg"
            variant="donut"
            showConnectingLines={false}
            showCenter={true}
            onItemClick={handleItemClick}
          />
        </Box>
        
        {/* Segments - draaien */}
        <Box 
          style={{ 
            transform: `rotate(${spinRotation}deg)`,
            transition: 'transform 0.5s ease-in-out',
            position: 'relative',
            zIndex: 5
          }}
        >
          <SVGWheelMenuNav
            center={center}
            items={items}
            size="lg"
            variant="donut"
            showConnectingLines={true}
            showCenter={false}
            onItemClick={handleItemClick}
          />
        </Box>
      </Box>

      {/* Spin Button */}
      <Box mt={6} textAlign="center" position="relative" zIndex={10}>
        <Button
          onClick={handleSpinWheel}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          size="lg"
          colorScheme="primary"
          bg="white"
          color="black"
          _hover={{
            bg: 'gray.100',
            transform: 'scale(1.05)'
          }}
          _active={{
            bg: 'gray.200'
          }}
          _focus={{
            bg: 'gray.100',
            outline: 'none'
          }}
          transition="all 0.2s"
          borderRadius="full"
          px={8}
          py={4}
          fontSize="lg"
          fontWeight="bold"
          boxShadow="lg"
          userSelect="none"
          cursor="pointer"
          position="relative"
          zIndex={10}
        >
          Spin
        </Button>
      </Box>
    </Box>
  );
}
