# Wheel of Islam - Teen Frontend

Een moderne Next.js frontend applicatie voor islamitisch onderwijs voor tieners, gebouwd met TypeScript, Chakra UI, en TanStack Query.

## 🚀 Features

- **Next.js 14+** met App Router voor moderne routing
- **TypeScript** voor type-veiligheid
- **Chakra UI** voor toegankelijke en consistente UI-componenten
- **TanStack Query** voor server state management en caching
- **Auth.js** voor veilige authenticatie
- **Design Tokens** voor consistente styling
- **ESLint & Prettier** voor code kwaliteit
- **Responsive Design** voor alle apparaten

## 📁 Project Structuur

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route group voor authenticatie
│   ├── (dashboard)/       # Route group voor dashboard
│   ├── api/               # API routes
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading component
│   ├── not-found.tsx      # 404 pagina
│   └── layout.tsx         # Root layout
├── components/            # Herbruikbare componenten
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── providers/             # React providers
├── styles/                # Styling en thema
├── tokens/                # Design tokens
├── types/                 # TypeScript type definities
└── utils/                 # Utility functies
```

## 🛠️ Technische Stack

- **Framework**: Next.js 14+ met App Router
- **Language**: TypeScript
- **Styling**: Chakra UI + Design Tokens
- **State Management**: TanStack Query
- **Authentication**: Auth.js (NextAuth)
- **Code Quality**: ESLint + Prettier
- **Package Manager**: npm

## 🚀 Getting Started

### Vereisten

- Node.js 18+ (aanbevolen)
- npm of yarn

### Installatie

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd frontend-teen
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Start de development server**
   ```bash
   npm run dev
   ```

4. **Open de applicatie**
   Navigeer naar [http://localhost:3000](http://localhost:3000)

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build voor productie
npm run start        # Start productie server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code met Prettier
npm run format:check # Check code formatting
npm run type-check   # TypeScript type checking

# Utilities
npm run clean        # Clean build directories
```

## 🎨 Design System

### Design Tokens

Het project gebruikt een gestructureerd design token systeem:

- **Colors**: Primaire, secundaire en semantische kleuren
- **Spacing**: Consistente spacing schaal
- **Typography**: Font sizes, weights en line heights
- **Breakpoints**: Responsive breakpoints

### Thema

Het Chakra UI thema is geconfigureerd met:
- Custom kleuren en spacing
- Component varianten
- Global styles
- Responsive breakpoints

## 🔐 Authenticatie

De applicatie gebruikt Auth.js voor authenticatie:

- **Credentials Provider**: Email/wachtwoord login
- **JWT Sessions**: Veilige sessie management
- **Protected Routes**: Route bescherming
- **Custom Pages**: Aangepaste login/logout pagina's

### Demo Login

Voor development kun je willekeurige email en wachtwoord gebruiken.

## 📱 Responsive Design

De applicatie is volledig responsive met:
- Mobile-first approach
- Flexibele layouts
- Adaptive componenten
- Touch-friendly interfaces

## 🧪 Development

### Code Style

- **ESLint**: Code linting met Next.js configuratie
- **Prettier**: Automatische code formatting
- **TypeScript**: Strict type checking

### Best Practices

- Gebruik TypeScript voor alle nieuwe code
- Volg de ESLint regels
- Schrijf toegankelijke componenten
- Test componenten waar mogelijk
- Documenteer complexe logica

## 🚀 Deployment

### Build

```bash
npm run build
```

### Environment Variables

Maak een `.env.local` bestand aan:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📚 Documentatie

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Auth.js Documentation](https://next-auth.js.org/)

## 🤝 Bijdragen

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/amazing-feature`)
3. Commit je wijzigingen (`git commit -m 'Add amazing feature'`)
4. Push naar de branch (`git push origin feature/amazing-feature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is onder de MIT licentie - zie de [LICENSE](LICENSE) file voor details.

## 🆘 Support

Voor vragen of problemen:
- Open een issue in de repository
- Neem contact op met het development team
- Raadpleeg de documentatie

---

**Gebouwd met ❤️ voor islamitisch onderwijs**
