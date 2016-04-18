/**
 * CloudsightController
 *
 * @description :: Server-side logic for managing cloudsights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var config = require("./config.js");
var cloudsight = require('cloudsight')({
  apikey: 'config.cloudsight'
}),fs = require('fs');

module.exports = {
  img: function(req, res) {
    console.log(req.body.img_url);
    var image = {
      remote_image_url: req.body.img_url,
      locale: 'en-Us'
    }

    cloudsight.request(image, true, (err, data) => {
      if (err) res.send(err);
      console.log(data);



      var filter = textService.findFilter(data.name);
      console.log(filter);
      amazonService.findItem(filter, data.name, (response) => {
        if(typeof(response.result.ItemSearchResponse.Items[0].Item) == "undefined"){
          res.send(response);
        };


        var topResults = response.result.ItemSearchResponse.Items[0].Item.splice(0, 3);
        // res.send(topResults);

        var results = {
          status: '',
          imgUrl: '',
          brand: '',
          description: '',
          normalPrice: '',
          webStore: '',
          asin: ''
        }

        var filteredResults = topResults.map((cur) => {
          // console.log(cur.Offers[0].TotalOffers[0]);
          if (cur.Offers[0].TotalOffers[0] == '0') {
            console.log(true);
            results = {
              imgUrl: cur.SmallImage[0].URL,
              // brand: cur.ItemAttributes[0].Brand,
              description: cur.ItemAttributes[0].Feature,
              normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
              // webStore: cur.ItemAttributes[0].Publisher[0],
              asin: cur.ASIN[0]
            }
            return results;
          } else {
            return {
              imgUrl: cur.SmallImage[0].URL,
              // brand: cur.ItemAttributes[0].Brand,
              description: cur.ItemAttributes[0].Feature,
              // normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
              // webStore: cur.ItemAttributes[0].Publisher[0],
              asin: cur.ASIN[0]
            }
          }
        })
        console.log('done');
        res.send(filteredResults);
      });
    })
  },
  cart: function(req, res) {
    var id = req.param('id');
    amazonService.createCart(id, (response) => {
      res.send(response.result.CartCreateResponse.Cart[0].PurchaseURL[0]);
      console.log('response');
      // res.send(response.result.Cart[0].PurchaseURL);
    })
  },
  getCart: function(req, res) {
    var id = req.param('id');
    amazonService.getCart(id, (response) => {
      res.send(response);
    })
  },
  test: function(req, res) {
    amazonService.findItem('Shoes', 'Nike Shoes', (response) => {
      res.send(response);
      // raw xml response is also available
      // console.log(response.responseBody);
    });
  },
  testImg: function(req, res) {
    amazonService.findItem('Shoes', 'Nike Shoes', (response) => {
      // if (err) res.send(err);
      var topResults = response.result.ItemSearchResponse.Items[0].Item.splice(0, 3);
      // res.send(topResults);

      var filteredResults = topResults.map((cur) => {
        // console.log(cur.Offers[0].TotalOffers[0]);
        if (cur.Offers[0].TotalOffers[0] == '0') {
          return {
            imgUrl: cur.SmallImage[0].URL,
            // brand: cur.ItemAttributes[0].Brand,
            description: cur.ItemAttributes[0].Feature,
            normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
            // offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
            webStore: cur.ItemAttributes[0].Publisher[0],
            asin: cur.ASIN[0]
          }
        } else {
          return {
            imgUrl: cur.SmallImage[0].URL,
            // brand: cur.ItemAttributes[0].Brand,
            description: cur.ItemAttributes[0].Feature,
            normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
            // offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
            webStore: cur.ItemAttributes[0].Publisher[0],
            asin: cur.ASIN[0]
          }
        }

      })
      res.send(filteredResults);
      // raw xml response is also available
      // console.log(response.responseBody);
    });
  }
};
