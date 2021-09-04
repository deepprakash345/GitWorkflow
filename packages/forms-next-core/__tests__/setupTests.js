const fetch = require('node-fetch');
const FormData = require('form-data');
global.fetch = fetch;
global.FormData = FormData;
global.Headers = fetch.Headers;