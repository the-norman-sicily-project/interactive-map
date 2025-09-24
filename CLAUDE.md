# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

The Norman Sicily Project Interactive Map is a React application that displays historical places and sites in Norman Sicily using Leaflet maps. The application uses Redux for state management, Redux-Saga for side effects, and connects to an external API server for geographical and historical data.

## Development Commands

- **Start development server**: `npm start` or `yarn start` - Starts the development server on port 3000
- **Build for production**: `npm run build` or `yarn build`
- **Run tests**: `npm test` or `yarn test` - Runs Jest tests in watch mode
- **Lint code**: `npm run lint` - ESLint check for JavaScript/JSX files in src/
- **Fix linting issues**: `npm run lint:fix` - Auto-fix ESLint issues
- **Format code**: `npm run prettify` - Format code using Prettier

## Architecture

### State Management (Redux)
- **Store**: Configured in `src/index.js` with Redux DevTools integration
- **Reducers**: Main reducer in `src/reducers/index.js` handles map state (sites, currentPlace, loading states)
- **Actions**: Located in `src/actions/index.js` for map initialization, site loading, and place fetching
- **Sagas**: `src/sagas/map_saga.js` handles asynchronous operations like API calls

### Components Structure
- **Presentational Components**: Located in `src/components/` (e.g., `interactive_map.jsx`, `markers.jsx`, `site_popup.jsx`)
- **Container Components**: Located in `src/containers/` - connect Redux state to presentational components
- **Icons**: SVG icons for different place types stored in `src/icons/`

### API Integration
- **Configuration**: `src/config.js` contains API endpoints and map settings
- **API Client**: `src/api.js` handles HTTP requests to the backend
- **Environment Variables**: API server settings configurable via `.env` directory:
  - `REACT_APP_API_SERVER_PROTOCOL` (default: http)
  - `REACT_APP_API_SERVER_HOST` (default: localhost)
  - `REACT_APP_API_SERVER_PORT` (default: 4000)

### Data Flow
1. Map initializes via `initMap()` action
2. Saga fetches sites from API and transforms Stardog RDF data to GeoJSON
3. Sites are displayed as clustered markers on Leaflet map
4. User interactions (search, marker clicks) trigger place detail fetches
5. Place details are displayed in popups with historical data, images, and references

### Key Features
- **Multilingual Support**: Uses `react-redux-multilingual` for i18n
- **Search**: Leaflet GeoSearch integration for place searching
- **Map Clustering**: Uses `react-leaflet-markercluster` for marker grouping
- **Media Integration**: Connects to Mirador viewer for historical images

### Testing
- Uses Jest and Enzyme for component testing
- Test files are co-located with source files (`.test.js` extension)
- Snapshots are stored in `__snapshots__` directories

### Code Quality
- **ESLint**: Configured with Airbnb config and additional plugins
- **Prettier**: Code formatting with pre-commit hooks
- **Husky**: Git hooks for linting and formatting on commit
- **Pre-commit**: Runs `lint:fix` and `prettify` on staged files