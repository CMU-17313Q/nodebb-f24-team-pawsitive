'use strict';

const translatorApi = module.exports;
const fetch = require('node-fetch');

translatorApi.translate = async function (postData) {
// Edit the translator URL below
  const TRANSLATOR_API = 'https://teampawsitive-translator-gqf3a7ejhqa3fcf4.uaenorth-01.azurewebsites.net/';
  const response = await fetch(`${TRANSLATOR_API}/?content=${postData.content}`);
  const data = await response.json();
  return [data.is_english, data.translated_content];
};
