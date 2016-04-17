var filters = {
  'Electronics': ['phones', 'iphone', 'laptop'],
  'FashionMen': ['wallet', 'man'],
  'Shoes': ['shoes', 'sneakers']
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
