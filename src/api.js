// Enhanced error handling and performance optimizations
const createApiError = (message, originalError, code) => {
  const error = new Error(message);
  error.originalError = originalError;
  error.code = code;
  error.timestamp = new Date().toISOString();
  return error;
};

export const getAllPlaces = async (options = {}) => {
  const { timeout = 10000, retries = 2 } = options;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(`${process.env.PUBLIC_URL}/data/places.json`, {
        signal: controller.signal,
        cache: 'default', // Use browser cache when appropriate
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw createApiError(`HTTP ${response.status}: ${response.statusText}`, null, 'HTTP_ERROR');
      }

      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();
      return { data };
    } catch (error) {
      if (attempt === retries) {
        if (error.name === 'AbortError') {
          throw createApiError('Request timed out while loading places data', error, 'TIMEOUT');
        }
        throw createApiError('Failed to load places data after multiple attempts', error, 'NETWORK_ERROR');
      }
      // Exponential backoff
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  // This should never be reached due to the retry logic, but required for consistent-return
  throw createApiError('Maximum retries exceeded', null, 'RETRY_EXCEEDED');
};

export const getPlace = async (place, options = {}) => {
  const { placeId, placeType } = place;
  const { timeout = 8000, retries = 2 } = options;

  if (!placeId || !placeType) {
    throw createApiError('Invalid place parameters', null, 'INVALID_PARAMS');
  }

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Try to fetch the specific place detail file first
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(`${process.env.PUBLIC_URL}/data/place-details/${placeType}_${placeId}.json`, {
        signal: controller.signal,
        cache: 'default',
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        // eslint-disable-next-line no-await-in-loop
        const data = await response.json();
        return { data };
      }

      // If detail file doesn't exist (404), try fallback to basic places data
      if (response.status === 404) {
        const fallbackController = new AbortController();
        const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), timeout);

        // eslint-disable-next-line no-await-in-loop
        const placesResponse = await fetch(`${process.env.PUBLIC_URL}/data/places.json`, {
          signal: fallbackController.signal,
          cache: 'default',
        });

        clearTimeout(fallbackTimeoutId);

        if (!placesResponse.ok) {
          throw createApiError(`Failed to load fallback places data: ${placesResponse.status}`, null, 'HTTP_ERROR');
        }

        // eslint-disable-next-line no-await-in-loop
        const placesData = await placesResponse.json();
        const basicPlace = placesData.find((p) => p.nsp_id === placeId && p.nsp_placeType === placeType);

        if (basicPlace) {
          return { data: basicPlace };
        }

        throw createApiError(`Place not found: ${placeType}/${placeId}`, null, 'NOT_FOUND');
      }

      // Other HTTP errors
      throw createApiError(`HTTP ${response.status}: ${response.statusText}`, null, 'HTTP_ERROR');
    } catch (error) {
      if (attempt === retries) {
        if (error.name === 'AbortError') {
          throw createApiError(`Request timed out while loading place: ${placeType}/${placeId}`, error, 'TIMEOUT');
        }
        if (error.code) {
          throw error; // Re-throw our custom errors
        }
        throw createApiError(`Failed to load place: ${placeType}/${placeId}`, error, 'NETWORK_ERROR');
      }
      // Exponential backoff
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  // This should never be reached due to the retry logic, but required for consistent-return
  throw createApiError('Maximum retries exceeded', null, 'RETRY_EXCEEDED');
};
