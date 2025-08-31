'use client';

import { useState } from 'react';
import { 
  Container, 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Textarea, 
  Button, 
  useToast
} from '@chakra-ui/react';

export default function IntroWakefulnessPage() {
  const [userResponse, setUserResponse] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [language, setLanguage] = useState('english');
  const toast = useToast();

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'dutch' : 'english');
  };

  const handleSave = () => {
    if (userResponse.trim()) {
      const savedBlessings = JSON.parse(localStorage.getItem('wakefulness-blessings') || '[]');
      const newBlessing = {
        id: Date.now(),
        text: userResponse,
        date: new Date().toISOString(),
        language: language
      };
      savedBlessings.push(newBlessing);
      localStorage.setItem('wakefulness-blessings', JSON.stringify(savedBlessings));
      
      setIsSaved(true);
      setUserResponse('');
      
      toast({
        title: 'Blessing saved!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const content = {
    english: {
      title: 'Wakefulness',
      arabic: 'Al-yaqazah',
      arabicText: 'اليَقَظَةُ',
      intro: 'This station is about al-yaqazah, meaning wakefulness.',
      quran: '"Say, \'Surely I admonish you with one (thing) only, that you rise up to God by twos and singly; thereafter meditate.\'" - Quran 34:46',
      explanation: 'Rising up or stepping up for God means you are waking up from the sleep of forgetting Him and getting out of a dangerous spot during a spiritual low. God lights your heart up with life so you can see the warning light.',
      aspectsTitle: 'It is based on three aspects:',
      aspects: [
        {
          number: '1 - Bounty and favors of Allah - ni\'mah.',
          text: 'I look at the blessings in my life, knowing I can\'t even count them all. I stop and really see what Allah has given me, focusing on understanding the favor He has shown me, and recognizing where I fall short in being grateful for these gifts.'
        },
        {
          number: 'The second:',
          text: 'I honestly look at my mistakes and wrongdoings, I see the danger in them, I get ready to make things right, I free myself from being trapped by my bad habits, and I seek Allah\'s forgiveness by purifying my heart.'
        },
        {
          number: 'The third:',
          text: 'I pay attention to how my days are passing - what I\'m gaining and what I\'m losing. I stop wasting time on things that don\'t matter, and I focus on making the most of each day so I can make up for what I\'ve missed and fill my time with what truly matters.'
        }
      ],
      actionTitle: 'Your Wakefulness Action',
      actionText: 'Write all the blessings down you can think of:',
      responsePlaceholder: 'Write your blessings here...',
      languageToggle: 'Nederlands'
    },
    dutch: {
      title: 'Wakkerheid',
      arabic: 'Al-yaqazah',
      arabicText: 'اليَقَظَةُ',
      intro: 'Dit station gaat over al-yaqazah, wat wakkerheid betekent.',
      quran: '"Zeg: \'Ik vermaan jullie slechts met één ding: dat jullie voor Allah opstaan, twee aan twee en alleen, en dan nadenken.\'" - Koran 34:46',
      explanation: 'Opstaan of opklimmen voor Allah betekent dat je wakker wordt uit de slaap van het vergeten van Hem en uit een gevaarlijke situatie komt tijdens een spiritueel dieptepunt. Allah verlicht je hart met leven zodat je het waarschuwingslicht kunt zien.',
      aspectsTitle: 'Het is gebaseerd op drie aspecten:',
      aspects: [
        {
          number: '1 - Overvloed en gunsten van Allah - ni\'mah.',
          text: 'Ik kijk naar de zegeningen in mijn leven, wetend dat ik ze niet eens allemaal kan tellen. Ik stop en zie echt wat Allah mij heeft gegeven, ik focus op het begrijpen van de gunst die Hij mij heeft getoond, en ik herken waar ik tekortschiet in dankbaarheid voor deze geschenken.'
        },
        {
          number: 'Het tweede:',
          text: 'Ik kijk eerlijk naar mijn fouten en verkeerde daden, ik zie het gevaar erin, ik maak me klaar om dingen recht te zetten, ik bevrijd mezelf van het vastzitten in mijn slechte gewoontes, en ik zoek Allah\'s vergeving door mijn hart te zuiveren.'
        },
        {
          number: 'Het derde:',
          text: 'Ik let op hoe mijn dagen voorbijgaan - wat ik win en wat ik verlies. Ik stop met tijd verspillen aan dingen die er niet toe doen, en ik focus op het beste maken van elke dag zodat ik kan inhalen wat ik heb gemist en mijn tijd kan vullen met wat echt belangrijk is.'
        }
      ],
      actionTitle: 'Jouw Wakkerheid Actie',
      actionText: 'Schrijf alle zegeningen op die je kunt bedenken:',
      responsePlaceholder: 'Schrijf hier je zegeningen...',
      languageToggle: 'English'
    }
  };

  const currentContent = content[language as keyof typeof content] || content.english;

  return (
    <Box 
      minH="100vh" 
      bg="gray.900"
      color="white"
      p={4}
    >
      <Container maxW="container.md" py={8}>
        <Box
          bg="gray.800"
          borderRadius="xl"
          p={8}
          boxShadow="xl"
          minH="90vh"
          position="relative"
        >
          {/* Language Toggle */}
          <Button
            position="absolute"
            top={4}
            right={4}
            onClick={toggleLanguage}
            size="sm"
            colorScheme="purple"
          >
            {currentContent.languageToggle}
          </Button>

          <VStack spacing={6} align="stretch">
            {/* Title Section */}
            <VStack spacing={2} mb={8}>
              <Heading size="2xl" textAlign="center" color="white">
                {currentContent.title}
              </Heading>
              
              <Text fontSize="xl" fontWeight="bold" textAlign="center" color="white">
                {currentContent.arabic}
              </Text>
              
              <Text
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
                color="white"
                style={{ direction: 'rtl' }}
              >
                {currentContent.arabicText}
              </Text>
            </VStack>

            {/* Intro Text */}
            <Text fontSize="lg" lineHeight="1.6" textAlign="center" color="white" fontStyle="italic" mb={8}>
              {currentContent.intro}
            </Text>

            {/* Quran Quote */}
            <Box p={6} borderRadius="lg" bg="purple.900" border="1px solid" borderColor="purple.500" mb={8} textAlign="center">
              <Text fontSize="lg" lineHeight="1.6" color="white" fontStyle="italic" mb={2}>
                {currentContent.quran}
              </Text>
            </Box>

            {/* Explanation */}
            <Box p={6} borderRadius="lg" bg="purple.900" border="1px solid" borderColor="purple.500" mb={8} textAlign="center">
              <Text fontSize="xl" lineHeight="1.6" color="white">
                {currentContent.explanation}
              </Text>
            </Box>

            {/* Aspects Section */}
            <VStack spacing={6} mb={8}>
              <Heading size="lg" textAlign="center" color="white">
                {currentContent.aspectsTitle}
              </Heading>
              
              <VStack spacing={4} w="100%">
                {currentContent.aspects.map((aspect: { number: string; text: string }, index: number) => (
                  <Box
                    key={index}
                    p={6}
                    borderRadius="lg"
                    bg="purple.900"
                    border="1px solid"
                    borderColor="purple.500"
                    textAlign="left"
                    w="100%"
                  >
                    <Text fontSize="md" lineHeight="1.6" color="white">
                      <Text as="span" fontWeight="bold" color="white">
                        {aspect.number}
                      </Text>{' '}
                      {aspect.text}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>

            {/* Interactive Section */}
            <Box p={8} borderRadius="xl" bg="purple.900" border="1px solid" borderColor="purple.500" mt={8}>
              <VStack spacing={6} align="stretch">
                <Heading size="lg" textAlign="center" color="white">
                  {currentContent.actionTitle}
                </Heading>
                
                <Text textAlign="center" color="white">
                  {currentContent.actionText}
                </Text>
                
                <Textarea
                  placeholder={currentContent.responsePlaceholder}
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  rows={4}
                  variant="filled"
                  resize="vertical"
                  bg="gray.700"
                  border="1px solid"
                  borderColor="purple.500"
                  color="white"
                  _focus={{
                    borderColor: 'purple.300',
                    boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3)',
                  }}
                />
                
                {isSaved && (
                  <Text textAlign="center" color="green.400" fontSize="sm" fontStyle="italic">
                    Blessing saved!
                  </Text>
                )}
                
                <Button
                  onClick={handleSave}
                  colorScheme="purple"
                  size="lg"
                  alignSelf="center"
                  disabled={!userResponse.trim()}
                >
                  Save Blessing
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
} 