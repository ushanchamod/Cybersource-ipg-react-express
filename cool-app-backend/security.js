const crypto = require('crypto');

const HMAC_SHA256 = 'sha256';
const SECRET_KEY = 'a380c3f3d4814131903c79a1dd2161216a36ca0bbe864f05ad35fccd9569aebe0ef3a4f42c4e4318b0b9471029a9bb6faa1871278eca4729875239d21466ded0ab72a20ea2ab42cb8ac81b87ecf78bfb0ccdbe6291d34105b3cb9709deb0f8e2d8188b9d13a94e6083b1c9d032e4ef3f4f68a470976b41659815d58566175fb9';

function sign(params) {
  const dataToSign = buildDataToSign(params);
  const signature = crypto.createHmac(HMAC_SHA256, SECRET_KEY).update(dataToSign).digest('base64');
  return signature;
}

function buildDataToSign(params) {
  const signedFieldNames = params['signed_field_names'].split(',');
  const dataToSign = [];
  for (const fieldName of signedFieldNames) {
    dataToSign.push(`${fieldName}=${params[fieldName]}`);
  }
  return dataToSign.join(',');
}

module.exports = sign;
