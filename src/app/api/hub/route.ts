import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// Outward Wheel Data (Original - Iman, Ibadah, etc.)
const outwardWheelData = {
  hub: {
    id: 'allah',
    title: 'Allah',
    description: 'De centrale hub van de Wheel of Islam',
    totalSpokes: 8,
    type: 'outward'
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
const inwardWheelData = {
  hub: {
    id: 'allah',
    title: 'One True God',
    description: 'Allah - الله',
    totalSpokes: 10,
    type: 'inward'
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

export async function GET(request: NextRequest) {
  try {
    // Get the wheel type from query parameters, default to 'outward'
    const { searchParams } = new URL(request.url);
    const wheelType = searchParams.get('type') as 'outward' | 'inward' || 'outward';

    // Validate wheel type
    if (!['outward', 'inward'].includes(wheelType)) {
      return NextResponse.json(
        { error: 'Invalid wheel type. Must be "outward" or "inward"' },
        { status: 400 }
      );
    }

    // Get the appropriate data based on wheel type
    const hubData = wheelType === 'inward' ? inwardWheelData : outwardWheelData;

    return NextResponse.json(hubData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in hub API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hub data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wheelType = searchParams.get('type') as 'outward' | 'inward' || 'outward';

    // Revalidate the appropriate tags
    revalidateTag('hub');
    revalidateTag(`hub-${wheelType}`);

    return NextResponse.json({ 
      message: `Hub data revalidated for ${wheelType} wheel`,
      revalidated: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revalidating hub data:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate hub data' },
      { status: 500 }
    );
  }
} 