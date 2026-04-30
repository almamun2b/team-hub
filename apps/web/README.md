# Travel Buddy

A modern full-stack travel companion matching platform that connects travelers worldwide, enabling them to find compatible travel partners, share experiences, and create unforgettable journeys together.

## 🌟 Summary

Travel Buddy is a comprehensive web application built with Next.js 15, TypeScript, and Tailwind CSS that helps travelers connect with like-minded individuals. The platform features user authentication, profile management, travel plan creation and matching, review systems, and subscription management - all designed to make travel planning and companion finding seamless and enjoyable.

## 📝 Description & Introduction

Travel Buddy addresses the common challenge of finding reliable travel companions. Whether you're planning a solo adventure and want company, or looking to join existing travel plans, our platform makes it easy to connect with verified travelers who share your interests and travel style.

### Key Features:

- **User Authentication**: Secure login, registration, email verification, and password management
- **Profile Management**: Detailed traveler profiles with interests, visited countries, and verification badges
- **Travel Plans**: Create, browse, and join travel plans with detailed information
- **Smart Matching**: AI-powered matching algorithm to find compatible travel partners
- **Review System**: Build trust through community reviews and ratings
- **Admin Dashboard**: Comprehensive admin tools for user and content management
- **Subscription Plans**: Premium features with flexible pricing options

## 🚀 How to Run This Project Locally

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

### Frontend Setup

1. **Clone the repository**

```bash
git clone https://github.com/almamun2b/travel-buddy.git
cd travel-buddy
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Clone the backend repository**

```bash
git clone https://github.com/almamun2b/travel-buddy-api.git
cd travel-buddy-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**
   Create a `.env` file:

```env
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
PORT=8000
```

4. **Run the backend server**

```bash
npm run dev
```

## 🎯 Project Aim & Objectives

### Primary Goals:

1. **Connect Travelers**: Create a global community where travelers can find reliable companions
2. **Enhance Safety**: Implement verification systems and reviews to build trust
3. **Simplify Planning**: Make travel planning collaborative and efficient
4. **Build Community**: Foster meaningful connections between travel enthusiasts
5. **Promote Responsible Travel**: Encourage safe and respectful travel practices

### Technical Objectives:

- Modern, responsive UI with excellent user experience
- Scalable architecture supporting global user base
- Real-time features for enhanced interactivity
- Robust security and data protection
- SEO optimization for better discoverability

## 💡 Use Cases & Applications

### For Travelers:

- **Solo Travelers**: Find companions for safer and more enjoyable trips
- **Group Organizers**: Recruit members for group travel plans
- **Adventure Seekers**: Connect with like-minded adventure enthusiasts
- **Cultural Exchange**: Meet locals and travelers from different backgrounds

### For Travel Planning:

- **Trip Collaboration**: Plan trips together with shared itineraries
- **Cost Sharing**: Split expenses and find budget-friendly travel options
- **Skill Sharing**: Find companions with specific skills (languages, photography, etc.)
- **Safety**: Travel with verified and reviewed companions

### For Community Building:

- **Travel Blogging**: Share experiences and build your travel profile
- **Networking**: Connect with travelers in your destination cities
- **Local Insights**: Get authentic travel tips from community members

## 🔗 Live URLs & Repository

### 🌐 Live Applications

