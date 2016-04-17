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
      if (err) res.send(err);
      res.send(JSON.parse(body));
    });
  },
  pushPayment: function(req, res) {
    requests.post({
      uri: "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pushfundstransactions",
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + new Buffer('222HLL9K4VXREIC8X1QT21mu3OzW1KFsZbC7Rw4YlX4zN_Txs' + ':' + 'ZdnNszEx6M5vCihk656OgfTA15B82').toString('base64'),
      },
      body: JSON.stringify({
        "acquirerCountryCode": "840",
        "acquiringBin": "408999",
        "amount": "124.05",
        "businessApplicationId": "AA",
        "cardAcceptor": {
          "address": {
            "country": "USA",
            "county": "San Mateo",
            "state": "CA",
            "zipCode": "94404"
          },
          "idCode": "CA-IDCode-77765",
          "name": "Visa Inc. USA-Foster City",
          "terminalId": "TID-9999"
        },
        "localTransactionDateTime": "2016-04-17T08:19:00",
        "merchantCategoryCode": "6012",
        "pointOfServiceData": {
          "motoECIIndicator": "0",
          "panEntryMode": "90",
          "posConditionCode": "00"
        },
        "recipientName": "rohan",
        "recipientPrimaryAccountNumber": "4957030420210496",
        "retrievalReferenceNumber": "412770451018",
        "senderAccountNumber": "4653459515756154",
        "systemsTraceAuditNumber": "451018",
        "transactionCurrencyCode": "USD",
        "transactionIdentifier": "381228649430015"
      })
    }, (err, resp, body) => {
      if (err) res.send(err);
      res.send(JSON.parse(body));
    });
  },
  getPayment: function(req, res) {
    requests.post({
      uri: "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + new Buffer('222HLL9K4VXREIC8X1QT21mu3OzW1KFsZbC7Rw4YlX4zN_Txs' + ':' + 'ZdnNszEx6M5vCihk656OgfTA15B82').toString('base64'),
      },
      body: JSON.stringify({
        "acquirerCountryCode": "840",
        "acquiringBin": "408999",
        "amount": "124.02",
        "businessApplicationId": "AA",
        "cardAcceptor": {
          "address": {
            "country": "USA",
            "county": "San Mateo",
            "state": "CA",
            "zipCode": "94404"
          },
          "idCode": "ABCD1234ABCD123",
          "name": "Visa Inc. USA-Foster City",
          "terminalId": "ABCD1234"
        },
        "cavv": "0700100038238906000013405823891061668252",
        "foreignExchangeFeeTransaction": "11.99",
        "localTransactionDateTime": "2016-04-17T08:43:11",
        "retrievalReferenceNumber": "330000550000",
        "senderCardExpiryDate": "2015-10",
        "senderCurrencyCode": "USD",
        "senderPrimaryAccountNumber": "4895142232120006",
        "surcharge": "11.99",
        "systemsTraceAuditNumber": "451001"
      })
    }, (err, resp, body) => {
      if (err) res.send(err);
      res.send(JSON.parse(body));
    });
  }
};
