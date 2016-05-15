/**
 * CloudsightController
 *
 * @description :: Server-side logic for managing cloudsights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var config = require("../../config.js");
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
      amazonService.findItem(filter, data.name, (response) => {
          var { result:{ItemSearchResponse:{Items:[ItemsObj]}} } = response;
          var { result:{ItemSearchResponse:{Items:[ResultsObj]}} } = response;
          var {Request:[ObjList]} = ResultsObj;
          var {IsValid:[status]} = ObjList;
          var {Item} = ItemsObj;
          var topresults = Item.splice(0,5).map((curr)=>{
              var {ASIN:[itemNumber]} = curr;
              var {DetailPageURL:[Itemlink]}= curr;
              var {MediumImage:[ImgInfo]} = curr;
              var {ItemAttributes:[Attributes]} = curr;
              var {Offers:[ItemOffers]} = curr;
              var {URL:[ItemImg]} = ImgInfo;
              var {Feature:[ItemFeature]} = Attributes;
              var {ListPrice:[ItemPricing]} = Attributes;
              var {Title:[ItemTitle]} = Attributes;
              var {TotalOffers:[ItemTotalOffers]} = ItemOffers;
              return {
                itemNumber, Itemlink, ItemImg, ItemFeature, ItemPricing, ItemTitle, ItemTotalOffers
              }
          });
          if(status){
            res.send(topresults);
          }else{
            res.send(response);
          }
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

      try {
        var { result:{ItemSearchResponse:{Items:[ItemsObj]}} } = response;
        var { result:{ItemSearchResponse:{Items:[ResultsObj]}} } = response;
        var {Request:[ObjList]} = ResultsObj;
        var {IsValid:[status]} = ObjList;
        var {Item} = ItemsObj;

        var topresults = Item.splice(0,5).map((curr)=>{
            var {ASIN:[itemNumber]} = curr;
            var {DetailPageURL:[Itemlink]}= curr;
            var {MediumImage:[ImgInfo]} = curr;
            var {ItemAttributes:[Attributes]} = curr;
            var {Offers:[ItemOffers]} = curr;
            var {URL:[ItemImg]} = ImgInfo;
            var {Feature:[ItemFeature]} = Attributes;
            var {ListPrice:[ItemPricing]} = Attributes;
            var {Title:[ItemTitle]} = Attributes;
            var {TotalOffers:[ItemTotalOffers]} = ItemOffers;

            return {
              itemNumber, Itemlink, ItemImg, ItemFeature, ItemPricing, ItemTitle, ItemTotalOffers
            }
        });
      } catch (e) {
        console.log(e);
      }

      if(status){
        res.send(topresults);
      }else{
        res.send(response);
      }
    });
  },
  testImg: function(req, res) {


  }
};
