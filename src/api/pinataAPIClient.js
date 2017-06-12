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

export const submissionResults = {
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
    .then(handleErrors)
    .then(resp => {
      return resp.text()
        .then(response => {
          if (response === submissionResults.SUCCESS) return 'Successfully Registered!';
          else if (response === submissionResults.NOT_OFFERED) return 'Sorry, we do not offer this brand at that location at this time.';
          else return 'Sorry, there was an issue with this request. We may not offer services in this city. Please check your network connection.';
        })
    })
    .catch((networkError) => {
      console.log('network error');
      throw Error(networkError);
    });
};