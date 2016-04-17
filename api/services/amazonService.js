var util = require('util'),
  OperationHelper = require('apac').OperationHelper;

var amazon = new OperationHelper({
  awsId: 'AKIAJHH2FWGDWP25SNIA',
  awsSecret: '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',
  assocId: 'instabuy09-20'
});

module.exports = {
  //filter for amazon querries
  //specific key words
  findItem: function(filter, keywords, callback) {
    amazon.execute('ItemSearch', {
      'SearchIndex': 'FashionMen',
      'Keywords': 'Black Leather Bifold Wallet',
      'ResponseGroup': 'ItemAttributes, Offers, Images'
    }).then(callback).catch((err) => {
      console.error(err);
    });
  },
  createCart: function(id, callback) {
    amazon.execute('CartCreate', {
      'Item.1.ASIN': id,
      'Item.1.Quantity': 1
    }).then(callback).catch((err) => {
      if (err) throw err;
    })
  },
  getCart: function(id) {
    amazon.execute('CartGet',  {
      'CartId' : id
    })
  },
  test: function(callback) {
    amazon.execute('ItemLookup', {
      'ItemId': 'B019EU9SWW'
    }).then(callback).catch((err) => {
      if (err) throw err;
    })
  }

}
