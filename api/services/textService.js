var filters = {
  'Electronics': ['phone','phones', 'iphone', 'laptop', 'macbook', 'ipads', 'ipod', 'apple','android','samsung','galaxy', 'computer'],
  'FashionMen': ['wallet', 'man', 'men', 'wallets'],
  'Shoes': ['shoes', 'sneakers', 'shoe', 'sneaker'],

};



module.exports = {
findFilter: function(text) {
    var splitedText = text.split(" ");
    var filter = '';
    var index = -1;
    Object.keys(filters).forEach((val)=>{
      splitedText.forEach((result)=>{
        index = filters[val].indexOf(result);
      });
      if(index >= 0){
        filter = val;
      }
    })
    return filter;
  }
};
