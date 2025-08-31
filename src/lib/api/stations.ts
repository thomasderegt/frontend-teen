export interface StationData {
  id: string;
  title: string;
  description: string;
  steps: StepData[];
}

export interface StepData {
  id: string;
  stepNumber: number;
  title: string;
  description?: string;
  content: ContentData[];
  isCompleted?: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ContentData {
  id: string;
  nodeType: string;
  text: string;
  children?: ContentData[];
  order?: number;
  options?: QuizOption[]; // Voor quiz vragen
}

export async function getStation(stationId: string): Promise<StationData> {
  try {
    const response = await fetch(`/api/stations/${stationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching station:', error);
    throw new Error('Failed to fetch station data');
  }
}

