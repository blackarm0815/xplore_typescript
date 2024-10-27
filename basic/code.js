"use strict";
//
// code for script include - start
//
var ThingThatNeedsNaming = Class.create();
ThingThatNeedsNaming.prototype = {
  //
  // this might need to be uncommented if this code is run in an actual script include
  // initialize: function() {},
  //
  main: function (encodedQuery) {
    // there is only one function, main()
    // it will always be called this
    // all datastructures will exist in the scope of main()
    // all functions will exist in the scope of main()
    // data will be returned from the scope of main()
    //
    var badData = {};
    var goodData = {};
    //
    var engage = function () {
      //
      var fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      var fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      var fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      var fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      //
      badData[fakeSysId1] = {
        errors: {
          'string_field issue': true,
          'puny god': true,
        },
        number_field: 5,
        string_field: null,
      };
      badData[fakeSysId2] = {
        errors: {
          'number_field issue': true,
        },
        number_field: null,
        string_field: "foo_".concat(encodedQuery),
      };
      goodData[fakeSysId3] = {
        number_field: 4,
        string_field: "foo_".concat(encodedQuery),
      };
      goodData[fakeSysId4] = {
        number_field: 0,
        string_field: "blah_".concat(encodedQuery),
      };
    };
    engage();
    return {
      badData: badData,
      goodData: goodData,
    };
  },
  type: 'Test',
};
//
// code for script include - end
//
var report = function (badData, goodData) {
  //
  var countBad = 0;
  var countGood = 0;
  var percentage = 0;
  var reportString = '';
  var total = 0;
  //
  countBad = Object.keys(badData).length;
  countGood = Object.keys(goodData).length;
  total = countBad + countGood;
  percentage = (countGood / total) * 100;
  reportString += '\n\n';
  reportString += "Total good data = ".concat(countGood, "\n");
  reportString += "Total bad data = ".concat(countBad, "\n");
  reportString += "Pass rate = ".concat(percentage, "%\n");
  reportString += '\n\n';
  gs.print(reportString);
  gs.debug(goodData);
  gs.debug(badData);
};
var testCode = function () {
  var badData = {};
  var goodData = {};
  var kaiju = new ThingThatNeedsNaming();
  var results = kaiju.main('nameSTARTSWITHtesting');
  badData = results.badData;
  goodData = results.goodData;
  report(badData, goodData);
};
testCode();
