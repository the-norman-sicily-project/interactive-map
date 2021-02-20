const CONFIG = {
  centerPoint: [40.85, 14.3],
  initialZoom: 5,
  maxZoom: 18,
  mapAttribution:
    '<a href=&quot;https://www.mapbox.com/about/maps/&quot;>© Mapbox</a> <a href=&quot;http://www.openstreetmap.org/copyright&quot;>© OpenStreetMap</a>',
  apiHost: process.env.API_SERVER_HOST || 'localhost',
  apiPort: process.env.API_SERVER_PORT || '4000',
  media: {
    catalogUrl: 'http://media.normansicily.org/data/catalog.js',
  },
};

export default CONFIG;
