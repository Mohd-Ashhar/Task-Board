# Task Board

A minimal, clean, and architecturally correct Task Board application built with Next.js 15, Prisma, and Tailwind CSS.

## 🧱 Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Server Actions, Next.js Middleware
- **Database**: SQLite (local), Prisma ORM
- **Authentication**: Custom JWT (JOSE), HTTPOnly Cookies, Bcrypt
- **Validation**: Zod (Server-side)

## 🔐 Authentication Flow

1.  **Signup/Login**: Users submit credentials via Server Actions.
2.  **Verification**: Input is validated with Zod; passwords hashed/verified with Bcrypt.
3.  **Session**: A JWT containing `userId` and `email` is signed and stored in a secure, HTTPOnly cookie.
4.  **Middleware**: `middleware.ts` intercepts requests to `/dashboard`, verifies the JWT, and redirects unauthenticated users.
5.  **Data Access**: Server Components decode the session cookie to fetch user-specifc data securely.

## 🗄 Database Schema

**User**
- `id`: UUID
- `email`: String (Unique)
- `password`: String (Hashed)
- `tasks`: Relation to Task

**Task**
- `id`: UUID
- `title`: String
- `status`: String (TODO, IN_PROGRESS, DONE)
- `userId`: Foreign Key to User

## 🚀 Local Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create `.env` (automatically created by prisma init, but ensure `JWT_SECRET` is set):
    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your-secret-key"
    ```

3.  **Database Setup**:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## 🧪 Verification
- Run `npm run lint` to check code quality.
- Run `npm run build` to verify production build.
