const CONFIG = {
  centerPoint: [40.85, 14.3],
  initialZoom: 5,
  maxZoom: 18,
  searchZoom: 13,
  // Mapbox configuration - requires REACT_APP_MAPBOX_ACCESS_TOKEN environment variable
  mapbox: {
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    username: process.env.REACT_APP_MAPBOX_USERNAME || 'mapbox',
    styleId: process.env.REACT_APP_MAPBOX_STYLE_ID || 'streets-v11',
  },
  // Fallback to OpenStreetMap if Mapbox is not configured
  fallbackTileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  fallbackAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  mapAttribution:
    '<a href=&quot;https://www.mapbox.com/about/maps/&quot;>© Mapbox</a> <a href=&quot;http://www.openstreetmap.org/copyright&quot;>© OpenStreetMap</a>',
  media: {
    catalogUrl: 'https://media.normansicily.org/data/catalog.js',
  },
};

export default CONFIG;
