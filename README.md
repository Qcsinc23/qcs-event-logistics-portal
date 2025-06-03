# QCS Event Logistics Client Portal

This is the official repository for the Quiet Craft Solutions Inc. (QCS) Event Logistics Client Portal. This Next.js application serves as a public-facing informational website, a secure client portal for managing logistics orders, and an admin interface for QCS staff.

## Project Overview

*   **Purpose:** To provide a modern, reliable, and efficient platform for QCS clients to manage their event logistics needs and for QCS to streamline its operations.
*   **Key Features (Planned):**
    *   Public informational website.
    *   Client authentication (Clerk).
    *   End-customer management.
    *   Order creation, tracking, updating, and cancellation (Detrack integration).
    *   Billing information display.
    *   Admin panel for QCS staff (rate cards, user management, billing control).
*   **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL, Clerk, Detrack API, Sentry, Resend.

For detailed project information, please refer to:
*   `../OneDrive/Desktop/# PLANNING.MD`: High-level project plan, vision, and architecture.
*   `../OneDrive/Desktop/# TASK.MD`: Detailed task breakdown and progress.
*   `../OneDrive/Desktop/# CONTEXT.MD`: Global development rules and coding guidelines.
*   `../OneDrive/Desktop/# DEPLOYMENT.MD`: Deployment strategy and Vercel/GitHub workflow.

## Getting Started

### Prerequisites

*   Node.js (version specified in `.nvmrc` or latest LTS)
*   npm, yarn, or pnpm
*   Docker (for local PostgreSQL instance if not using Vercel Postgres locally)
*   Access to API keys for Clerk, Detrack, Sentry, Resend (as per `.env.example`).

### Environment Variables

1.  Copy the `.env.example` file to a new file named `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
2.  Update `.env.local` with your actual API keys and development credentials.
    *   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
    *   `CLERK_SECRET_KEY`
    *   `POSTGRES_PRISMA_URL` (for Prisma Accelerate, or local Dockerized Postgres connection string)
    *   `POSTGRES_URL_NON_POOLING` (for migrations, or local Dockerized Postgres connection string)
    *   `DETRACK_API_KEY`
    *   `SENTRY_DSN`
    *   `RESEND_API_KEY`
    *   `FROM_EMAIL`
    *   `DETRACK_WEBHOOK_SECRET` (if testing webhooks locally)
    *   `NEXT_PUBLIC_APP_URL` (usually `http://localhost:3000` for local development)

    Refer to `../OneDrive/Desktop/# DEPLOYMENT.MD` for more details on environment variables.

### Local PostgreSQL with Docker (Optional)

If you prefer to run PostgreSQL locally using Docker for development (instead of connecting to Vercel Postgres directly):

1.  Ensure Docker Desktop is running.
2.  Use the provided `docker-compose.yml` to start a PostgreSQL container:
    ```bash
    docker-compose up -d
    ```
3.  Update your `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` in `.env.local` to point to this local instance (e.g., `postgresql://user:password@localhost:5432/mydb`).

### Installation

Install project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Database Setup (Prisma)

1.  Ensure your database connection string in `.env.local` is correctly configured.
2.  Generate Prisma Client:
    ```bash
    npx prisma generate
    ```
3.  Run database migrations to set up the schema:
    ```bash
    npx prisma migrate dev --name init
    ```
    (Replace `init` with a descriptive name if it's not the first migration).

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server (after building).
*   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
*   `npm run prisma:generate`: Generates Prisma Client.
*   `npm run prisma:migrate:dev`: Runs development migrations.
*   `npm run prisma:migrate:deploy`: Runs deployment migrations (used by Vercel).
*   `npm run prisma:seed`: Runs the database seed script (if `prisma/seed.ts` is implemented).
*   `npm run test`: Runs unit tests with Vitest (once configured).

## Testing

Testing is a critical part of this project. Vitest will be used for unit and integration tests.

*   **Running Tests (Once configured):**
    ```bash
    npm run test
    # or
    npm run test:watch
    ```
*   Refer to `../OneDrive/Desktop/# PLANNING.MD` (Section 7: Testing Strategy) and `../OneDrive/Desktop/# CONTEXT.MD` (Rule 2: Test After Every Feature) for detailed testing guidelines.

## Deployment

This project is configured for deployment on Vercel.

*   Pushes to feature branches and Pull Requests will generate Preview Deployments.
*   Merges to the `main` branch will trigger Production Deployments.
*   Refer to `../OneDrive/Desktop/# DEPLOYMENT.MD` for complete deployment details.

## Contributing

Please adhere to the guidelines outlined in:
*   `../OneDrive/Desktop/# CONTEXT.MD` (Global Development Rules)
*   Conventional Commits for all Git messages.
*   The branching strategy defined in `../OneDrive/Desktop/# DEPLOYMENT.MD`.

---

This `README.MD` will be updated as the project progresses.
