# 🧠 Brainwave Platform

A comprehensive collaborative learning platform that combines live study sessions, knowledge sharing, course creation, and file collaboration.

## ✨ Features

### 🎯 Core Modules
- **Live Study Rooms** - Video calls, screen sharing, real-time chat
- **Knowledge Hub** - Q&A forum with voting system
- **Course Platform** - Create and sell courses
- **File Collaboration** - Document sharing and collaboration
- **User Management** - Role-based access control

### 🔐 Authentication
- Email magic links
- OAuth providers (Google, GitHub)
- Role-based permissions (Student, Teacher, Moderator, Admin)

### 💰 Monetization
- Freemium subscriptions
- Course marketplace
- Premium features

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone & Install
```bash
git clone <repository-url>
cd brainwave-platform
npm install
```

### 2. Environment Setup
Copy `.env.local` and update with your credentials:
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/brainwave_platform"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup
```bash
# Setup database with sample data
npm run db:setup
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📁 Project Structure

```
brainwave-platform/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── study-rooms/       # Study room features
│   ├── marketplace/       # Course marketplace
│   └── blog/             # Knowledge hub
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── dashboard/        # Dashboard components
│   └── study-rooms/      # Study room components
├── lib/                  # Utilities
│   ├── auth.ts          # Authentication config
│   ├── prisma.ts        # Database client
│   └── utils.ts         # Helper functions
├── prisma/              # Database schema
└── scripts/             # Setup scripts
```

## 🗄️ Database Schema

### Core Models
- **User** - Authentication, profiles, roles
- **StudyRoom** - Live study sessions
- **Course** - Course content and lessons
- **Post** - Knowledge hub discussions
- **File** - Document management
- **Message** - Real-time chat

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS + Radix UI
- **Real-time**: Socket.io
- **File Storage**: AWS S3 (configurable)
- **Video**: WebRTC/Agora SDK

## 📚 API Endpoints

### Study Rooms
- `GET /api/study-rooms` - List public rooms
- `POST /api/study-rooms` - Create new room
- `POST /api/study-rooms/join` - Join room

### Knowledge Hub
- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `POST /api/posts/[id]/vote` - Vote on post

### Courses
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course
- `POST /api/courses/[id]/enroll` - Enroll in course

## 🔧 Development

### Database Commands
```bash
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed with sample data
npm run db:setup      # Complete setup
```

### Environment Variables
See `.env.local` for all required environment variables.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables
3. Deploy automatically

### Docker
```bash
docker build -t brainwave-platform .
docker run -p 3000:3000 brainwave-platform
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for collaborative learning