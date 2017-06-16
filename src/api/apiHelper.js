// @flow
import { get, post } from './apiClient';

const url = 'https://us-central1-pinata-1470075080669.cloudfunctions.net';
const brandEndpoint = `${url}/brands`;
const cityEndpoint = `${url}/cities`;

const serverResponses = {
  SUCCESS: 'Ok!',
  NOT_OFFERED: 'That brand is not offered in that city!'
};

const messages = {
  success: (brand: string, city: string) =>
    `Congrats! You've registered for ${brand} in ${capitalize(city)}. Go get em!`,
  notOffered: (brand:string, city:string) =>
    `Sorry, we do not offer ${brand} in ${capitalize(city)} at this time.`,
  error:
    'Sorry, there was an issue with this request.',
};

const capitalize = (string) => string.replace(/\b\w/g, l => l.toUpperCase());

export const searchForBrands = (brand: string) =>
  get(brandEndpoint, brand)
    .then(response => response.text())
    .then(text => JSON.parse(text));

export const registerBrandInCity = (brand: string, city: string) =>
  post(cityEndpoint, JSON.stringify({ brand, city }))
    .then(response => toastMessage(response, brand, city))
    .catch(() => messages.error);

const toastMessage = (response: Response, brand: string, city: string): Promise<string> =>
  response.text()
    .then((response): string => {
      if (response === serverResponses.SUCCESS) return messages.success(brand, city);
      else return messages.notOffered(brand, city);
    });