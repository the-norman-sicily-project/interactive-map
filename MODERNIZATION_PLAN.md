# Norman Sicily Interactive Map - Modernization Plan

## Overview
This document outlines a phased approach to modernize the Norman Sicily Interactive Map application from its current stable setup (Node 16, React 17, react-scripts 4.x) to the latest Long Term Support (LTS) versions.

**Current Status (Stable):**
- Node.js: v16.20.2
- React: 17.0.1
- react-scripts: 4.0.1
- Dependencies: Legacy but stable versions

**Target (Modern LTS):**
- Node.js: v20.x (Current LTS as of 2024)
- React: 18.x
- react-scripts: 5.x
- Dependencies: Latest compatible versions

## Phase 1: Preparation (1-2 weeks)

### 1.1 Audit and Documentation
- [ ] Document all current functionality and test coverage
- [ ] Create comprehensive test suite for critical user paths
- [ ] Document all custom components and their dependencies
- [ ] Backup current stable version with git tag `stable-node16`

### 1.2 Development Environment Setup
- [ ] Set up parallel development environment with Node 20
- [ ] Create feature branch `modernization-phase1`
- [ ] Test current application compatibility with Node 20 in isolation

### 1.3 Dependency Analysis
- [ ] Run `npm audit` to identify security vulnerabilities
- [ ] Use tools like `npm-check-updates` to identify outdated packages
- [ ] Create compatibility matrix for major dependencies:
  - React ecosystem (react, react-dom, react-scripts)
  - Leaflet ecosystem (react-leaflet, leaflet plugins)
  - Redux ecosystem (react-redux, redux-saga)
  - Build tools and linting

## Phase 2: Foundation Upgrade (2-3 weeks)

### 2.1 Node.js Upgrade
- [ ] Upgrade Node.js from 16.20.2 to 20.x LTS
- [ ] Update `.nvmrc` file to specify Node 20
- [ ] Test all npm scripts work with new Node version
- [ ] Update CI/CD configurations if applicable

### 2.2 Package Manager and Lock Files
- [ ] Clean up and consolidate package management (ensure yarn consistency)
- [ ] Remove `package-lock.json` to avoid conflicts
- [ ] Update `yarn.lock` with new Node compatibility

### 2.3 Core React Upgrade
- [ ] Upgrade React from 17.0.1 to 18.x
- [ ] Upgrade react-dom to match React version
- [ ] Address React 18 breaking changes:
  - Update to new Root API (`createRoot` vs `render`)
  - Handle Strict Mode changes for useEffect
  - Address automatic batching changes

## Phase 3: Build System Modernization (2-3 weeks)

### 3.1 react-scripts Upgrade
- [ ] Upgrade react-scripts from 4.0.1 to 5.x
- [ ] Address webpack 5 compatibility issues
- [ ] Handle PostCSS 8+ compatibility problems:
  - Update or replace postcss-dependent plugins
  - Configure PostCSS plugins properly
- [ ] Test build process thoroughly

### 3.2 ESLint and Code Quality
- [ ] Update ESLint to latest version
- [ ] Update eslint-config-airbnb to latest
- [ ] Address new linting rules and deprecations
- [ ] Update Prettier to latest version
- [ ] Test pre-commit hooks still work

### 3.3 Testing Framework Updates
- [ ] Update Jest and testing-library packages
- [ ] Update Enzyme or migrate to React Testing Library
- [ ] Address any testing compatibility issues
- [ ] Ensure all tests pass with new versions

## Phase 4: Dependencies Modernization (3-4 weeks)

### 4.1 Map Dependencies
- [ ] Update Leaflet to latest stable version
- [ ] Update react-leaflet to latest (v4.x)
- [ ] Address breaking changes in react-leaflet API
- [ ] Update leaflet plugins (markercluster, geosearch)
- [ ] Test all map functionality thoroughly

### 4.2 Redux and State Management
- [ ] Update Redux to latest version
- [ ] Consider migrating to Redux Toolkit (RTK)
- [ ] Update react-redux to latest
- [ ] Update redux-saga or consider RTK Query migration
- [ ] Test all state management functionality

### 4.3 UI and Styling Dependencies
- [ ] Update react-tabs to latest
- [ ] Update mirador and mirador-image-tools
- [ ] Address any CSS/styling compatibility issues
- [ ] Test all UI components

### 4.4 Utility Libraries
- [ ] Update Lodash to latest version (consider tree-shaking)
- [ ] Update Axios to latest version
- [ ] Update other utility dependencies
- [ ] Consider replacing deprecated packages

## Phase 5: Final Integration and Testing (2-3 weeks)

### 5.1 Integration Testing
- [ ] Run full test suite with all updates
- [ ] Perform manual testing of all features
- [ ] Test in production-like environment
- [ ] Performance testing and comparison

### 5.2 Documentation Updates
- [ ] Update README.md with new requirements
- [ ] Update CLAUDE.md with architectural changes
- [ ] Document any breaking changes for users
- [ ] Update package.json scripts if needed

### 5.3 Deployment Preparation
- [ ] Test build process in CI/CD environment
- [ ] Create rollback plan
- [ ] Plan deployment strategy
- [ ] Prepare monitoring for post-deployment

## Risk Mitigation Strategies

### High-Risk Items
1. **react-leaflet API Changes**: Major version upgrades often have breaking changes
2. **PostCSS/webpack 5 Compatibility**: Known issue from previous attempt
3. **React 18 Concurrent Features**: May affect Redux/Saga interactions

### Mitigation Approaches
- Maintain parallel development branches
- Incremental testing at each phase
- Keep detailed rollback procedures
- Consider gradual rollout strategy

## Timeline Estimate

**Total Duration: 10-15 weeks**
- Phase 1: 1-2 weeks
- Phase 2: 2-3 weeks
- Phase 3: 2-3 weeks
- Phase 4: 3-4 weeks
- Phase 5: 2-3 weeks

## Success Criteria

- [ ] Application compiles without errors
- [ ] All existing functionality preserved
- [ ] No regression in performance
- [ ] All tests passing
- [ ] Clean security audit (`npm audit`)
- [ ] Production deployment successful
- [ ] Documentation updated

## Rollback Plan

If critical issues arise:
1. Revert to `stable-node16` git tag
2. Restore Node 16 environment
3. Revert package.json/yarn.lock
4. Clean install dependencies
5. Verify application functionality

This plan ensures a systematic, low-risk approach to modernizing the application while maintaining stability throughout the process.