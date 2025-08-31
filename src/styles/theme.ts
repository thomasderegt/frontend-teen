import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Default theme colors (previously neon)
const defaultTheme = {
  background: {
    image: "url('/Background.png')",
    size: 'cover',
    position: 'center',
    repeat: 'no-repeat',
    attachment: 'fixed',
  },
  colors: {
    // Primary colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Background colors
    background: {
      primary: '#0a0a0a',      // Main dark background
      secondary: '#1a1a1a',    // Secondary dark background
      tertiary: '#2a2a2a',     // Tertiary dark background
      card: 'rgba(255, 255, 255, 0.1)', // White transparent for cards
      overlay: 'rgba(0, 0, 0, 0.8)',    // Dark overlay
      wakefulness: {
        neon: 'rgba(0, 0, 0, 0.6)',
        standard: 'rgba(255, 255, 255, 0.6)',
        monochrome: 'rgba(255, 255, 255, 0.3)',
      },
    },
    
    // Text colors
    text: {
      primary: '#ffffff',      // White text
      secondary: '#e0e0e0',    // Light gray text
      tertiary: '#b0b0b0',     // Medium gray text
      muted: '#808080',        // Muted gray text
      accent: '#00ff88',       // Neon green accent
    },
    
    // Border colors
    border: {
      primary: 'rgba(255, 255, 255, 0.2)',   // White transparent
      secondary: 'rgba(255, 255, 255, 0.1)', // Lighter white transparent
      accent: '#00ff88',                      // Neon green
      glow: 'rgba(0, 255, 136, 0.3)',        // Glow effect
      wakefulness: {
        neon: 'rgba(139, 92, 246, 0.3)',
        standard: 'rgba(255, 255, 255, 0.2)',
        monochrome: 'rgba(255, 255, 255, 0.2)',
      },
    },
    
    // Accent colors
    accent: {
      green: '#00ff88',        // Neon green
      blue: '#00ffff',         // Neon cyan
      purple: '#ff00ff',       // Neon magenta
      yellow: '#ffff00',       // Neon yellow
      orange: '#ff8800',       // Neon orange
      pink: '#ff0080',         // Neon pink
      neonPurple: '#8B5CF6',   // Neon purple from wakefulness
      neonBlue: '#007bff',     // Neon blue from wakefulness
    },

    // Regenboog kleuren voor inward wheel
    rainbow: {
      red: '#FF0000',          // Rood
      orange: '#FF7F00',       // Oranje
      yellow: '#FFFF00',       // Geel
      green: '#00FF00',        // Groen
      blue: '#0000FF',         // Blauw
      indigo: '#4B0082',       // Indigo
      violet: '#9400D3',       // Violet
      pink: '#FF69B4',         // Roze
      cyan: '#00FFFF',         // Cyaan
      magenta: '#FF00FF',      // Magenta
    },
    
    // Status colors
    success: '#00ff88',
    warning: '#ffff00',
    error: '#ff0080',
    info: '#00ffff',
    
    // Gray scale
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
};

// Verschillende thema's (keeping for compatibility)
const themes = {
  default: defaultTheme,
  
  // Standaard blauw thema
  blue: {
    colors: {
      brand: {
        50: '#E6F3FF',
        100: '#CCE7FF',
        200: '#99CFFF',
        300: '#66B7FF',
        400: '#339FFF',
        500: '#0087FF',
        600: '#0066CC',
        700: '#004499',
        800: '#002266',
        900: '#001133',
      },
    },
  },

  // Groen thema
  green: {
    colors: {
      brand: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
      },
    },
  },

  // Paars thema
  purple: {
    colors: {
      brand: {
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#A855F7',
        600: '#9333EA',
        700: '#7C3AED',
        800: '#6B21A8',
        900: '#581C87',
      },
    },
  },

  // Wakefulness thema
  wakefulness: {
    colors: {
      // Neon thema kleuren
      neon: {
        purple: '#8B5CF6',
        blue: '#007bff',
        background: 'rgba(0, 0, 0, 0.6)',
        card: 'rgba(139, 92, 246, 0.1)',
        border: 'rgba(139, 92, 246, 0.3)',
        glow: '0 0 20px rgba(139, 92, 246, 0.3)',
        hover: 'rgba(139, 92, 246, 0.2)',
        aspect: 'rgba(139, 92, 246, 0.05)',
        aspectBorder: 'rgba(139, 92, 246, 0.2)',
        action: 'rgba(139, 92, 246, 0.15)',
        actionBorder: 'rgba(139, 92, 246, 0.4)',
        textarea: 'rgba(0, 0, 0, 0.3)',
        textareaBorder: 'rgba(139, 92, 246, 0.3)',
      },
      // Standaard thema kleuren
      standard: {
        background: 'rgba(255, 255, 255, 0.6)',
        card: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        hover: 'rgba(255, 255, 255, 0.2)',
        aspect: 'rgba(255, 255, 255, 0.05)',
        aspectBorder: 'rgba(255, 255, 255, 0.1)',
        action: 'rgba(255, 255, 255, 0.15)',
        actionBorder: 'rgba(255, 255, 255, 0.3)',
        textarea: 'rgba(255, 255, 255, 0.1)',
        textareaBorder: 'rgba(255, 255, 255, 0.2)',
      },
      // Zwart-wit thema kleuren
      monochrome: {
        background: 'rgba(255, 255, 255, 0.3)',
        card: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.2)',
        hover: 'rgba(255, 255, 255, 0.2)',
        aspect: 'rgba(255, 255, 255, 0.05)',
        aspectBorder: 'rgba(255, 255, 255, 0.1)',
        action: 'rgba(255, 255, 255, 0.15)',
        actionBorder: 'rgba(255, 255, 255, 0.3)',
        textarea: 'rgba(255, 255, 255, 0.1)',
        textareaBorder: 'rgba(255, 255, 255, 0.2)',
      }
    },
  },

  // Oranje thema
  orange: {
    colors: {
      brand: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
      },
    },
  },

  // Zwart-wit thema
  monochrome: {
    colors: {
      brand: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
  },
};

