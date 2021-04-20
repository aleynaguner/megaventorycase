export const Constants = {
  HttpMethods: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
};

export const checkAxiosResponseIsSuccessful = (response) => {
  return response.status >= 200 && response.status < 300;
};
