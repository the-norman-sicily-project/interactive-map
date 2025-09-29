# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

The Norman Sicily Project Interactive Map is a standalone React application that displays historical places and sites in Norman Sicily using Leaflet maps. The application uses Redux for state management, Redux-Saga for side effects, and loads all data from local JSON files. No backend server is required.

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

### Data Integration
- **Configuration**: `src/config.js` contains map settings and tile configuration
- **API Client**: `src/api.js` loads data from local JSON files
- **Local Data**: All place data stored in `src/data/places.json` and `src/data/place-details/`
- **Environment Variables**: Optional Mapbox configuration:
  - `REACT_APP_MAPBOX_ACCESS_TOKEN` - Mapbox public access token
  - `REACT_APP_MAPBOX_USERNAME` - Mapbox username (default: mapbox)
  - `REACT_APP_MAPBOX_STYLE_ID` - Mapbox style ID (default: streets-v11)

### Data Flow
1. Map initializes via `initMap()` action
2. Saga loads sites from local `src/data/places.json` file
3. Sites are displayed as clustered markers on Leaflet map
4. User interactions (search, marker clicks) trigger place detail loads from `src/data/place-details/`
5. Place details are displayed in popups with historical data, images, and references
6. Map tiles served directly from Mapbox API (if configured) or OpenStreetMap fallback

### Serverless Architecture
- **No Backend Required**: Application runs completely client-side
- **Local Data Storage**: All place data bundled in `src/data/` directory
- **External Tile Services**: Map tiles served from Mapbox or OpenStreetMap
- **Static Hosting Ready**: Can be deployed to any static hosting service

### Key Features
- **Multilingual Support**: Uses `react-redux-multilingual` for i18n
- **Search**: Leaflet GeoSearch integration for place searching
- **Map Clustering**: Uses `react-leaflet-markercluster` for marker grouping
- **Media Integration**: Connects to Mirador viewer for historical images
- **Flexible Tile Sources**: Supports Mapbox (with token) or OpenStreetMap fallback

### Testing
- Uses Jest and Enzyme for component testing
- Test files are co-located with source files (`.test.js` extension)
- Snapshots are stored in `__snapshots__` directories

### Code Quality
- **ESLint**: Configured with Airbnb config and additional plugins
- **Prettier**: Code formatting with pre-commit hooks
- **Husky**: Git hooks for linting and formatting on commit
- **Pre-commit**: Runs `lint:fix` and `prettify` on staged files