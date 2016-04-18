var util = require('util'),
  OperationHelper = require('apac').OperationHelper,
  config = require('./config.js');

var amazon = new OperationHelper({
  awsId: config.awsId,
  awsSecret: config.awsSecret,
  assocId: config.assocId
});

module.exports = {
  //filter for amazon querries
  //specific key words
  findItem: function(filter, keywords, callback) {
    amazon.execute('ItemSearch', {
      'SearchIndex': filter,
      'Keywords': keywords,
      'ResponseGroup': 'ItemAttributes,Offers,Images'
    }).then(callback).catch((err) => {
      console.log(err);
    });

    // amazon.execute('ItemSearch', {
    //   'SearchIndex': filter,
    //   'Keywords': keywords,
    //   'ResponseGroup': 'ItemAttributes, Offers, Images'
    // }).then(callback).catch(callback);
  },
  createCart: function(id, callback) {
    amazon.execute('CartCreate', {
      'Item.1.ASIN': id,
      'Item.1.Quantity': 1
    }).then(callback).catch(callback);
  },
  getCart: function(id, callback) {
    amazon.execute('CartGet', {
      'CartId': id
    }).then(callback).catch(callback)
  },
  test: function(callback) {
    amazon.execute('ItemLookup', {
      'ItemId': 'B019EU9SWW'
    }).then(callback).catch((err) => {
      if (err) throw err;
    })
  }

}
