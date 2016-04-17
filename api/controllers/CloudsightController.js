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
          return {
            imgUrl: cur.SmallImage[0].URL,
            brand: cur.ItemAttributes[0].Brand[0],
            description: cur.ItemAttributes[0].Feature,
            normalPrice: cur.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
            offerPrice: cur.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice,
            webStore: cur.ItemAttributes[0].Publisher[0],
            offerId: cur.Offers[0].Offer[0].OfferListing[0].OfferListingId[0],
            asin: cur.ASIN[0]
          }
        })
      });
    })
  },
  cart: function(req, res) {
    amazonService.createCart(req.param('id'), (response) => {
      res.send(response.result.Cart[0].PurchaseURL);
    })
  },
  getCart: function(req, res) {
    amazonService.getCart(req.param('id'), (response) => {
      res.send(response);
    })
  },
  test: function(req, res) {
    amazonService.test((response) => {
      res.send(response);
      // raw xml response is also available
      // console.log(response.responseBody);
    });
  }
};
