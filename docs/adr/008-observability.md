# ADR-008: Establish Structured Observability for API and LLM Workloads

- Status: Accepted
- Date: 2026-04-11
- Deciders: kotlovyim-dev

## Context

AI-enabled request paths are non-deterministic and cost-bearing. Diagnosing latency, failures, and spend anomalies requires better-than-default logs and traces.

## Decision

Adopt a baseline observability stack with:

- Structured JSON logging for API and background jobs.
- Request correlation and trace identifiers across services.
- LLM-specific telemetry: latency, token usage, model, retries, and error class.

## Consequences

### Positive

- Faster incident triage and better root-cause analysis.
- Better cost governance through visibility into model usage patterns.
- Enables SLOs and alerting as the product matures.

### Negative

- Increases instrumentation effort and storage costs.
- Requires discipline to avoid logging sensitive user data.

## Alternatives Considered

- Minimal unstructured logs: low effort, weak debugging and analytics value.
- Full APM suite from day one: strongest diagnostics, potentially high early-stage cost.
