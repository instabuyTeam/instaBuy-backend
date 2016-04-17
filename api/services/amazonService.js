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
      'SearchIndex': filter,
      'Keywords': keywords,
      'ResponseGroup': 'ItemAttributes, Offers, Images'
    }).then(callback).catch(callback);
  },
  createCart: function(id, callback){
    amazon.execute('CartCreate',{
      'Item.1.ASIN': id,
      'Item.1.Quantity': 1
    }).then(callback).catch(callback);
  },
  getCart: function(id, callback) {
    amazon.execute('CartGet',  {
      'CartId' : id
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
