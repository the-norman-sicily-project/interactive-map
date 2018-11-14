// Using leaflet API for binding popup due to using <GeoJson />.
// Creator says "it is unnecessarily complex" to use <Popup /> in our use.
// Reference:https://github.com/PaulLeCam/react-leaflet/issues/33

const popupOptions = {
  maxWidth: 'auto',
  maxHeight: '300',
  className: 'leaflet_popup',
};

const formatKey = key =>
  key
    .toLowerCase()
    .split('_')
    .map(str => str[0].toUpperCase() + str.substr(1))
    .join(' ');

const parseGeoJson = data =>
  Object.entries(data).map(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        return value.reduce((accumulator, element, currentIndex) => {
          const keyValue = currentIndex === 0 ? formatKey(key) : '&nbsp;';
          accumulator += `<tr><td>${keyValue}</td><td>${element}</td></tr>`; // eslint-disable-line no-param-reassign
          return accumulator;
        }, '');
      }
      return typeof value === 'object'
        ? parseGeoJson(value)
        : `<tr>
          <td>${formatKey(key)}</td>
          <td>${value}</td>
          </tr>`;
    }
    return `<tr>
            <td>${formatKey(key)}</td>
            <td>unknown</td>
            </tr>`;
  });

const getContent = feature => {
  const content = feature.properties;
  return content ? parseGeoJson(content) : null;
};

const htmlContent = feature =>
  `<table>
      ${getContent(feature)}
    </table>`;

const setPopup = (feature, layer) => {
  layer.bindPopup(htmlContent(feature), popupOptions);
};

export default setPopup;
