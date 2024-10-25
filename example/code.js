//
// this section of oop code can be copied directly into a script include
//
var Moomin = Class.create();
Moomin.prototype = {
  initialize: function() {},
  // 
  // everything happens within the scope of this function, hence the name
  //
  everything: function(encodedQuery) {
    //
    // all data is tested and sorted into bad data and good data
    //
    var badData = {};
    var goodData = {};
    //
    // this is just a placeholder for some real code that uses the encodedQuery with gliderecords
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
  type: 'Test'
};
//
//
//
//
// the script include code has ended. everything below is merely to interact with the oop code for testing purposes
//
//
//
//
var main = function () {
  var snorkMaiden = new Moomin();
  var allData = snorkMaiden.everything('testing123');
  gs.debug(allData.badData);
  gs.debug(allData.goodData);
};

main();