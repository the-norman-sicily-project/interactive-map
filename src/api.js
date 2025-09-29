import placesData from './data/places.json';

export const getAllPlaces = () =>
  Promise.resolve({
    data: placesData,
  });

export const getPlace = async (place) => {
  const { placeId, placeType } = place;

  try {
    // Try to dynamically import the place detail file
    const placeDetailModule = await import(`./data/place-details/${placeType}_${placeId}.json`);
    return {
      data: placeDetailModule.default,
    };
  } catch (error) {
    // If specific place detail file doesn't exist, return basic info from places.json
    const basicPlace = placesData.find((p) => p.nsp_id === placeId && p.nsp_placeType === placeType);

    if (basicPlace) {
      return {
        data: basicPlace,
      };
    }
    throw new Error(`Place not found: ${placeType}/${placeId}`);
  }
};
