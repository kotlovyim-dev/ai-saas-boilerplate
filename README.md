<div align="center">

# 🤖 AI SaaS Boilerplate

**Production-ready, multi-tenant AI platform starter.**  
Built with Next.js 16, NestJS, PostgreSQL, pgvector, and OpenAI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)

[Demo] Coming soon... · [Documentation] Coming soon... · [License](./LICENSE) · [Report Bug](https://github.com/kotlovyim-dev/ai-saas-boilerplate.git/issues) · [Request Feature](https://github.com/kotlovyim-dev/ai-saas-boilerplate/issues)

</div>

---

## Why this exists

Most AI SaaS starters skip the hard parts — multi-tenancy, token cost tracking, streaming, proper auth. This boilerplate covers all of it, with architectural decisions documented so you understand *why*, not just *how*.

Built as a public learning project. Every decision is logged as an [Architecture Decision Record](#architecture-decisions).

---

## Features

- **Multi-tenant by default** — row-level tenant isolation, every query scoped to `tenant_id`
- **AI chat with streaming** — OpenAI streaming responses via Server-Sent Events
- **RAG pipeline** — document upload → chunking → embeddings → pgvector semantic search
- **Token cost tracking** — per-tenant usage metrics, budget limits, overage handling
- **Type-safe API contracts** — OpenAPI spec auto-generated, TypeScript client auto-generated from it
- **Secure auth** — JWT (15 min) + Refresh tokens (30 days, httpOnly cookie), role-based access
- **Monorepo** — Turborepo with shared types between Next.js and NestJS
- **Observable** — structured logging, request tracing, LLM call metrics

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | RSC + streaming support |
| Backend | NestJS + Fastify | Decorators, DI, OpenAPI out of the box |
| Database | PostgreSQL 16 + pgvector | Vector search without a separate DB |
| ORM | Prisma | Type-safe queries, migrations |
| AI | OpenAI SDK | Streaming, function calling |
| Queue | BullMQ + Redis | Async document processing |
| Monorepo | Turborepo | Shared types, incremental builds |
| Auth | JWT + Passport.js | Stateless, multi-tenant context |

---

## Project Structure

```
ai-saas-boilerplate/
├── apps/
│   ├── web/                    # Next.js 16 (App Router)
│   │   ├── app/
│   │   │   ├── (auth)/         # Login, register pages
│   │   │   ├── (dashboard)/    # Protected app routes
│   │   │   └── api/            # Next.js route handlers
│   │   └── components/
│   └── api/                    # NestJS
│       ├── src/
│       │   ├── auth/           # JWT, refresh tokens, guards
│       │   ├── conversations/  # Chat endpoints
│       │   ├── documents/      # Upload, processing, RAG
│       │   ├── llm/            # OpenAI integration layer
│       │   └── tenants/        # Tenant management
│       └── prisma/
│           ├── schema.prisma
│           └── migrations/
├── packages/
│   ├── types/                  # Shared TypeScript interfaces
│   ├── db/                     # Prisma client (shared)
│   └── config/                 # Shared ESLint, TS config
├── docs/
│   └── adr/                    # Architecture Decision Records
├── docker-compose.yml
└── turbo.json3
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose
- OpenAI API key

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/kotlovyim-dev/ai-saas-boilerplate.git
cd ai-saas-boilerplate

# 2. Install dependencies
npm install

# 3. Start infrastructure (PostgreSQL + Redis)
docker-compose up -d

# 4. Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
# → add your OPENAI_API_KEY and DATABASE_URL

# 5. Run database migrations
npm run db:migrate

# 6. Start development servers
npm run dev
```

Both servers start with a single command:
- Web → http://localhost:3000
- API → http://localhost:3001
- Swagger → http://localhost:3001/api/docs

---

## Environment Variables

**`apps/api/.env`**

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/ai_saas"

# Auth
JWT_SECRET="your-jwt-secret-min-32-chars"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="30d"

# OpenAI
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"

# Redis (for BullMQ)
REDIS_URL="redis://localhost:6379"
```

**`apps/web/.env.local`**

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## Core Concepts

### Multi-tenancy

Every resource belongs to a tenant. The `tenant_id` is extracted from the JWT on every request — not from the request body. This means a user cannot access another tenant's data even if they craft the request manually.

```typescript
// TenantGuard extracts tenantId from JWT, not from request params
@Get('conversations')
@UseGuards(JwtAuthGuard, TenantGuard)
findAll(@TenantId() tenantId: string) {
  return this.conversationsService.findAll(tenantId);
}

// Service always scopes queries to tenantId
findAll(tenantId: string) {
  return this.prisma.conversation.findMany({
    where: { tenantId }, // never skipped
  });
}
```

### LLM Streaming

Responses stream token-by-token to the client via Server-Sent Events. The API never waits for the full response before sending.

```typescript
// NestJS streams directly from OpenAI to the client
async *streamCompletion(messages, tenantId) {
  const stream = await this.openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const token = chunk.choices[0]?.delta?.content;
    if (token) yield token;
  }
}
```

### RAG Pipeline

```mermaid
flowchart LR
  subgraph INGEST
    U[User uploads PDF]
    Q[BullMQ queue job]
    E[Extract text]
    C[Chunk 500 tokens]
    G[Generate embeddings - OpenAI]
    S[Store in pgvector]
  end

  U --> Q
  Q --> E
  E --> C
  C --> G
  G --> S

  subgraph QUERY
    UQ[User asks question]
    EQ[Embed question]
    R[pgvector similarity search - top 5]
    I[Inject chunks into prompt]
    SR[Stream response]
  end

  UQ --> EQ --> R --> I --> SR
```

---

## API Reference

Full OpenAPI documentation available at `/api/docs` when running locally.

### Auth

```
POST /auth/register     Create account + tenant
POST /auth/login        Returns JWT + sets refresh cookie
POST /auth/refresh      Rotate tokens
POST /auth/logout       Invalidate refresh token
```

### Conversations

```
GET    /conversations          List tenant's conversations
POST   /conversations          Create conversation
GET    /conversations/:id      Get with messages
DELETE /conversations/:id      Delete

POST   /conversations/:id/messages    Send message (streams response)
```

### Documents (RAG)

```
POST   /documents              Upload + enqueue for processing
GET    /documents              List with processing status
DELETE /documents/:id          Remove + delete embeddings
```

---

## Architecture Decisions

All non-obvious decisions are documented in [`/docs/adr`](./docs/adr/).

| ADR | Decision | Status |
|---|---|---|
| [ADR-001](./docs/adr/001-monorepo.md) | Turborepo over Nx | Accepted |
| [ADR-002](./docs/adr/002-db-multitenancy.md) | Shared schema over separate schemas | Accepted |
| [ADR-003](./docs/adr/003-auth.md) | JWT 15min + Refresh httpOnly cookie | Accepted |
| [ADR-004](./docs/adr/004-llm-streaming.md) | SSE over WebSockets for streaming | Accepted |
| [ADR-005](./docs/adr/005-rag-pipeline.md) | RAG pipeline using BullMQ + pgvector | Accepted |
| [ADR-006](./docs/adr/006-token-cost-tracking.md) | Per-tenant token and cost ledgering | Accepted |
| [ADR-007](./docs/adr/007-api-contracts.md) | OpenAPI-first contracts with generated TS client | Accepted |
| [ADR-008](./docs/adr/008-observability.md) | Structured logs, tracing, and LLM metrics | Accepted |

---

## Roadmap

- [ ] Monorepo setup + shared types
- [ ] Multi-tenant DB schema
- [ ] Auth (JWT + Refresh tokens)
- [ ] OpenAI streaming integration
- [ ] RAG pipeline
- [ ] Observability (structured logs, LLM cost tracking)
- [ ] Multi-tenancy hardening (RLS at DB level)
- [ ] Stripe billing integration
- [ ] Docker production setup

---

## Development

```bash
# Run all apps in dev mode
npm run dev

# Type checking across all packages
npm run typecheck

# Run tests
npm run test

# Generate TypeScript client from OpenAPI spec
npm run generate:api-types

# Create a new database migration
npm run db:migrate:dev --name your_migration_name

# Open Prisma Studio (DB GUI)
npm run db:studio
```

---

## Contributing

This is a learning project built in public. Issues and PRs are welcome.

1. Fork the repo
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m 'feat: add your feature'`
4. Push and open a PR

Follow [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

MIT © 2026 [Maksym Kotlovyi](https://linkedin.com/in/maksym-kotlovyi-8441953b4)

---

<div align="center">
  <sub>Follow the journey on <a href="https://linkedin.com/in/maksym-kotlovyi-8441953b4">LinkedIn</a></sub>
</div>
