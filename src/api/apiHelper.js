import { get, post } from './apiClient';

const url = 'https://us-central1-pinata-1470075080669.cloudfunctions.net';
const brandEndpoint = `${url}/brands`;
const cityEndpoint = `${url}/cities`;

const serverResponses = {
  SUCCESS: 'Ok!',
  NOT_OFFERED: 'That brand is not offered in that city!'
};

const messages = {
  success: (brand, city) =>
    `Congrats! You've registered for ${brand} in ${capitalize(city)}. Go get em!`,
  notOffered: (brand, city) =>
    `Sorry, we do not offer ${brand} in ${capitalize(city)} at this time.`,
  error:
    'Sorry, there was an issue with this request.',
};

const capitalize = (string) => string.replace(/\b\w/g, l => l.toUpperCase());

export const searchForBrands = brand =>
  get(brandEndpoint, brand)
    .then(response => response.text())
    .then(text => JSON.parse(text));

const registerBrandInCity = (brand, city) =>
  post(cityEndpoint, JSON.stringify({ brand, city }))
    .then(response => toastMessage(response, brand, city))
    .catch(() => messages.error);

const toastMessage = (response, brand, city) =>
  response.text()
    .then(response => {
      if (response === serverResponses.SUCCESS) return messages.success(brand, city);
      else if (response === serverResponses.NOT_OFFERED) return messages.notOffered(brand, city);
    });

export default {
  registerBrandInCity,
}