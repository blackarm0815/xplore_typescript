"use strict";
//
// code for script include - start
//
var ScriptIncludeThing = Class.create();
ScriptIncludeThing.prototype = {
  initialize: function () { },
  execute: function (encodedQuery) {
    //
    // all datastructures will exist in the scope of execute()
    // all functions will exist in the scope of execute()
    // data will be returned from the scope of execute()
    //
    var errors = {};
    var mergeData = {};
    var stats = {
      total_errors: 0,
      total_mergeData: 0,
      pass_rate: 0,
    };
    //
    var makeStats = function () {
      var passRate = 0;
      var totalErrors = 0;
      var totalMergeData = 0;
      //
      totalErrors = Object.keys(errors).length;
      totalMergeData = Object.keys(mergeData).length;
      if (totalMergeData !== 0) {
        passRate = ((totalMergeData - totalErrors) / totalMergeData) * 100;
      }
      stats = {
        total_errors: totalErrors,
        total_mergeData: totalMergeData,
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
      mergeData[fakeSysId1] = {
        apples: 1,
        bananas: 3,
        carrots: null,
        name: 'blah',
      };
      errors[fakeSysId1] = {};
      errors[fakeSysId1].data_quality_carrots = true;
      mergeData[fakeSysId2] = {
        apples: 1,
        bananas: null,
        carrots: 3,
        name: null,
      };
      errors[fakeSysId2] = {};
      errors[fakeSysId2].data_quality_bananas = true;
      errors[fakeSysId2].data_quality_name = true;
      mergeData[fakeSysId3] = {
        apples: 1,
        bananas: 2,
        carrots: 3,
        name: 'foo',
      };
      mergeData[fakeSysId4] = {
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
      mergeData: mergeData,
      stats: stats,
    };
    //
  },
  type: 'Test',
};
//
//
//
// code for script include - end
//
//
//
var showData = function (errors, mergeData, stats) {
  gs.debug('<h2>stats</h2>');
  gs.debug(stats);
  gs.debug('<h2>errors</h2>');
  gs.debug(errors);
  gs.debug('<h2>mergeData</h2>');
  gs.debug(mergeData);
};
var getData = function () {
  //
  var encodedQuery = '';
  //
  // encoded query for the example racks
  encodedQuery = 'nameSTARTSWITHp3sj01.01^ORnameSTARTSWITHp3sj01.02^ORnameSTARTSWITHp3sj01.03';
  encodedQuery += '^ORnameSTARTSWITHp3sj01.04^ORnameSTARTSWITHp3sj01.05^ORnameSTARTSWITHp3sj01.06';
  encodedQuery += '^ORnameSTARTSWITHp3sj01.07^ORnameSTARTSWITHp3sj01.08^ORnameSTARTSWITHp3sj01.09';
  //
  // example encoded queries
  // rack by sys_id 'sys_id=30cae3f4db271788259e5898dc961926'
  // rack by name 'nameSTARTSWITHp3sj01.02'
  // row by name 'nameSTARTSWITHp3sj01'
  // room by name 'nameSTARTSWITHp3sj'
  //
  // run the script include
  var shiny = new ScriptIncludeThing();
  var results = shiny.execute(encodedQuery);
  //
  // extract the data from the results
  var errors = results.errors;
  var mergeData = results.mergeData;
  var stats = results.stats;
  //
  // show data
  showData(errors, mergeData, stats);
};
getData();
