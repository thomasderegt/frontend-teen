import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// Mock data - in production this would come from your Spring Boot backend
const mockSpokesData = {
  iman: {
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
    content: {
      introduction: 'Iman is het fundament van de islam. Het omvat geloof in Allah, Zijn engelen, Zijn boeken, Zijn boodschappers, de Laatste Dag en de voorbeschikking.',
      lessons: [
        {
          id: 'iman-1',
          title: 'Geloof in Allah',
          description: 'Het geloof in de Eenheid van Allah (Tawhid)',
          duration: '15 minuten',
          type: 'video'
        },
        {
          id: 'iman-2',
          title: 'Geloof in de Engelen',
          description: 'De rol van engelen in de schepping',
          duration: '12 minuten',
          type: 'text'
        }
      ]
    }
  },
  ibadah: {
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
    content: {
      introduction: 'Ibadah omvat alle vormen van aanbidding, van de vijf dagelijkse gebeden tot het vasten en de bedevaart.',
      lessons: [
        {
          id: 'ibadah-1',
          title: 'De Shahada',
          description: 'De geloofsbelijdenis',
          duration: '10 minuten',
          type: 'video'
        },
        {
          id: 'ibadah-2',
          title: 'Het Gebed',
          description: 'De vijf dagelijkse gebeden',
          duration: '20 minuten',
          type: 'interactive'
        }
      ]
    }
  },
  akhlaq: {
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
    content: {
      introduction: 'Akhlaq gaat over het ontwikkelen van een goed karakter en morele deugden volgens islamitische principes.',
      lessons: []
    }
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // In production, fetch from Spring Boot backend
    // const response = await fetch(`http://localhost:8080/api/spokes/${id}`);
    // const data = await response.json();
    
    // For now, return mock data
    const data = mockSpokesData[id as keyof typeof mockSpokesData];

    if (!data) {
      return NextResponse.json(
        { error: 'Spoke not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching spoke data:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch spoke data' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Revalidate specific spoke data
    revalidateTag(`spoke-${id}`);
    revalidateTag('spoke');
    
    return NextResponse.json({ message: `Spoke ${id} data revalidated` });
  } catch (error) {
    console.error('Error revalidating spoke data:', error);
    
    return NextResponse.json(
      { error: 'Failed to revalidate spoke data' },
      { status: 500 }
    );
  }
} 