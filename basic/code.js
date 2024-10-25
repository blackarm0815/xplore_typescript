//
// this section of code is designed to be copied directly into a script include
//
var Moomin = Class.create();
Moomin.prototype = {
  //
  // is this needed?
  // initialize: function() {},
  // 
  // all of my code will be in this function, hence the name
  //
  everything: function(encodedQuery) {
    //
    // all data is tested and sorted into bad data and good data
    //
    var badData = {};
    var goodData = {};
    //
    // fake code to make use of the gliderecord encodedQuery
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
  // is this needed?
  // type: 'Test'
};
//
// non script include testing code. all exists within the main() function
//
var main = function () {
  //
  // instantiate the class
  //
  var snorkMaiden = new Moomin();
  //
  // pass a gliderecord encoded query to the everything function. get returned data
  //
  var allData = snorkMaiden.everything('nameSTARTSWITHtesting');
  //
  // show the data returned from the script include
  //
  gs.debug(allData.badData);
  gs.debug(allData.goodData);
};
//
// engage
//
main();
