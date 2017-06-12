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
      throw Error(networkError);
    });

export const getBrandsByName =
  brand =>
    get(brandEndpoint, brand)
      .then(returnedString => JSON.parse(returnedString));

export const getBrandsByCity = city => get(cityEndpoint, city);

export const serverResponses = {
  SUCCESS: 'Ok!',
  NOT_OFFERED: 'That brand is not offered in that city!'
};

export const postBrandAndCity = (city, brand) => {
  return fetch('https://us-central1-pinata-1470075080669.cloudfunctions.net/cities', {
    method: 'POST',
    body: JSON.stringify({
      city: city,
      brand: brand,
    })
  })
    .then(resp => {
      return resp.text()
        .then(response => {
          if (response === serverResponses.SUCCESS) return `Congrats! You've registered for ${brand} in ${capitalize(city)}. Go get em!`;
          else if (response === serverResponses.NOT_OFFERED) return `Sorry, we do not offer ${brand} in ${capitalize(city)} at this time.`;
          else throw Error(response);
        })
    })
    .catch(() => {
      return 'Sorry, there was an issue with this request.';
    });
};

const capitalize = (string) => string.replace(/\b\w/g, l => l.toUpperCase());