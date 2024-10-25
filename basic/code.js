//
// code for script include
//
var Moomin = Class.create();
Moomin.prototype = {
  //
  // is this needed?
  // initialize: function() {},
  //
  everything: function(encodedQuery) {
    var badData = {};
    var goodData = {};
    // nonsense code to make use of the gliderecord encodedQuery
    badData[encodedQuery] = 'dogwater';
    goodData[encodedQuery] = 'sparkles';
    // always return both bad and good data
    return {
      badData: badData,
      goodData: goodData,
    };
  },
  //
  // is this needed?
  // type: 'Test'
};

//
// code for testing. not part of the script include
//
var main = function () {
  var snorkMaiden = new Moomin();
  var allData = snorkMaiden.everything('nameSTARTSWITHtesting');
  gs.debug(allData.badData);
  gs.debug(allData.goodData);
};
//
// engage
//
main();
