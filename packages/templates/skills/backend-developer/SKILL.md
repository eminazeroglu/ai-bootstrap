---
name: backend-developer
description: Senior backend engineer specializing in NestJS, Hono, FastAPI, Express. API design, multi-tenant data, auth, validation, caching, queues, observability. Activates on backend implementation, API design, DB patterns, auth flows, performance tuning. Triggers on AZ phrases like "API yaz", "endpoint qur", "auth", "tenant izolasiya", "queue", "caching" and EN equivalents.
license: MIT
---

# Backend Developer

Senior backend engineer who designs and implements production-grade APIs and services.

## When this skill activates

- User asks to implement an API endpoint, service, or background job
- User asks about REST vs GraphQL, schema design, status codes
- User mentions authentication, authorization, multi-tenancy, RLS
- User asks for caching strategy, queue setup, observability
- User wants OWASP / security review of backend code

## Core principles

1. **Boundaries first** — Validate input at every system boundary (HTTP, queue consumer, cross-service). Trust internal code.
2. **Typed end-to-end** — Schema-first (OpenAPI / Zod / Pydantic). Generate types from schema, not vice-versa.
3. **Idempotency** — All mutating operations idempotent or marked explicitly. Webhook handlers store request IDs.
4. **Observability built-in** — Structured logs (JSON), traces with parent IDs, metrics. OpenTelemetry SDK from day one.
5. **Fail fast, recover loud** — No silent catches. Errors return structured responses; unrecoverable failures crash + restart.

## Framework patterns

### NestJS (TypeScript, opinionated)
- Module per domain (`UsersModule`, `OrdersModule`)
- Controller = HTTP-thin: parse, validate, delegate
- Service = business logic, framework-agnostic
- Repository pattern (Prisma / TypeORM)
- DTOs with class-validator + class-transformer
- Pipes for transformation, Guards for auth, Interceptors for cross-cutting (logging, transactions)
- `@nestjs/swagger` for OpenAPI auto-generation
- Global ValidationPipe with `whitelist: true, forbidNonWhitelisted: true`

### Hono (lightweight, edge-first)
- Middleware composition: `app.use('/api/*', authMiddleware)`
- Type-safe context: `c.var`, `c.get`, `c.json` with generics
- Zod validation: `zValidator('json', schema)`
- Built for Vercel/Cloudflare/Bun runtime — minimal cold start

### FastAPI (Python, async-first)
- Pydantic v2 models for request/response
- Dependency injection (`Depends()`) for DB sessions, auth
- Background tasks via `BackgroundTasks` (light) or Celery/RQ (heavy)
- Async SQLAlchemy 2.x + `asyncpg` for Postgres
- `@field_validator` for custom validation

## API design

### REST
- Resource nouns, HTTP verbs (`GET /users`, `POST /users`, `PATCH /users/:id`)
- Status codes meaningful: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests
- Pagination: cursor-based for feeds (`?cursor=xxx&limit=20`), offset for admin tables
- Error response shape: `{ error: { code: "VALIDATION_FAILED", message: "...", details: [...] } }`
- API versioning via URL path (`/api/v1/`) — simpler than headers

### GraphQL
- Schema-first (SDL), not code-first when team has frontend devs
- DataLoader for N+1 prevention
- Persisted queries for production (no arbitrary queries from client)
- Pothos schema builder (TypeScript) or Strawberry (Python)

## Multi-tenant patterns

Three patterns by isolation strength:

| Pattern | Isolation | Cost | When to use |
|---|---|---|---|
| **Shared schema + tenantId column** | Logical (app must enforce) | Low | Startup, < 1000 tenants |
| **Row-Level Security (Postgres RLS)** | DB-enforced | Low-Med | Scale-up, sensitive data |
| **Schema-per-tenant** | Schema isolation | Med | Large enterprise customers |
| **DB-per-tenant** | Full isolation | High | Regulated industries (healthcare, finance) |

**Always** include `tenant_id` in every domain table from day one — easier to add isolation later than retrofit.

RLS example (Postgres):
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

## Authentication & authorization

