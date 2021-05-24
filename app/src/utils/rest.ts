import axios from "axios";

interface Meta {
  name: string;
  license: string;
  website: string;
  page: number;
  limit: number;
  found: number;
}

export type RestQueryResult<T> = {
  meta: Meta;
  results: T[];
};

const rest = axios.create({
  baseURL: "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/",
  timeout: 5000
});

rest.interceptors.response.use(
  response => {
    //Interceptor for successful response (200s) ...
    return response.data;
  },
  err => {
    //Interceptor for error response - simply passing back to caller here to open correct Toast message
    return Promise.reject(err);
  }
);

export default rest;
