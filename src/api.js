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

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const searchForBrands = brand =>
  fetch(`${brandEndpoint}?search=${brand}`)
    .then(handleErrors)
    .then(response => response.text())
    .then(text => JSON.parse(text))
    .catch((error) => {
      throw Error(error);
    });

const registerBrandInCity = (brand, city) =>
  fetch(cityEndpoint, {
    method: 'POST',
    body: JSON.stringify({ brand, city })
  })
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