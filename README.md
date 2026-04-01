# PG Finder Platform - Frontend

A modern React frontend for finding and managing PG (Paying Guest) accommodations. Built with Vite, React, Tailwind CSS, and Framer Motion for smooth animations.

## 🚀 Features

### 1. **Authentication**

- User registration with role selection (Student, Admin)
- JWT-based login system
- Secure token storage
- Role-based access control

### 2. **Student Dashboard**

- Browse all available PGs
- Filter by location and rent range
- View detailed PG information
- Contact PG owners via chat
- Interactive PG card with animations

### 3. **Admin Dashboard**

- Create, edit, and delete PG listings
- Post notices for students
- View and manage all messages
- Statistics on listings and activity

### 4. **Super Admin Dashboard**

- Approve/reject admin requests
- View all users and PGs
- Platform-wide statistics
- User management

### 5. **Chat System**

- Real-time messaging interface
- Direct communication between students and owners
- Message history
- Conversation list

### 6. **Animations (Framer Motion)**

- Page transitions with fade + slide
- PG card hover effects with scale and shadow
- Modal scale + fade animations
- Button tap and hover animations
- Staggered list loading animations
- Message fade-in animations
- Loading skeleton shimmer effects
- Smooth navbar transitions

## 📦 Tech Stack

- **React 18+** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

## 🎨 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button.tsx
│   ├── PGCard.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── ChatUI.tsx
│   ├── NoticeBoard.tsx
│   ├── Skeleton.tsx
│   ├── ProtectedRoute.tsx
│   └── index.ts
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── StudentDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── SuperAdminDashboard.tsx
│   ├── MessagesPage.tsx
│   └── index.ts
├── layouts/           # Layout components
│   └── MainLayout.tsx
├── context/           # React Context
│   └── AuthContext.tsx
├── hooks/             # Custom hooks
│   └── useAuth.ts
├── services/          # API services
│   ├── authService.ts
│   ├── pgService.ts
│   ├── messageService.ts
│   └── adminService.ts
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Soumay0/pg-finder.git
cd pg-finder
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API URL:

```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. User registers with email, password, and role
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is sent in Authorization header for protected requests
5. On page load, user data is fetched using stored token
6. Invalid/expired tokens redirect to login

## 🎭 Component Highlights

### Animated PG Card

- Staggered loading animation
- Scale and shadow on hover
- Image zoom on hover
- Smooth transitions

### Modal with Animations

- Backdrop fade-in with dark overlay
- Content scale and fade animation
- Close button rotation animation
- Responsive sizing

### Chat Interface

- Message fade-in animation
- Auto-scroll to bottom
- Sent/received message styling
- Real-time message updates

### Loading Skeleton

- Shimmer animation effect
- Multiple skeleton cards
- Responsive grid layout
- Smooth looping animation

## 🌐 API Integration

The frontend communicates with the backend API for:

- Authentication (login/register)
- PG listings (CRUD operations)
- Messaging (send/receive)
- Notices (create/delete)
- Admin requests (approve/reject)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Responsive grid layouts
- Mobile-optimized navigation with hamburger menu
- Touch-friendly button sizes

## 🎨 Color Palette

- **Primary**: #3B82F6 (Blue)
- **Secondary**: #10B981 (Green)
- **Accent**: #F59E0B (Amber)
- **Dark**: #1F2937 (Dark Gray)
- **Light**: #F9FAFB (Off White)

## 📚 Component Documentation

### Button

```jsx
<Button variant="primary" onClick={handleClick} fullWidth>
  Click Me
</Button>
```

### PGCard

```jsx
<PGCard pg={pgData} onClick={handleSelect} index={0} />
```

### Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Details" size="md">
  <p>Modal content</p>
</Modal>
```

### ChatUI

```jsx
<ChatUI messages={messages} currentUserId={userId} onSendMessage={handleSend} />
```

## 🔄 State Management

- **Authentication**: Context API + localStorage
- **UI State**: Component-level React state
- **Loading States**: Boolean flags in components
- **Message Cache**: In-memory arrays (can be replaced with Redux/Zustand)

## ⚡ Performance Optimizations

- Code splitting with React Router
- Lazy loading of routes
- Optimized animations with Framer Motion
- CSS-in-JS with Tailwind (no extra HTTP requests)
- Image optimization placeholders
- Skeleton loading for faster perceived performance

## 🐛 Common Issues

### API calls returning 401

- Check if token is in localStorage
- Ensure token is valid and not expired
- Verify backend API is running

### Animations not working

- Ensure Framer Motion is installed
- Check browser compatibility (Chrome, Firefox, Safari, Edge)
- Verify CSS transitions are not disabled

### Styles not applying

- Clear Tailwind cache: `npm run build -- --clear`
- Rebuild the project: `npm run build`
- Check if PostCSS is configured

## 📚 Resources

- [React Documentation](https://react.dev)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)
- [React Router](https://reactrouter.com)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Soumay** - [GitHub](https://github.com/Soumay0)

## 🙏 Acknowledgments

- React community for amazing tools and libraries
- Framer for Motion library
- Tailwind CSS team
- Open-source contributors

## 📞 Support

For support, email support@pgfinder.com or open an issue on GitHub.

---

**Happy Coding! 🚀**
tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },

},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
