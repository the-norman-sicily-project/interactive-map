# The Norman Sicily Project - Interactive Map

[![Build Status](https://travis-ci.org/the-norman-sicily-project/interactive-map.svg?branch=master)](https://travis-ci.org/the-norman-sicily-project/interactive-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A standalone React application that displays historical places and sites in Norman Sicily using interactive maps. This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**Note:** This application runs completely standalone without requiring a backend server. All data is bundled locally and map tiles are served directly from external providers.

## Prerequisites

- Node.js v16.20.2 (use nvm: `nvm use 16`)
- Yarn package manager

## Installing

Clone the repository:

    git clone https://github.com/the-norman-sicily-project/interactive-map.git

Move to the directory of the clone:

    cd interactive-map

Install dependencies:

    yarn install

## Configuration

### Environment Variables (Optional)

For Mapbox tiles, set these environment variables:

- `REACT_APP_MAPBOX_ACCESS_TOKEN` - Your Mapbox public access token
- `REACT_APP_MAPBOX_USERNAME` - Your Mapbox username (default: mapbox)
- `REACT_APP_MAPBOX_STYLE_ID` - Your Mapbox style ID (default: streets-v11)

If not configured, the application will use OpenStreetMap tiles as fallback.

## Running

### With Node v16:

    source ~/.nvm/nvm.sh && nvm use 16 && yarn start

### With Mapbox configuration:

    export REACT_APP_MAPBOX_ACCESS_TOKEN="your_token_here"
    export REACT_APP_MAPBOX_USERNAME="your_username"
    export REACT_APP_MAPBOX_STYLE_ID="your_style_id"
    source ~/.nvm/nvm.sh && nvm use 16 && yarn start

The application will start on port 3000: http://localhost:3000

## Running Tests

To run tests:

    yarn test

## Contributors

* [Ryan Marshall](https://github.com/RyanMarshall5765)

## License

Copyright © 2018 [Dawn M. Hayes](mailto:hayesd@montclair.edu) and [Joseph P. Hayes](mailto:joephayes@gmail.com)

Released under the MIT license.
