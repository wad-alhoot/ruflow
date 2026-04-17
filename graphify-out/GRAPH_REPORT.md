# Graph Report - v3/@claude-flow/cli/src  (2026-04-16)

## Corpus Check
- 180 files · ~365,063 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2094 nodes · 4539 edges · 42 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 1149 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]

## God Nodes (most connected - your core abstractions)
1. `OutputFormatter` - 46 edges
2. `test()` - 44 edges
3. `WorkerDaemon` - 39 edges
4. `loadCommand()` - 31 edges
5. `getRegistry()` - 30 edges
6. `ClaimService` - 29 edges
7. `QLearningRouter` - 29 edges
8. `HeadlessWorkerExecutor` - 25 edges
9. `ContainerWorkerPool` - 24 edges
10. `initAction()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `initAction()` --calls--> `confirm()`  [INFERRED]
  v3/@claude-flow/cli/src/commands/init.ts → v3/@claude-flow/cli/src/prompt.ts
- `detectWorkerTriggers()` --calls--> `test()`  [INFERRED]
  v3/@claude-flow/cli/src/mcp-tools/hooks-tools.ts → v3/@claude-flow/cli/src/transfer/test-seraphine.ts
- `isValidIPNS()` --calls--> `test()`  [INFERRED]
  v3/@claude-flow/cli/src/transfer/ipfs/client.ts → v3/@claude-flow/cli/src/transfer/test-seraphine.ts
- `extractExports()` --calls--> `test()`  [INFERRED]
  v3/@claude-flow/cli/src/ruvector/graph-analyzer.ts → v3/@claude-flow/cli/src/transfer/test-seraphine.ts
- `runTests()` --calls--> `createPublisher()`  [INFERRED]
  v3/@claude-flow/cli/src/transfer/tests/test-store.ts → v3/@claude-flow/cli/src/appliance/rvfa-distribution.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (115): updateSwarmActivityMetrics(), getBridge(), execBrowserCommand(), ensureClaimsDir(), getClaimsPath(), loadClaims(), saveClaims(), ensureConfigDir() (+107 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (70): checkAvailability(), fetchFromIPFS(), fetchFromIPFSWithMetadata(), formatBytes(), hashContent(), isPinned(), isValidCID(), isValidIPNS() (+62 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (62): formatHealthStatus(), formatLogLevel(), formatStatus(), formatComplexityValueAst(), getComplexityRatingAst(), getRiskDisplay(), getStatusDisplay(), getTypeMarkerAst() (+54 more)

### Community 3 - "Community 3"
Cohesion: 0.03
Nodes (26): terminateWasmAgent(), ConfigFileManager, getNestedValue(), parseConfigValue(), setNestedValue(), analyzeGraph(), analyzeMinCutBoundaries(), analyzeModuleCommunities() (+18 more)

### Community 4 - "Community 4"
Cohesion: 0.03
Nodes (103): loadWasm(), capabilities(), computeEmbedding(), getOrchestration(), getReasoningBank(), getRouter(), isAvailable(), retrieveMemories() (+95 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (33): fallbackAnalyze(), GitHubSync, isValidClaimantName(), isValidIssueNumber(), isValidLabel(), isValidRepo(), sanitizeError(), calculateFilePriority() (+25 more)

### Community 6 - "Community 6"
Cohesion: 0.04
Nodes (41): searchGalleryTemplates(), consolidatePatterns(), EWCConsolidator, getEWCConsolidator(), getEWCStats(), recordPatternOutcome(), resetEWCConsolidator(), benchmarkAdaptation() (+33 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (60): buildRvfContainer(), buildRvfFromTemplate(), createAgentFromTemplate(), createWasmAgent(), createWasmMcpServer(), executeWasmTool(), exportWasmState(), generateId() (+52 more)

### Community 8 - "Community 8"
Cohesion: 0.03
Nodes (38): formatSize(), validatePath(), formatBytes(), getEmbeddings(), parseCoverageSummaryJson(), parseLcovInfo(), readCoverageFromDisk(), getAnalyzeCommand() (+30 more)

### Community 9 - "Community 9"
Cohesion: 0.05
Nodes (38): listGalleryTemplates(), canonicalJson(), createAndVerifyPatch(), createPublisher(), detectKeyFormat(), edCheck(), edSign(), failResult() (+30 more)

### Community 10 - "Community 10"
Cohesion: 0.05
Nodes (52): generateClaudeMd(), generateMinimalClaudeMd(), copyAgents(), copyCommands(), copyDirRecursive(), copySkills(), countEnabledHooks(), countFiles() (+44 more)

### Community 11 - "Community 11"
Cohesion: 0.04
Nodes (29): denormalizeMemoryBackend(), denormalizeTopology(), normalizeMemoryBackend(), normalizeTopology(), systemConfigToV3Config(), v3ConfigToSystemConfig(), asNumber(), asString() (+21 more)

### Community 12 - "Community 12"
Cohesion: 0.04
Nodes (23): demo(), createPluginDiscoveryService(), PluginDiscoveryService, PatternStore, PluginStore, findSimilarPlugins(), getCategoryStats(), getFeaturedPatterns() (+15 more)

### Community 13 - "Community 13"
Cohesion: 0.05
Nodes (15): adaptWithReward(), benchmarkTraining(), cleanup(), exportWeights(), forward(), getTrainingStats(), getTrajectoryStats(), importWithInterop() (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.07
Nodes (20): determineAgentModel(), ensureAgentDir(), getAgentDir(), getAgentPath(), getModelRouter(), loadAgentStore(), saveAgentStore(), canUseAgentBooster() (+12 more)

### Community 15 - "Community 15"
Cohesion: 0.05
Nodes (11): tryLoadLearning(), formatBytes(), percentile(), escapeString(), formatEmbedding(), generateInsertSQL(), createMonitor(), getMonitor() (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (7): getWorkerConfig(), isHeadlessWorker(), isLocalWorker(), getDaemon(), startDaemon(), stopDaemon(), WorkerDaemon

### Community 17 - "Community 17"
Cohesion: 0.06
Nodes (33): AdaptFeedbackWasm, AdaptiveEmbedder, AdvancedMemorySystem, AnthropicProvider, BufferPoolWasm, CausalMemoryGraph, ChatMessageWasm, ChatTemplateWasm (+25 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (24): checkForUpdates(), checkSinglePackage(), fetchPackageInfo(), getInstalledVersion(), getUpdateType(), shouldAutoUpdate(), ensureDir(), executeMultipleUpdates() (+16 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (23): calculateStatistics(), createCFP(), deserializeCFP(), getFileExtension(), serializeToBuffer(), serializeToJson(), validateCFP(), deploy() (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (5): benchmarkFlashAttention(), computeAttention(), FlashAttention, getFlashAttention(), getFlashAttentionSpeedup()

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (6): getSONAOptimizer(), getSONAStats(), getSuggestion(), processTrajectory(), resetSONAOptimizer(), SONAOptimizer

### Community 22 - "Community 22"
Cohesion: 0.13
Nodes (1): HeadlessWorkerExecutor

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (9): addBias(), addNoise(), entropy(), getMoERouter(), matmul(), MoERouter, relu(), softmax() (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (5): getMCPServerStatus(), getServerManager(), MCPServerManager, startMCPServer(), stopMCPServer()

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (1): ContainerWorkerPool

### Community 26 - "Community 26"
Cohesion: 0.18
Nodes (3): getPluginManager(), PluginManager, validatePackageName()

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (6): adaptEmbedding(), getLoRAAdapter(), getLoRAStats(), LoRAAdapter, resetLoRAAdapter(), trainLoRA()

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (2): ASTAnalyzer, createASTAnalyzer()

### Community 29 - "Community 29"
Cohesion: 0.21
Nodes (10): decryptApiKeys(), defaultModelsForProfile(), detectRufloVersion(), elapsed(), encryptApiKeys(), fmtBytes(), generateBuildPassphrase(), jsonBuf() (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.15
Nodes (5): estimateComplexity(), inferParameters(), inferQuantization(), isRuvllmAvailable(), RuvllmBridge

### Community 31 - "Community 31"
Cohesion: 0.2
Nodes (4): CircuitBreaker, getAllCircuitStats(), getCircuitBreaker(), resetAllCircuits()

### Community 32 - "Community 32"
Cohesion: 0.26
Nodes (14): benchmarkBatchCosine(), benchmarkEmbeddingGeneration(), benchmarkEWCConsolidation(), benchmarkMemoryRetrieval(), benchmarkMoERouting(), benchmarkPatternLearning(), benchmarkPretrainPipeline(), benchmarkSONAAdaptation() (+6 more)

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (2): ErrorHandler, withErrorHandling()

### Community 34 - "Community 34"
Cohesion: 0.43
Nodes (6): calculateDelay(), fibonacci(), Retryable(), shouldRetryError(), sleep(), withRetry()

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **33 isolated node(s):** `ReflexionMemory`, `SkillLibrary`, `CausalMemoryGraph`, `HybridReasoningBank`, `AdvancedMemorySystem` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 35`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `benchmark.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `test()` connect `Community 5` to `Community 1`, `Community 33`, `Community 3`, `Community 4`, `Community 2`, `Community 8`, `Community 11`, `Community 14`, `Community 26`, `Community 28`, `Community 30`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `OutputFormatter` connect `Community 2` to `Community 1`, `Community 11`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `loadCommand()` connect `Community 8` to `Community 2`, `Community 3`, `Community 7`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 43 inferred relationships involving `test()` (e.g. with `detectWorkerTriggers()` and `autoInstallPackage()`) actually correct?**
  _`test()` has 43 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `loadCommand()` (e.g. with `.get()` and `.set()`) actually correct?**
  _`loadCommand()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ReflexionMemory`, `SkillLibrary`, `CausalMemoryGraph` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._