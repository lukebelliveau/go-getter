const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const get = (endpoint, param) =>
  fetch(`${endpoint}?search=${param}`)
    .then(handleErrors)
    .catch((error) => {
      console.log('get error');
      throw Error(error);
    });

export const post = (endpoint, body) =>
  fetch(endpoint, { method: 'POST', body })
    .catch((error) => {
      throw Error(error);
    });