- **Frontend**: [https://travel-buddy-mamun.vercel.app/](https://travel-buddy-mamun.vercel.app/)
- **Backend API**: [https://travel-buddy-api-5xvg.onrender.com/](https://travel-buddy-api-5xvg.onrender.com/)

### 📚 Source Code

- **Frontend Repository**: [https://github.com/almamun2b/travel-buddy](https://github.com/almamun2b/travel-buddy)
- **Backend Repository**: [https://github.com/almamun2b/travel-buddy-api](https://github.com/almamun2b/travel-buddy-api)

## 🛠️ Technology Stack

### Frontend:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and server components
- **Authentication**: NextAuth.js
- **API Integration**: Custom fetch utilities

### Backend:

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **File Upload**: Cloudinary
- **Email Service**: Nodemailer

### Deployment:

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: PostgreSQL (Render)
- **File Storage**: Cloudinary

## 🌟 Key Features in Detail

### User Management

- Email verification and password reset
- Profile customization with travel interests
- Verification badges and trust scores
- Review and rating system

### Travel Planning

- Create detailed travel plans with dates, budget, and activities
- Browse and filter travel plans by destination, dates, and interests
- Request to join existing travel plans
- Manage travel requests and approvals

### Matching Algorithm

- Smart matching based on travel preferences
- Compatibility scoring system
- Interest-based recommendations
- Location and date matching

### Admin Features

- User management and moderation
- Travel plan approval workflow
- Analytics and reporting
- Content moderation tools

## 📊 Project Statistics & Metrics

### 📈 Platform Growth

- **Active Users**: Growing community of travel enthusiasts
- **Travel Plans**: Hundreds of active travel plans across destinations
- **Success Rate**: High matching success for compatible travel partners
- **Global Reach**: Users from multiple countries and continents

### 🌍 Popular Destinations

- Europe: Western & Eastern European adventures
- Asia: Cultural exchanges and backpacking routes
- Americas: North & South American explorations
- Africa: Safari and cultural experiences
- Oceania: Australia, New Zealand & Pacific islands

## 🏗️ Project Structure

```
travel-buddy/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (common)/          # Public pages
│   │   ├── (protected)/       # Protected routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── modules/           # Feature-specific components
│   │   ├── shared/            # Shared UI components
│   │   └── ui/                # Base UI components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API service functions
│   ├── types/                 # TypeScript type definitions
│   └── assets/                # Static assets
├── public/                    # Public files
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Development Workflow

### 📋 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix linting issues

# Type Checking
pnpm type-check   # Run TypeScript type checking

# Database (if using local DB)
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio
```

### 🎨 UI Components & Design System

- **Component Library**: Built with shadcn/ui components
- **Design Tokens**: Consistent color palette and spacing
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for dark theme implementation
- **Accessibility**: WCAG compliant components

### 🔐 Security Features

- **Authentication**: JWT-based authentication system
- **Authorization**: Role-based access control (USER/ADMIN)
- **Data Validation**: Input sanitization and validation
- **HTTPS**: Secure communication in production
- **Environment Variables**: Sensitive data protection

## 🚀 Deployment & Production

### 🌐 Environment Configuration

#### Production Environment Variables

```env
# Frontend (Vercel)
NEXT_PUBLIC_API_URL=https://travel-buddy-api-5xvg.onrender.com
NEXTAUTH_URL=https://travel-buddy-mamun.vercel.app
NEXTAUTH_SECRET=production-secret-key

# Backend (Render)
DATABASE_URL=postgresql-production-url
JWT_SECRET=production-jwt-secret
PORT=8000
NODE_ENV=production
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 📦 Deployment Process

1. **Frontend Deployment (Vercel)**

   - Connected to GitHub repository
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

2. **Backend Deployment (Render)**

   - Docker containerized deployment
   - Automatic scaling based on traffic
   - Health checks and monitoring

3. **Database (Render PostgreSQL)**
   - Automated backups
   - High availability configuration
   - Connection pooling

## 🧪 Testing & Quality Assurance

### 📋 Testing Strategy

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Critical user journey testing
- **Performance Testing**: Load testing for scalability

### 🔍 Code Quality Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks for pre-commit checks

## 📱 Mobile Responsiveness

### 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### 🎯 Mobile Features

- **Touch-Friendly**: Optimized for touch interactions
- **Progressive Web App**: PWA capabilities
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Travel plan updates and matches

## 🔄 API Documentation

### 📡 API Endpoints

#### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/verify-email` - Email verification
- `POST /auth/forgot-password` - Password reset

#### Travel Plans

- `GET /travel-plans` - Get all travel plans
- `POST /travel-plans` - Create travel plan
- `GET /travel-plans/:id` - Get travel plan details
- `PUT /travel-plans/:id` - Update travel plan

#### Users

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/travelers` - Get all travelers

### 🔑 Authentication Headers

```javascript
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

## 🌟 Future Enhancements

### 🚀 Upcoming Features

- **Real-time Chat**: In-app messaging between travelers
- **Video Calls**: Video verification and meetings
- **AI Recommendations**: Advanced matching algorithms
- **Mobile App**: Native iOS and Android applications
- **Payment Integration**: Secure payment processing
- **Travel Insurance**: Integrated insurance options

### 🎯 Roadmap

1. **Q1 2024**: Real-time messaging and notifications
2. **Q2 2024**: Mobile app development
3. **Q3 2024**: Advanced AI matching system
4. **Q4 2024**: Global expansion and localization

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Issues**: Report bugs and request features via GitHub Issues
- **Email**: [Your contact email]
- **Live Chat**: Available on the platform
- **Discord**: Join our community Discord server

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this platform
- Special thanks to the travel community for feedback and suggestions
- Built with ❤️ for travelers around the world

---

**Start your travel journey today with Travel Buddy - where adventures meet companions!** 🌍✈️
