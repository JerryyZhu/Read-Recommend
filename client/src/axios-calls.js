import axios from "axios";
import queryString from 'query-string';
import routes from "./routes";

const BASE_URL = "/api/v1/"
function getAuthHeader() {
    return "JWT " + localStorage.getItem("token")
}

export default async function makeCall(method, url, data) {
  if (method === 'get' && data !== undefined) {
      url += '?' + queryString.stringify(data)
  }

  try {
    let result = await axios({
      method,
      url: BASE_URL + url,
      data,
      headers: { Authorization: getAuthHeader() },
    })
    return result
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.assign(routes.login);
    } else {
      throw error
    }
  } 
}

export function mockCall(method, url, data, mockData) {
  return new Promise((resolve, reject) => {
    if (typeof(mockData) === 'object') {
      setTimeout( function() {
        resolve({data: mockData})
      }, 750)
    } else {
      setTimeout( function() {
        reject({response: {status: mockData}})
      }, 750)
    }
    return axios({
        method,
        url: BASE_URL + url,
        data,
        headers: { Authorization: getAuthHeader() },
    })
  })
}