import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:3001" });

export const request = ({ ...options }) => {
  // client.defaults.headers.common
  const onSuccess = (response) => response;
  const onError = (error) => {
    throw Error(error);
  };

  return client(options).then(onSuccess).catch(onError);
};
