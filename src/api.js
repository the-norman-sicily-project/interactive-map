import axios from 'axios';
import config from './config';

export const getAllPlaces = () => axios.get(`http://${config.apiHost}:${config.apiPort}/places`);

export const getPlace = (place) => {
  const { placeId, placeType } = place;
  return axios.get(`http://${config.apiHost}:${config.apiPort}/places/${placeType}/${placeId}`);
};
