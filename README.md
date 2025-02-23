# Event Booking System

A modern React application for managing event bookings with features like real-time availability tracking, waitlist management, and a smooth user interface built with Tailwind CSS and Framer Motion.

## Features

- 🔐 User authentication system (demo - use any username/password)("Like use any username and Password")
- 📅 Event listing and detailed views
- ✨ Real-time booking management
- ⏳ Waitlist system
- 🎨 Smooth animations using Framer Motion
- 📱 Responsive design
- 🔄 Local storage persistence
- 📊 Visual statistics with Recharts

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React (icons)
- React Router DOM

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
```bash
git clone <your-repository-url>
cd event-booking-system
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_TOTAL_SLOTS=10
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Login Instructions
- Access the application at http://localhost:5173 (or the port shown in your terminal)
- Use any username and password combination to log in (demo mode)
- Your session will be preserved in localStorage

## Project Structure and Features

### Key Components

1. **Login Page**
   - Simple authentication demo
   - Animated transitions
   - Session management

2. **Event Listing**
   - Search and filter events
   - Real-time availability
   - Responsive grid layout

3. **Event Details**
   - Interactive booking system
   - Waitlist management
   - Visual statistics
   - Booking/cancellation handling

4. **Booking Modal**
   - Multi-step booking process
   - Form validation
   - Animated transitions

## Development Information

This project uses Vite with the following official plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) (Babel)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (SWC)

### ESLint Configuration

For production applications, enable type-aware lint rules:

1. Configure `parserOptions`:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. Update ESLint configurations:
```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Key Features Explained

### Booking System
- Real-time availability tracking
- Automatic waitlist management
- Booking cancellation with waitlist promotion
- Local storage persistence

### User Interface
- Smooth transitions and animations
- Interactive pie charts for statistics
- Responsive design for all screen sizes
- Icon integration with Lucide React

### Form Handling
- Multi-step booking process
- Form validation
- Error handling
- User feedback with toast notifications

## Contributing

Feel free to submit issues and enhancement requests!

