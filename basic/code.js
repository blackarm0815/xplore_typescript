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
  execute: function (encodedQuery) {
    //
    // all datastructures will exist in the scope of execute()
    // all functions will exist in the scope of execute()
    // data will be returned from the scope of execute()
    //
    var errors = {};
    var rawData = {};
    //
    var main = function () {
      //
      var fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      var fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      var fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      var fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      //
      rawData[fakeSysId1] = {
        apples: 1,
        bananas: 3,
        carrots: null,
        name: 'blah',
      };
      errors[fakeSysId1] = {};
      errors[fakeSysId1].data_quality_carrots = true;
      rawData[fakeSysId2] = {
        apples: 1,
        bananas: null,
        carrots: 3,
        name: null,
      };
      errors[fakeSysId2] = {};
      errors[fakeSysId2].data_quality_bananas = true;
      errors[fakeSysId2].data_quality_name = true;
      rawData[fakeSysId3] = {
        apples: 1,
        bananas: 2,
        carrots: 3,
        name: 'foo',
      };
      rawData[fakeSysId4] = {
        apples: 3,
        bananas: 2,
        carrots: 1,
        name: encodedQuery,
      };
    };
    //
    main();
    //
    return {
      rawData: rawData,
      errors: errors,
    };
    //
  },
  type: 'Test',
};
//
// code for script include - end
//
var report = function (errors, rawData) {
  //
  var countBad = 0;
  var percentage = 0;
  var reportString = '';
  var total = 0;
  //
  countBad = Object.keys(errors).length;
  total = Object.keys(rawData).length;
  percentage = ((total - countBad) / total) * 100;
  reportString = '\n\n***********\n** stats **\n***********\n\n';
  reportString += "Total errors = ".concat(countBad, "\n");
  reportString += "Total rawData = ".concat(total, "\n");
  reportString += "Pass rate = ".concat(percentage, "%\n");
  reportString += '\n\n';
  gs.print(reportString);
  gs.debug('\n\n************\n** errors **\n************\n');
  gs.debug(errors);
  gs.debug('\n\n*************\n** rawData **\n*************\n');
  gs.debug(rawData);
};
var testCode = function () {
  //
  var rawData = {};
  var errors = {};
  //
  //
  //
  var shiny = new ThingThatNeedsNaming();
  var results = shiny.execute('glideRecordEncodedQueryGoesHere');
  //
  //
  //
  errors = results.errors;
  rawData = results.rawData;
  report(errors, rawData);
};
testCode();
