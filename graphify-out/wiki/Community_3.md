# Community 3

> 135 nodes · cohesion 0.03

## Key Concepts

- **.set()** (77 connections) — `v3/@claude-flow/cli/src/services/config-file-manager.ts`
- **.delete()** (32 connections) — `v3/@claude-flow/cli/src/infrastructure/in-memory-repositories.ts`
- **InMemoryTaskRepository** (23 connections) — `v3/@claude-flow/cli/src/infrastructure/in-memory-repositories.ts`
- **InMemoryAgentRepository** (21 connections) — `v3/@claude-flow/cli/src/infrastructure/in-memory-repositories.ts`
- **WorkerQueue** (20 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **graph-analyzer.ts** (19 connections) — `v3/@claude-flow/cli/src/ruvector/graph-analyzer.ts`
- **InMemoryStore** (17 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **ConfigFileManager** (13 connections) — `v3/@claude-flow/cli/src/services/config-file-manager.ts`
- **RateLimiter** (11 connections) — `v3/@claude-flow/cli/src/production/rate-limiter.ts`
- **.findAll()** (9 connections) — `v3/@claude-flow/cli/src/infrastructure/in-memory-repositories.ts`
- **.check()** (8 connections) — `v3/@claude-flow/cli/src/production/rate-limiter.ts`
- **getSemanticRouter()** (7 connections) — `v3/@claude-flow/cli/src/mcp-tools/hooks-tools.ts`
- **.setTask()** (7 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.fail()** (7 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **analyzeGraph()** (7 connections) — `v3/@claude-flow/cli/src/ruvector/graph-analyzer.ts`
- **.complete()** (6 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.writeAtomic()** (6 connections) — `v3/@claude-flow/cli/src/services/config-file-manager.ts`
- **.pushToQueue()** (5 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.enqueue()** (5 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.dequeue()** (5 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.getTask()** (5 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.registerWorker()** (5 connections) — `v3/@claude-flow/cli/src/services/worker-queue.ts`
- **.getConfig()** (5 connections) — `v3/@claude-flow/cli/src/services/config-file-manager.ts`
- **.insert()** (5 connections) — `v3/@claude-flow/cli/src/ruvector/vector-db.ts`
- **fallbackMinCut()** (5 connections) — `v3/@claude-flow/cli/src/ruvector/graph-analyzer.ts`
- *... and 110 more nodes in this community*

## Relationships

- [[Community 7]] (34 shared connections)
- [[Community 1]] (19 shared connections)
- [[Community 4]] (12 shared connections)
- [[Community 5]] (10 shared connections)
- [[Community 12]] (7 shared connections)
- [[Community 6]] (7 shared connections)
- [[Community 16]] (6 shared connections)
- [[Community 21]] (5 shared connections)
- [[Community 0]] (3 shared connections)
- [[Community 25]] (3 shared connections)
- [[Community 15]] (3 shared connections)
- [[Community 13]] (2 shared connections)

## Source Files

- `v3/@claude-flow/cli/src/infrastructure/in-memory-repositories.ts`
- `v3/@claude-flow/cli/src/mcp-tools/hooks-tools.ts`
- `v3/@claude-flow/cli/src/memory/memory-bridge.ts`
- `v3/@claude-flow/cli/src/plugins/store/search.ts`
- `v3/@claude-flow/cli/src/production/rate-limiter.ts`
- `v3/@claude-flow/cli/src/ruvector/agent-wasm.ts`
- `v3/@claude-flow/cli/src/ruvector/graph-analyzer.ts`
- `v3/@claude-flow/cli/src/ruvector/semantic-router.ts`
- `v3/@claude-flow/cli/src/ruvector/vector-db.ts`
- `v3/@claude-flow/cli/src/services/config-file-manager.ts`
- `v3/@claude-flow/cli/src/services/worker-queue.ts`

## Audit Trail

- EXTRACTED: 407 (71%)
- INFERRED: 170 (29%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*