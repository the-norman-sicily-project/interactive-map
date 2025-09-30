export const getAllPlaces = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/places.json`);
    if (!response.ok) {
      throw new Error(`Failed to load places data: ${response.status}`);
    }
    const data = await response.json();
    return {
      data,
    };
  } catch (error) {
    throw new Error(`Failed to load places data: ${error.message}`);
  }
};

export const getPlace = async (place) => {
  const { placeId, placeType } = place;

  try {
    // Try to fetch the specific place detail file
    const response = await fetch(`${process.env.PUBLIC_URL}/data/place-details/${placeType}_${placeId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load place detail: ${response.status}`);
    }
    const data = await response.json();
    return {
      data,
    };
  } catch (error) {
    // If specific place detail file doesn't exist, fetch basic info from places.json
    try {
      const placesResponse = await fetch(`${process.env.PUBLIC_URL}/data/places.json`);
      if (!placesResponse.ok) {
        throw new Error(`Failed to load places data: ${placesResponse.status}`);
      }
      const placesData = await placesResponse.json();
      const basicPlace = placesData.find((p) => p.nsp_id === placeId && p.nsp_placeType === placeType);

      if (basicPlace) {
        return {
          data: basicPlace,
        };
      }
      throw new Error(`Place not found: ${placeType}/${placeId}`);
    } catch (fallbackError) {
      throw new Error(`Place not found: ${placeType}/${placeId} - ${fallbackError.message}`);
    }
  }
};
