/**
 * npm install -g crypto-js
 * npm install -g request
 */

var crypto = require('crypto-js');

var public_key =  'MDkwM2I2MzViM2UwNDYwYWJhOGUxMmY0MTBhZjhlZDI';
var secret_key = 'NzZlMjcxM2IwYzIwNDJiN2IxMWNkMTFlNDA2OWRlOWJiMDdkOGU2YmI5NGU0YjFjOGZiYzczOTFmM2U1Zjg2MQ';
var timestamp = Math.floor(Date.now() / 1000);
var payload = timestamp + '.' + public_key;
var hash = crypto.HmacSHA256(payload, secret_key);
var hex_hash = crypto.enc.Hex.stringify(hash);
var signature = payload + "." + hex_hash;
var ticker_btcusd_url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';

var request = require('request');
var options = {
    url: ticker_btcusd_url,
    headers: {
        'X-Signature': signature
    }
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);