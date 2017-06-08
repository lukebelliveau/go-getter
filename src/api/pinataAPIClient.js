// IE10 Promise compatibility
import Promise from 'promise-polyfill';
// To add to window
if (!window.Promise) window.Promise = Promise;

const url = 'https://us-central1-pinata-1470075080669.cloudfunctions.net';
const brandEndpoint = `${url}/brands`;
const cityEndpoint = `${url}/cities`;

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getBrandsByName = brand =>
  fetch(`${brandEndpoint}?search=${brand}`)
    .then(handleErrors)
    .then(response => response.text())
    .catch((networkError) => {
      console.log(networkError);
    });

export const getBrandsByCity = city =>
  fetch(`${cityEndpoint}?search=${city}`)
    .then(handleErrors)
    .then(response => response.text())
    .catch((networkError) => {
      console.log(networkError);
    });