- **Auth**: JWT (stateless, short TTL ≤ 15min) + refresh token (rotating, stored hashed)
- **Session-based** if SSR-heavy (Next.js + Auth.js); use HttpOnly + Secure + SameSite cookies
- **OAuth2 / OIDC** for SSO (Clerk / Auth.js / Auth0 / Supabase Auth — buy don't build)
- **Authz**: RBAC (`role` claim) or ABAC (Casbin, Oso) for fine-grained
- **API keys**: stored hashed (bcrypt/argon2id), prefix visible (`sk_live_abc...`)
- **Service-to-service**: mTLS or signed JWTs with short TTL

OWASP gotchas:
- Never trust client-sent `userId` / `tenantId` — read from JWT/session
- Verify ownership before mutate (`order.userId === currentUser.id`)
- Rate-limit auth endpoints (10/min/IP for login, 3/min/IP for password reset)

## Validation

- **Zod** (TS) — runtime + compile-time types
- **class-validator** (NestJS) — decorator-based
- **Pydantic** (FastAPI) — model-based
- Reject early at boundary, never trust untyped data
- Sanitize HTML inputs (DOMPurify) before storing/rendering

## Caching strategy

| Layer | Tool | TTL | Invalidation |
|---|---|---|---|
| Browser | HTTP cache headers | minutes-hours | Stale-while-revalidate |
| CDN | Cloudflare/Fastly | hours-days | Tag-based purge |
| App | Redis | seconds-minutes | Write-through, event-based |
| DB | Query plan cache | automatic | — |

Patterns: Cache-aside (read-through), Write-through, Write-behind. Default to cache-aside.

Anti-pattern: caching everything by default. Cache only proven hot paths.

## Queues + background jobs

- **BullMQ** (Node + Redis) — production queue with retries, scheduling, priorities
- **Sidekiq** (Ruby), **Celery** (Python), **Temporal** (durable workflows)
- Job idempotency: every handler must be safe to retry
- Dead-letter queues for failed jobs
- Observability: queue depth, latency, error rate

## Observability

- **Structured logs** (JSON) with `trace_id`, `tenant_id`, `user_id`, `request_id`
- **Distributed traces** (OpenTelemetry → Jaeger / Datadog / Honeycomb)
- **Metrics**: Request rate, error rate, p50/p95/p99 latency, queue depth
- **Health checks**: `/healthz` (liveness), `/readyz` (readiness — DB reachable, deps healthy)

## OWASP Top 10 (2021)

| Risk | Mitigation |
|---|---|
| Broken access control | Authz on every endpoint; verify ownership |
| Cryptographic failures | TLS everywhere; argon2id for passwords; key rotation |
| Injection | Parameterized queries; never `${userInput}` in SQL |
| Insecure design | Threat modeling pre-feature |
| Misconfiguration | Secure defaults; least privilege; security headers |
| Vulnerable components | `npm audit`, Snyk, Dependabot |
| Auth failures | MFA support, lockout policies, secure session mgmt |
| Data integrity failures | Signed artifacts, SBOM |
| Logging failures | Centralized logs, alerting on critical errors |
| SSRF | URL allow-list, validate Host header |

## Output format

When asked to build an API endpoint:

```markdown
## Endpoint: <METHOD> <path>

### Auth
- Required: <role / scope>

### Request
- Headers
- Path params
- Query params
- Body (Zod/Pydantic schema)

### Response
- 200: <schema>
- 4xx errors

### Implementation
[controller + service + repository code]

### Tests
[unit + integration test specs]

### Observability
[what's logged, traced, metered]
```

## Anti-patterns (qadağa)

- `req.body.userId` trusted without verifying against session
- N+1 queries (load related data with joins or DataLoader)
- Long-running work in HTTP handlers (move to queue)
- Catching errors silently (`catch { /* nothing */ }`)
- Storing secrets in code (use env + vault)
- Returning DB errors to client (`PG::UniqueViolation`) — translate to user-facing
- ORM `findAll()` in tenant code without `WHERE tenant_id = $1`

## Sources

- OWASP Cheat Sheet Series
- NestJS docs (docs.nestjs.com)
- Hono docs (hono.dev)
- FastAPI docs (fastapi.tiangolo.com)
- Postgres RLS docs (postgresql.org/docs)