// Dynamisch thema ophalen (client-side)
const getCurrentTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('selectedTheme') || 'default';
  }
  return 'default'; // Fallback voor server-side rendering
};

// Huidige thema (dynamisch)
const currentTheme = getCurrentTheme();

const theme = extendTheme({
  config,
  
  // Gebruik het geselecteerde thema
  colors: {
    ...themes[currentTheme as keyof typeof themes].colors,
  },
  
  // Component styles
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
          _active: {
            bg: 'primary.700',
          },
        },
        outline: {
          border: '1px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
        ghost: {
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
        accent: {
          bg: 'accent.green',
          color: 'background.primary',
          border: '1px solid',
          borderColor: 'accent.green',
          _hover: {
            bg: 'accent.green',
            opacity: 0.8,
            transform: 'scale(1.02)',
          },
        },
      },
    },
    
    Input: {
      defaultProps: {
        focusBorderColor: 'accent.green',
      },
      variants: {
        filled: {
          field: {
            bg: 'background.card',
            border: '1px solid',
            borderColor: 'border.primary',
            color: 'text.primary',
            _focus: {
              borderColor: 'accent.green',
              boxShadow: '0 0 0 1px rgba(0, 255, 136, 0.3)',
            },
          },
        },
      },
    },
    
    Textarea: {
      defaultProps: {
        focusBorderColor: 'accent.green',
      },
      variants: {
        filled: {
          bg: 'background.card',
          border: '1px solid',
          borderColor: 'border.primary',
          color: 'text.primary',
          _focus: {
            borderColor: 'accent.green',
            boxShadow: '0 0 0 1px rgba(0, 255, 136, 0.3)',
          },
        },
      },
    },
    
    Select: {
      defaultProps: {
        focusBorderColor: 'accent.green',
      },
    },
  },
  
  // Global styles
  styles: {
    global: {
      html: {
        bgImage: "url('/Background.png')",
        bgSize: 'cover',
        bgPosition: 'center',
        bgRepeat: 'no-repeat',
        bgAttachment: 'fixed',
        minHeight: '100vh',
      },
      body: {
        bg: 'transparent',
        color: 'text.primary',
        minHeight: '100vh',
      },
    },
  },
});

export default theme;
export { themes, currentTheme }; 