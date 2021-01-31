const CONFIG = {
  centerPoint: [40.85, 14.3],
  initialZoom: 5,
  maxZoom: 18,
  tileURL:
    'https://api.mapbox.com/styles/v1/norman-sicily-project/cjmm4r23s7n2b2rs0tq0a9rw0/tiles/256/{z}/{x}/{y}@2x?access_token=',
  mapAttribution:
    '<a href=&quot;https://www.mapbox.com/about/maps/&quot;>© Mapbox</a> <a href=&quot;http://www.openstreetmap.org/copyright&quot;>© OpenStreetMap</a>',
  dataFile: 'places-20191009.geojson',
  dataPath: 'map/data',
  stardog: {
    host: 'localhost',
    port: '5820',
    database: 'nsp',
    username: 'admin',
    password: 'admin',
  },
};

export default CONFIG;
