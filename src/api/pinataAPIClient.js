const url = 'https://us-central1-pinata-1470075080669.cloudfunctions.net';
const brandEndpoint = `${url}/brands`;
const cityEndpoint = `${url}/cities`;

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const get = (endpoint, param) =>
  fetch(`${endpoint}?search=${param}`)
    .then(handleErrors)
    .then(response => response.text())
    .catch((networkError) => {
      console.log(networkError);
    });

export const getBrandsByName =
  brand =>
    get(brandEndpoint, brand)
      .then(returnedString => JSON.parse(returnedString));

export const getBrandsByCity = city => get(cityEndpoint, city);

export const postBrandAndCity = () => {
  return fetch('https://us-central1-pinata-1470075080669.cloudfunctions.net/cities', {
    method: 'post',
    body: JSON.stringify({
      city: 'New York',
      brand: 'Smirnoff Vodka',
    })
  })
    .then(handleErrors)
    .then(response => response.text())
    .catch((networkError) => {
      console.log(networkError);
    });
};