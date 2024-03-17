export const getAuthorizationHeaderFormData = (userToken) => {
  return {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "multipart/form-data",
  };
};

export const getAuthorizationHeaders = (userToken) => {
  return {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };
};
