# ADR-005: Implement RAG with Async Ingestion and pgvector Retrieval

- Status: Accepted
- Date: 2026-04-10
- Deciders: kotlovyim-dev

## Context

Tenant documents must be searchable by semantic similarity to ground model responses. Ingestion includes CPU/network-bound stages (parsing, chunking, embeddings) that should not block request-response cycles.

## Decision

Use an asynchronous retrieval-augmented generation pipeline:

- Upload documents and enqueue processing jobs with BullMQ.
- Parse and chunk document text.
- Generate embeddings using OpenAI embedding models.
- Store vectors in PostgreSQL with pgvector.
- At query time, embed the question and retrieve top-k similar chunks for prompt augmentation.

## Consequences

### Positive

- Asynchronous jobs prevent upload endpoints from timing out.
- pgvector keeps transactional and vector data in one operational datastore.
- Pipeline supports retries and visibility on ingestion states.

### Negative

- Query quality is sensitive to chunking strategy and retrieval thresholds.
- pgvector may require dedicated indexing and tuning as corpus scale grows.

## Alternatives Considered

- Synchronous processing in request path: simpler to start, poor reliability at scale.
- Dedicated vector database: potentially higher retrieval performance, higher operational overhead for a starter boilerplate.
