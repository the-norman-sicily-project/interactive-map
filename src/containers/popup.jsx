// Using leaflet API for binding popup due to using <GeoJson />.
// Creator says "it is unnecessarily complex" to use <Popup /> in our use.
// Reference:https://github.com/PaulLeCam/react-leaflet/issues/33

const popupOptions = {
  maxWidth: 'auto',
  maxHeight: '300',
  className: 'leaflet_popup',
};

const parseGeoJson = data =>
  Object.entries(data).map(([key, value]) => {
    if (value) {
      return typeof value === 'object'
        ? parseGeoJson(value)
        : `<tr>
          <td>${key}</td>
          <td>${value}</td>
          </tr>`;
    }
    return `<tr>
            <td>${key}</td>
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
