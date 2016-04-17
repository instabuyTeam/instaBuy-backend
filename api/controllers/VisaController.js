/**
 * VisaController
 *
 * @description :: Server-side logic for managing visas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var requests = require('request');
var fs = require('fs'),
  path = require('path'),
  keyFile = path.resolve('./visa/key_instaBuy.pem'),
  certFile = path.resolve('./visa/cert.pem');



module.exports = {
  test: function(req, res) {
    requests.post({
      uri: "https://sandbox.api.visa.com/vctc/validation/v1/decisions/cardinquiry",
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + new Buffer('222HLL9K4VXREIC8X1QT21mu3OzW1KFsZbC7Rw4YlX4zN_Txs' + ':' + 'ZdnNszEx6M5vCihk656OgfTA15B82').toString('base64'),
      },
      body: JSON.stringify({
        "paginationData": {
          "pageLimit": "10",
          "startIndex": "1"
        },
        "primaryAccountNumber": "4915506102121010"
      })
    }, (err, resp, body) => {
      if (err) res.json(err);
      res.send(JSON.parse(body));
    });
  }
};
