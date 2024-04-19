const CONFIG = {
  centerPoint: [40.85, 14.3],
  initialZoom: 5,
  maxZoom: 18,
  searchZoom: 13,
  mapAttribution:
    '<a href=&quot;https://www.mapbox.com/about/maps/&quot;>© Mapbox</a> <a href=&quot;http://www.openstreetmap.org/copyright&quot;>© OpenStreetMap</a>',
  apiHost: process.env.REACT_APP_API_SERVER_HOST || 'localhost',
  apiPort: process.env.REACT_APP_API_SERVER_PORT || '4000',
  media: {
    catalogUrl: 'https://media.normansicily.org/data/catalog.js',
  },
};

export default CONFIG;
