"use strict";
//
//
//
//
//
//
// code for script include - start
//
var Moomin = Class.create();
Moomin.prototype = {
  // is this needed?
  // initialize: function() {},
  main: function (encodedQuery) {
    //
    //
    var badData = {};
    var goodData = {};
    // nonsense code for testing
    badData['0001'] = encodedQuery;
    goodData['0001'] = encodedQuery;
    // standard return of badData and goodData
    return {
      badData: badData,
      goodData: goodData,
    };
    //
    //
  },
  // is this needed?
  // type: 'Test'
};
//
// code for script include - end
//
//
//
//
//
//
var testScriptInclude = function () {
  //
  //
  var snorkMaiden = new Moomin();
  var allData = snorkMaiden.main('nameSTARTSWITHtesting');
  gs.debug(allData.badData);
  gs.debug(allData.goodData);
  //
  //
};
testScriptInclude();
