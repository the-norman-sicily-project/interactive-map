# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

The Norman Sicily Project Interactive Map is a standalone React application that displays historical places and sites in Norman Sicily using Leaflet maps. The application uses Redux for state management, Redux-Saga for side effects, and loads all data from local JSON files. No backend server is required.

## Prerequisites

- Node.js v16.20.2 (use nvm: `nvm use 16`)
- Yarn package manager (preferred) or npm

## Development Commands

- **Start development server**: `yarn start` or `npm start` - Starts the development server on port 3000
- **Build for production**: `yarn build` or `npm run build`
- **Run tests**: `yarn test` or `npm test` - Runs Jest tests in watch mode
- **Lint code**: `npm run lint` - ESLint check for JavaScript/JSX files in src/
- **Fix linting issues**: `npm run lint:fix` - Auto-fix ESLint issues
- **Format code**: `npm run prettify` - Format code using Prettier

## Architecture

### State Management (Redux)
- **Store**: Configured in `src/index.js` with Redux DevTools integration
- **Reducers**: Main reducer in `src/reducers/index.js` handles map state (sites, currentPlace, loading states)
  - Transforms data from SPARQL JSON format to GeoJSON via `sparqljson2geojson()`
  - Handles multilingual labels (array format or simple strings)
- **Actions**: Located in `src/actions/index.js` for map initialization, site loading, and place fetching
- **Sagas**: `src/sagas/map_saga.js` handles asynchronous operations like loading data from JSON files
  - Uses `takeEvery` for initial map load, `takeLatest` for place selection to prevent race conditions
- **Selectors**: `src/selectors/index.js` uses Reselect for memoized state derivation to optimize performance

### Components Structure
- **Presentational Components**: Located in `src/components/` (e.g., `interactive_map.jsx`, `markers.jsx`, `site_popup.jsx`)
- **Container Components**: Located in `src/containers/` - connect Redux state to presentational components
- **Icons**: SVG icons for different place types stored in `src/icons/`

### Data Integration
- **Configuration**: `src/config.js` contains map settings and tile configuration
- **API Client**: `src/api.js` loads data from local JSON files with retry logic and timeout handling
  - Uses native Fetch API with AbortController for request cancellation
  - Implements exponential backoff for failed requests
  - Falls back to basic place data if detailed place file not found (404)
- **Local Data**: All place data stored in `public/data/places.json` and `public/data/place-details/`
  - Detail files named `{placeType}_{placeId}.json`
- **Environment Variables**: Optional Mapbox configuration:
  - `REACT_APP_MAPBOX_ACCESS_TOKEN` - Mapbox public access token
  - `REACT_APP_MAPBOX_USERNAME` - Mapbox username (default: mapbox)
  - `REACT_APP_MAPBOX_STYLE_ID` - Mapbox style ID (default: streets-v11)

### Data Flow
1. Map initializes via `initMap()` action dispatched in `src/index.js`
2. Saga loads sites from `public/data/places.json` via `getAllPlaces()` API call
3. Reducer transforms data to GeoJSON format and stores in Redux state
4. Sites are displayed as clustered markers on Leaflet map
5. User interactions (search, marker clicks) dispatch `setSelectedPlace()` action
6. Saga loads place details from `public/data/place-details/{placeType}_{placeId}.json`
7. Place details are displayed in popups with historical data, images, and references
8. Map tiles served directly from Mapbox API (if configured) or OpenStreetMap fallback

### Serverless Architecture
- **No Backend Required**: Application runs completely client-side
- **Local Data Storage**: All place data bundled in `public/data/` directory
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
- **ESLint**: Configured with Airbnb config and additional plugins (`.eslintrc.js`)
  - Custom camelCase exceptions for data field prefixes: `nsp_`, `cssi_`, `wgs_`, `rdfs_`, `skos_`, `foaf_`
- **Prettier**: Code formatting with pre-commit hooks (`.prettierrc`)
- **Husky**: Git hooks for linting and formatting on commit
- **Lint-staged**: Runs `lint:fix` and `prettify` on staged files automatically

## Important Notes

- **Data Naming Conventions**: Place data fields use underscored prefixes (e.g., `nsp_id`, `wgs_lat`, `cssi_name`) which are exempted from ESLint camelCase rules
- **Locale Support**: Default locale is English (`en`), configurable via `?locale=` query parameter
- **Media Catalog**: Historical images served from external Mirador catalog at `https://media.normansicily.org/data/catalog.js`