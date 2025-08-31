export interface Hub {
  id: string;
  title: string;
  description: string;
  image?: string;
  totalSpokes: number;
  type?: 'outward' | 'inward'; // Wheel type
}

export interface Spoke {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0-100
  lessonsCompleted: number;
  totalLessons: number;
  category: string;
  estimatedDuration: string;
  phonetic?: string; // Arabic phonetic
  position?: number; // Position in wheel
  angle?: number; // Angle in degrees
}

export interface HubData {
  hub: Hub;
  spokes: Spoke[];
}

// Outward Wheel Data (Original - Iman, Ibadah, etc.)
const outwardWheelData: HubData = {
  hub: {
    id: 'allah',
    title: 'Allah',
    description: 'De centrale hub van de Wheel of Islam',
    totalSpokes: 8,
    type: 'outward' as const
  },
  spokes: [
    {
      id: 'iman',
      title: 'Iman (Geloof)',
      description: 'De zes pilaren van het geloof',
      icon: '🕌',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
      category: 'belief',
      estimatedDuration: '2 uur',
      position: 1,
      angle: 0
    },
    {
      id: 'ibadah',
      title: 'Ibadah (Aanbidding)',
      description: 'De vijf pilaren van de islam',
      icon: '🙏',
      status: 'in-progress' as const,
      progress: 30,
      lessonsCompleted: 3,
      totalLessons: 10,
      category: 'worship',
      estimatedDuration: '3 uur',
      position: 2,
      angle: 45
    },
    {
      id: 'akhlaq',
      title: 'Akhlaq (Moraal)',
      description: 'Islamitische ethiek en karakter',
      icon: '💎',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8,
      category: 'character',
      estimatedDuration: '2.5 uur',
      position: 3,
      angle: 90
    },
    {
      id: 'muamalat',
      title: 'Muamalat (Transacties)',
      description: 'Islamitische wetten en relaties',
      icon: '🤝',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
      category: 'transactions',
      estimatedDuration: '4 uur',
      position: 4,
      angle: 135
    },
    {
      id: 'sirah',
      title: 'Sirah (Profetische Geschiedenis)',
      description: 'Het leven van de Profeet ﷺ',
      icon: '📚',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 15,
      category: 'history',
      estimatedDuration: '5 uur',
      position: 5,
      angle: 180
    },
    {
      id: 'tazkiyah',
      title: 'Tazkiyah (Zielspurificatie)',
      description: 'Spirituele ontwikkeling',
      icon: '🕊️',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
      category: 'spirituality',
      estimatedDuration: '3 uur',
      position: 6,
      angle: 225
    },
    {
      id: 'dawah',
      title: 'Dawah (Uitnodiging)',
      description: 'Het uitnodigen naar de islam',
      icon: '📢',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 6,
      category: 'outreach',
      estimatedDuration: '2 uur',
      position: 7,
      angle: 270
    },
    {
      id: 'jihad',
      title: 'Jihad (Strijd)',
      description: 'De innerlijke en uiterlijke strijd',
      icon: '⚔️',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8,
      category: 'struggle',
      estimatedDuration: '2.5 uur',
      position: 8,
      angle: 315
    }
  ]
};

// Inward Wheel Data (Spirituality Journey)
const inwardWheelData: HubData = {
  hub: {
    id: 'allah',
    title: 'Wheel of Islam',
    description: 'Insight. Knowledge. Growth',
    totalSpokes: 10,
    type: 'inward' as const
  },
  spokes: [
    {
      id: 'wakefulness',
      title: 'Wakefulness',
      phonetic: 'Yaqzah',
      description: 'Spiritueel ontwaken en bewustzijn',
      icon: '🌅',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8,
      category: 'spirituality',
      estimatedDuration: '2 uur',
      position: 1,
      angle: 0
    },
    {
      id: 'returning',
      title: 'Returning',
      phonetic: 'Inābah',
      description: 'Terugkeer naar Allah en berouw',
      icon: '❤️',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
      category: 'spirituality',
      estimatedDuration: '2.5 uur',
      position: 2,
      angle: 36
    },
    {
      id: 'fleeing',
      title: 'Fleeing',
      phonetic: 'Firār',
      description: 'Vluchten van zonden en verleidingen',
      icon: '🏃',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8,
      category: 'spirituality',
      estimatedDuration: '2 uur',
      position: 3,
      angle: 72
    },
    {
      id: 'self-reckoning',
      title: 'Self Reckoning',
      phonetic: 'Muḥāsabah',
      description: 'Zelfverantwoording en introspectie',
      icon: '🔍',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
      category: 'spirituality',
      estimatedDuration: '3 uur',
      position: 4,
      angle: 108
    },
    {
      id: 'reflection',
      title: 'Reflection',
      phonetic: 'Tafakkur',
      description: 'Diepe reflectie en contemplatie',
      icon: '💭',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
      category: 'spirituality',
      estimatedDuration: '2.5 uur',
      position: 5,
      angle: 144
    },
    {
      id: 'taking-shelter',
      title: 'Taking Shelter',
      phonetic: 'Iʿtiṣām',
      description: 'Toevlucht zoeken bij Allah',
      icon: '🛡️',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8,
      category: 'spirituality',
      estimatedDuration: '2 uur',
      position: 6,
      angle: 180
    },
    {
      id: 'training',
      title: 'Training',
      phonetic: 'Riyāḍah',
      description: 'Spirituele training en discipline',
      icon: '💪',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 15,
      category: 'spirituality',
      estimatedDuration: '4 uur',
      position: 7,
      angle: 216
    },
    {
      id: 'hearing',
      title: 'Hearing',
      phonetic: 'Samāʿ',
      description: 'Luisteren naar de wijsheid van Allah',
      icon: '👂',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
      category: 'spirituality',
      estimatedDuration: '2.5 uur',
      position: 8,
      angle: 252
    },
    {
      id: 'remembrance',
      title: 'Remembrance',
      phonetic: 'Dhikr',
      description: 'Herinnering en gedenken van Allah',
      icon: '🕊️',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
      category: 'spirituality',
      estimatedDuration: '3 uur',
      position: 9,
      angle: 288
    },
    {
      id: 'repentance',
      title: 'Repentance',
      phonetic: 'Tawbah',
      description: 'Berouw en vergeving zoeken',
      icon: '🔄',
      status: 'not-started' as const,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 8,
      category: 'spirituality',
      estimatedDuration: '2 uur',
      position: 10,
      angle: 324
    }
  ]
};

/**
 * Fetch hub data and all spokes
 */
export async function getHub(wheelType: 'outward' | 'inward' = 'outward'): Promise<HubData> {
  try {
    const response = await fetch(`/api/hub?type=${wheelType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { 
        tags: ['hub', `hub-${wheelType}`],
        revalidate: 3600 // Revalidate every hour
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hub data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching hub data:', error);
    // Return fallback data for development
    return wheelType === 'inward' ? inwardWheelData : outwardWheelData;
  }
}

/**
 * Fetch a specific spoke by ID
 */
export async function getSpoke(id: string): Promise<Spoke> {
  try {
    const response = await fetch(`/api/spokes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { 
        tags: ['spoke', `spoke-${id}`],
        revalidate: 1800 // Revalidate every 30 minutes
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch spoke data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching spoke ${id}:`, error);
    throw error;
  }
}

/**
 * Get all available wheel types
 */
export function getWheelTypes() {
  return [
    {
      id: 'inward',
      title: 'Wheel Inward',
      description: 'Spirituele reis en zielspurificatie',
      icon: '🕊️',
      type: 'inward'
    }
  ];
} 