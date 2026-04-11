# ADR-003: Use Short-Lived JWT Access Tokens with Rotating Refresh Tokens

- Status: Accepted
- Date: 2026-04-9
- Deciders: kotlovyim-dev

## Context

The platform requires secure user authentication for browser clients while preserving good UX and tenant-aware authorization. Access must expire quickly, and session continuity must remain smooth.

## Decision

Adopt a dual-token model:

- Access token: JWT with short lifetime (15 minutes).
- Refresh token: longer lifetime (30 days), rotated and stored in httpOnly cookies.

Authorization is role-aware and tenant-aware. API endpoints validate both identity and tenant context.

## Consequences

### Positive

- Short access token TTL limits exposure when tokens leak.
- httpOnly refresh cookies reduce XSS token theft risk.
- Rotation supports session invalidation and safer long-lived login.

### Negative

- Refresh flow adds endpoint and state-management complexity.
- Cookie and CORS settings require careful environment-specific configuration.

## Alternatives Considered

- Stateless long-lived JWT only: simpler but riskier compromise window.
- Server-side session store only: simpler revocation, weaker horizontal scalability.
