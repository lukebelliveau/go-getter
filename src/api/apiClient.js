// @flow
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const get = (endpoint: string, param: string) =>
  fetch(`${endpoint}?search=${param}`)
    .then(handleErrors)
    .catch((error) => {
      console.log('get error');
      throw Error(error);
    });

export const post = (endpoint: string, body: string) =>
  fetch(endpoint, { method: 'POST', body })
    .catch((error) => {
      throw Error(error);
    });