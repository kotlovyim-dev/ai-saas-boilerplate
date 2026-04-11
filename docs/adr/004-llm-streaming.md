# ADR-004: Stream LLM Responses via Server-Sent Events (SSE)

- Status: Accepted
- Date: 2026-04-10
- Deciders: kotlovyim-dev

## Context

Chat interactions should feel responsive, especially for longer completions. Returning whole responses only after completion hurts perceived performance and user trust.

## Decision

Use Server-Sent Events for token streaming from API to web client. The backend proxies OpenAI stream chunks and emits incremental text payloads to the browser.

## Consequences

### Positive

- Faster time-to-first-token and better perceived latency.
- Simpler than full-duplex WebSocket infrastructure for one-way output streams.
- Works cleanly with Next.js/NestJS request lifecycle.

### Negative

- SSE is unidirectional and can require reconnection handling.
- Some proxy setups need explicit configuration to avoid buffering streamed output.

## Alternatives Considered

- Polling: easy to reason about, poor latency and higher request overhead.
- WebSockets: full duplex and flexible, higher complexity for current requirements.
