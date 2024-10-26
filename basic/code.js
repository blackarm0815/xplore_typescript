"use strict";
// code for script include
var Moomin = Class.create();
Moomin.prototype = {
  // is this needed?
  // initialize: function() {},
  everything: function (encodedQuery) {
    var badData = {};
    var goodData = {};
    badData[encodedQuery] = 'dogwater';
    goodData[encodedQuery] = 'sparkles';
    return {
      badData: badData,
      goodData: goodData,
    };
  },
  // is this needed?
  // type: 'Test'
};
//
//
//
//
// code for testing in xplore
var main = function () {
  var snorkMaiden = new Moomin();
  var allData = snorkMaiden.everything('nameSTARTSWITHtesting');
  gs.debug(allData.badData);
  gs.debug(allData.goodData);
};
main();
