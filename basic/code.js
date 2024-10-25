//
// this section of code is designed to be copied directly into a script include
//
var Moomin = Class.create();
Moomin.prototype = {
  initialize: function() {},
  // 
  // everything happens within the scope of the everything function, hence the name
  //
  everything: function(encodedQuery) {
    //
    // all data is tested and sorted into bad data and good data
    //
    var badData = {};
    var goodData = {};
    //
    // this code does not make sense. it is not mean to
    // in real code the encodedQuery string will be used with a gliderecord
    //
    badData[encodedQuery] = 'dogwater';
    goodData[encodedQuery] = 'sparkles';
    //
    // always return bad data and good data
    //
    return {
      badData: badData,
      goodData: goodData,
    };
  },
  //
  // not entirely clear what this does
  //
  type: 'Test'
};
//
// the main function holds testing code that interacts with the script include code above
// if more functions are required, keep them inside main so that it can be collapsed
//
var main = function () {
  var snorkMaiden = new Moomin();
  var allData = snorkMaiden.everything('testing123');
  gs.debug(allData.badData);
  gs.debug(allData.goodData);
};
//
// engage
//
main();