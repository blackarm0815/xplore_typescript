"use strict";
//
// code for script include - start
//
var ThingThatNeedsNaming = Class.create();
ThingThatNeedsNaming.prototype = {
  // initialize: function() {},
  execute: function (encodedQuery) {
    //
    // all datastructures will exist in the scope of execute()
    // all functions will exist in the scope of execute()
    // data will be returned from the scope of execute()
    //
    var errors = {};
    var rawData = {};
    var stats = {
      total_errors: 0,
      total_rawData: 0,
      pass_rate: 0,
    };
    //
    var makeStats = function () {
      var passRate = 0;
      var totalErrors = 0;
      var totalRawData = 0;
      //
      totalErrors = Object.keys(errors).length;
      totalRawData = Object.keys(rawData).length;
      if (totalRawData !== 0) {
        passRate = ((totalRawData - totalErrors) / totalRawData) * 100;
      }
      stats = {
        total_errors: totalErrors,
        total_rawData: totalRawData,
        pass_rate: passRate,
      };
    };
    var makeFakeData = function () {
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
    var main = function () {
      makeFakeData();
      makeStats();
    };
    //
    main();
    //
    return {
      errors: errors,
      rawData: rawData,
      stats: stats,
    };
    //
  },
  type: 'Test',
};
//
// code for script include - end
//
var testing = function () {
  //
  var shiny = new ThingThatNeedsNaming();
  var results = shiny.execute('glideRecordEncodedQueryGoesHere');
  //
  gs.debug('\n\n***********\n** stats **\n***********\n');
  gs.debug(results.stats);
  gs.debug('\n\n************\n** errors **\n************\n');
  gs.debug(results.errors);
  gs.debug('\n\n*************\n** rawData **\n*************\n');
  gs.debug(results.rawData);
};
testing();
