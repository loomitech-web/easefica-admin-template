import axios from 'axios';

/** OData service root; axios joins request paths to this base. */
export const ODATA_BASE_URL = 'https://odata.easefica.co.za/easefica/default/';

export function createOdataClient(headers) {
  return axios.create({
    baseURL: ODATA_BASE_URL,
    timeout: 5000,
    headers: headers || {}
  });
}
