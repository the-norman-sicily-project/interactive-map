import axios from 'axios';
import config from './config';

export const getAllPlaces = () => axios.get(`https://${config.apiHost}:${config.apiPort}/places`);

export const getPlace = (place) => {
  const { placeId, placeType } = place;
  return axios.get(`https://${config.apiHost}:${config.apiPort}/places/${placeType}/${placeId}`);
};
