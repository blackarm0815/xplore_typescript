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
  engage: function (encodedQuery) {
    // there is only one function, engage()
    // it will always be called this
    // all datastructures will exist in the scope of engage()
    // all functions will exist in the scope of engage()
    // data will be returned from the scope of engage()
    //
    var badData = {};
    var goodData = {};
    //
    var main = function () {
      //
      var fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      var fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      var fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      var fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      var urlStart = '';
      //
      urlStart = gs.getProperty('glide.servlet.uri');
      badData[fakeSysId1] = {
        failures: {
          'string_field issue': true,
          'puny god': true,
        },
        data: {
          number_field: 5,
          string_field: null,
        },
        url: "".concat(urlStart, "alm_hardware.do?sys_id=").concat(fakeSysId1),
      };
      badData[fakeSysId2] = {
        failures: {
          'number_field issue': true,
        },
        data: {
          number_field: null,
          string_field: "foo_".concat(encodedQuery),
        },
        url: "".concat(urlStart, "alm_hardware.do?sys_id=").concat(fakeSysId2),
      };
      //
      goodData[fakeSysId3] = {
        number_field: 4,
        string_field: "foo_".concat(encodedQuery),
      };
      goodData[fakeSysId4] = {
        number_field: 0,
        string_field: "blah_".concat(encodedQuery),
      };
      //
    };
    //
    main();
    //
    return {
      badData: badData,
      goodData: goodData,
    };
    //
  },
  type: 'Test',
};
//
// code for script include - end
//
var report = function (countBad, countGood) {
  //
  var percentage = 0;
  var reportString = '';
  var total = 0;
  //
  total = countBad + countGood;
  percentage = (countGood / total) * 100;
  //
  reportString += '\n\n';
  reportString += "Total good data = ".concat(countGood, "\n");
  reportString += "Total bad data = ".concat(countBad, "\n");
  reportString += "Pass rate = ".concat(percentage, "%\n");
  reportString += '\n\n';
  gs.print(reportString);
};
var testCode = function () {
  //
  var countBad = 0;
  var countGood = 0;
  var badData = null;
  var goodData = null;
  //
  var kaiju = new ThingThatNeedsNaming();
  var results = kaiju.engage('nameSTARTSWITHtesting');
  badData = results.badData;
  goodData = results.goodData;
  if (badData !== null && goodData !== null) {
    countBad = Object.keys(badData).length;
    countGood = Object.keys(goodData).length;
    report(countBad, countGood);
  }
  gs.debug(results.goodData);
  gs.debug(results.badData);
};
testCode();
