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

## Detrack API Integration Strategy

The QCS Portal integrates with the Detrack V2 API to provide clients and staff with a seamless experience for managing logistics orders. The strategy focuses on leveraging Detrack as the operational backbone for job execution, real-time tracking, and Proof of Delivery (POD), while the QCS Portal serves as a user-friendly, branded interface that adds QCS-specific context and workflows.

*   **Job Creation:** Orders created in the QCS Portal are submitted to Detrack via `POST /dn/jobs`. The QCS system stores its own order details and the `detrackJobId` returned by Detrack.
*   **Job Viewing & Tracking:**
    *   Order lists in the QCS Portal will display QCS order data combined with live, high-level status and ETA information fetched from Detrack's `GET /dn/jobs` endpoint (using filters).
    *   Detailed order views will use Detrack's `GET /dn/jobs/{do_number}` (or `/dn/jobs/show`) to display comprehensive real-time information, including detailed status, tracking history (milestones), item specifics, live ETA, and direct links/embeds for POD media (signatures, photos) from Detrack's `signature_file_url` and `photo_X_file_url` attributes.
    *   A powerful search capability will be provided using Detrack's `POST /dn/jobs/search` endpoint.
*   **Job Modifications & Actions:** Updates, cancellations, or reattempts initiated through the QCS Portal will be proxied to the relevant Detrack API endpoints (e.g., `PUT /dn/jobs/{do_number}`, `DELETE /dn/jobs/{do_number}`, `POST /dn/jobs/reattempt`).
*   **Document Downloads:** The portal will allow users to download PODs and shipping labels for individual jobs using Detrack's `GET /dn/jobs/export/{do_number}` endpoint. Batch export functionality (`POST /dn/jobs/bulk/export`) may be available for admins.
*   **Webhook Utilization:** Detrack webhooks will be fully implemented to receive real-time updates on job status changes and POD captures. These webhooks will trigger updates to the high-level status in the QCS database and can initiate QCS-specific notifications.
*   **Data Management:**
    *   The QCS database (Prisma) will store QCS-specific order information, client/end-customer relationships, the `detrackJobId`, and a synchronized high-level job status.
    *   Detrack will remain the source of truth for all detailed, real-time operational data, which will be fetched on demand by the QCS Portal. This minimizes data redundancy and ensures accuracy.
*   **User Experience:** The QCS Portal will offer tailored views for clients (simplified, focusing on key information and POD) and staff (potentially more comprehensive data and actions).

This integration strategy aims to provide a robust, efficient, and user-friendly experience by combining the strengths of the QCS Portal with the specialized logistics capabilities of Detrack.

For detailed project information, please refer to:
*   `docs/project-planning/PLANNING.md`: High-level project plan, vision, and architecture.
*   `docs/project-planning/TASK.MD`: Detailed task breakdown and progress.
*   `docs/project-planning/CONTEXT.MD`: Global development rules and coding guidelines.
*   `docs/project-planning/DEPLOYMENT.MD`: Deployment strategy and Vercel/GitHub workflow.
*   `docs/integrations/detrack/API_Detrack_V2.md`: Detrack API V2 documentation details.

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

    Refer to `docs/project-planning/DEPLOYMENT.MD` for more details on environment variables.

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
*   Refer to `docs/project-planning/PLANNING.MD` (Section 7: Testing Strategy) and `docs/project-planning/CONTEXT.MD` (Rule 2: Test After Every Feature) for detailed testing guidelines.

## Deployment

This project is configured for deployment on Vercel.

*   Pushes to feature branches and Pull Requests will generate Preview Deployments.
*   Merges to the `main` branch will trigger Production Deployments.
*   Refer to `docs/project-planning/DEPLOYMENT.MD` for complete deployment details.

## Contributing

Please adhere to the guidelines outlined in:
*   `docs/project-planning/CONTEXT.MD` (Global Development Rules)
*   Conventional Commits for all Git messages.
*   The branching strategy defined in `docs/project-planning/DEPLOYMENT.MD`.

---

This `README.MD` will be updated as the project progresses.
