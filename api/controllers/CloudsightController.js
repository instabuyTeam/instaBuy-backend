/**
 * CloudsightController
 *
 * @description :: Server-side logic for managing cloudsights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cloudsight = require('cloudsight')({
  apikey: 'hBrRMUZtKivVD4rsEjH2Hg'
});

module.exports = {
  getImg: function(req, res) {
    var image = {
      remote_image_url: req.params('imageurl'),
      locale: 'en-Us'
    }
    cloudsight.request(image, true, (err, data) => {
      if (err) throw err;
      var filter = textService.findFilter(data.name);
      amazonService.findItem(filter, data.name, (response) => {
        var topResults = response.result.ItemSearchResponse.Items[0].Item.splice(0, 3);

        var filteredResults = topResults.map((cur) => {
          // console.log(cur.Offers[0].TotalOffers[0]);
            if (cur.Offers[0].TotalOffers[0] == '0') {
              return {
                imgUrl: cur.SmallImage[0].URL,
                brand: cur.ItemAttributes[0].Brand,
                description: cur.ItemAttributes[0].Feature,
                normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
                // offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
                webStore: cur.ItemAttributes[0].Publisher[0],
                asin: cur.ASIN[0]
              }
            } else {
              return {
                imgUrl: cur.SmallImage[0].URL,
                brand: cur.ItemAttributes[0].Brand,
                description: cur.ItemAttributes[0].Feature,
                normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
                offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
                webStore: cur.ItemAttributes[0].Publisher[0],
                asin: cur.ASIN[0]
              }
            }

          })
        res.send(filteredResults);
      });
    })
  },
  cart: function(req, res) {
    var id = req.param('id');
    amazonService.createCart(id, (response) => {
      res.send(response);
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
              brand: cur.ItemAttributes[0].Brand,
              description: cur.ItemAttributes[0].Feature,
              normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
              // offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
              webStore: cur.ItemAttributes[0].Publisher[0],
              asin: cur.ASIN[0]
            }
          } else {
            return {
              imgUrl: cur.SmallImage[0].URL,
              brand: cur.ItemAttributes[0].Brand,
              description: cur.ItemAttributes[0].Feature,
              normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
              offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
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
