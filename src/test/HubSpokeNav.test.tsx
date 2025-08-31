import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import HubSpokeNav from '@/patterns/HubSpokeNav';
import { Hub, Spoke } from '@/lib/api/hub';

// Mock data for testing
const mockHub: Hub = {
  id: 'allah',
  title: 'Allah',
  description: 'De centrale hub van de Wheel of Islam',
  totalSpokes: 3
};

const mockSpokes: Spoke[] = [
  {
    id: 'iman',
    title: 'Iman (Geloof)',
    description: 'De zes pilaren van het geloof',
    icon: '🕌',
    status: 'not-started',
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 10,
    category: 'belief',
    estimatedDuration: '2 uur'
  },
  {
    id: 'ibadah',
    title: 'Ibadah (Aanbidding)',
    description: 'De vijf pilaren van de islam',
    icon: '🙏',
    status: 'in-progress',
    progress: 30,
    lessonsCompleted: 3,
    totalLessons: 10,
    category: 'worship',
    estimatedDuration: '3 uur'
  },
  {
    id: 'akhlaq',
    title: 'Akhlaq (Moraal)',
    description: 'Islamitische ethiek en karakter',
    icon: '💎',
    status: 'completed',
    progress: 100,
    lessonsCompleted: 8,
    totalLessons: 8,
    category: 'character',
    estimatedDuration: '2.5 uur'
  }
];

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Chakra UI toast
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

const renderWithChakra = (component: React.ReactElement) => {
  return render(
    <ChakraProvider>
      {component}
    </ChakraProvider>
  );
};

describe('HubSpokeNav', () => {
  it('renders hub and spokes correctly', () => {
    renderWithChakra(
      <HubSpokeNav 
        hub={mockHub} 
        spokes={mockSpokes}
        showTitle={true}
        showDescription={true}
      />
    );

    // Check if hub title is rendered
    expect(screen.getByText('Allah')).toBeInTheDocument();
    
    // Check if spoke titles are rendered
    expect(screen.getByText('Iman (Geloof)')).toBeInTheDocument();
    expect(screen.getByText('Ibadah (Aanbidding)')).toBeInTheDocument();
    expect(screen.getByText('Akhlaq (Moraal)')).toBeInTheDocument();
  });

  it('displays progress information correctly', () => {
    renderWithChakra(
      <HubSpokeNav 
        hub={mockHub} 
        spokes={mockSpokes}
        showTitle={true}
        showDescription={true}
      />
    );

    // Check progress summary
    expect(screen.getByText('1 van 3 thema\'s voltooid')).toBeInTheDocument();
    expect(screen.getByText('11 lessen afgerond')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    renderWithChakra(
      <HubSpokeNav 
        hub={mockHub} 
        spokes={mockSpokes}
        showTitle={true}
        showDescription={true}
      />
    );

    const container = screen.getByRole('application');
    
    // Focus the container
    fireEvent.focus(container);
    
    // Test arrow key navigation
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    fireEvent.keyDown(container, { key: 'Enter' });
  });

  it('renders without title and description when disabled', () => {
    renderWithChakra(
      <HubSpokeNav 
        hub={mockHub} 
        spokes={mockSpokes}
        showTitle={false}
        showDescription={false}
      />
    );

    // Should not show the main title
    expect(screen.queryByText('Wheel of Islam')).not.toBeInTheDocument();
    
    // But should still show hub and spokes
    expect(screen.getByText('Allah')).toBeInTheDocument();
    expect(screen.getByText('Iman (Geloof)')).toBeInTheDocument();
  });

  it('applies correct ARIA attributes', () => {
    renderWithChakra(
      <HubSpokeNav 
        hub={mockHub} 
        spokes={mockSpokes}
        showTitle={true}
        showDescription={true}
      />
    );

    // Check ARIA roles
    expect(screen.getByRole('application')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    // Check ARIA labels
    const hubButton = screen.getByLabelText('Allah - De centrale hub van de Wheel of Islam');
    expect(hubButton).toBeInTheDocument();
  });
}); 