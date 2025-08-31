# SVGWheelMenuNav Pattern

Een moderne SVG-gebaseerde wheel navigatie component met three-level scaling systeem.

## 🎯 Features

- **Three-Level Scaling**: Container, ring en segment niveau schaling
- **Responsive Design**: Automatische schaling op basis van schermgrootte
- **SVG-gebaseerd**: Pure SVG rendering voor perfecte schaalbaarheid
- **Constant Stroke Widths**: Visueel consistente lijnen en gaps
- **Keyboard Navigation**: Volledige keyboard ondersteuning
- **Accessibility**: ARIA labels en screen reader support
- **Theme Integration**: Chakra UI theme kleuren

## 🚀 Gebruik

```tsx
import SVGWheelMenuNav from '@/patterns/WheelMenuNav';

const center = {
  id: 'allah',
  title: 'Allah',
  description: 'De centrale hub'
};

const items = [
  {
    id: 'iman',
    title: 'Iman',
    description: 'Geloof',
    icon: '🕌',
    status: 'in-progress',
    progress: 30
  }
  // ... meer items
];

<SVGWheelMenuNav
  center={center}
  items={items}
  size="md"
  variant="donut"
  showConnectingLines={true}
/>
```

## 🎨 Three-Level Scaling System

### **Container Level (a)**
- De hele wheel schaalt mee met de container
- viewBox en preserveAspectRatio voor perfecte schaling
- Vierkante aspect-ratio wrapper

### **Ring Level (b)**
- Dikte van de ring blijft visueel consistent
- vector-effect="non-scaling-stroke" voor constante stroke widths
- Constante gap widths tussen segmenten

### **Segment Level (c)**
- Individuele segmenten kunnen apart geschaald worden
- Transform: translate → scale → translate om het middelpunt
- Smooth transitions tussen verschillende groottes

## 📱 Responsive Breakpoints

- **2560px+**: 1.2x scale, stroke: 3px, gap: 2px
- **1920px+**: 1.0x scale, stroke: 2px, gap: 1.5px
- **1366px+**: 0.9x scale, stroke: 2px, gap: 1.5px
- **1024px+**: 0.8x scale, stroke: 1.5px, gap: 1px
- **768px+**: 0.7x scale, stroke: 1.5px, gap: 1px
- **Default**: 0.6x scale, stroke: 1px, gap: 0.5px

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `Center` | - | Centrale hub data |
| `items` | `Item[]` | - | Array van segment items |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Grootte van de wheel |
| `variant` | `'circle' \| 'donut'` | `'donut'` | Rendering variant |
| `showConnectingLines` | `boolean` | `true` | Toon verbindingslijnen |
| `onCenterClick` | `function` | - | Center click handler |
| `onItemClick` | `function` | - | Item click handler |

## 🎯 Componenten

- **SVGWheelContainer**: Hoofdcontainer met viewBox scaling
- **SVGWheelCenter**: Centrale hub (SVG circle voor donut)
- **SVGWheelSegment**: Individuele segmenten (SVG paths)

## 🚀 Performance

- **Pure SVG**: Geen library dependencies
- **Efficient Rendering**: Alleen noodzakelijke updates
- **Smooth Animations**: CSS transitions en transforms
- **Memory Efficient**: Geen onnodige re-renders