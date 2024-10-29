"use strict";
//
//
//
// code for script include - start
//
//
//
var CheckRackPositionStage = Class.create();
CheckRackPositionStage.prototype = {
  initialize: function () { },
  execute: function (encodedQuery) {
    //
    var assetData = {};
    var errors = {};
    var mergeData = {};
    var rackData = {};
    var stats = {
      total_errors: 0,
      total_mergeData: 0,
      pass_rate: 0,
    };
    var uniqueAssetSysid = {};
    //
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
    var storeError = function (errorMessage, rackSysId) {
      if (!Object.prototype.hasOwnProperty.call(errors, rackSysId)) {
        errors[rackSysId] = {};
      }
      errors[rackSysId][errorMessage] = true;
    };
    var checkStateRetired = function (testData) {
      if (testData.rack_u_rack_position_stage === 'retired') {
        if (testData.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '7') {
          storeError('rack_install_status is not 7', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Retired') {
          storeError('rack_u_cmdb_ci_status is not Retired', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    var checkStageReadyToRecieveServer = function (testData) {
      if (testData.rack_u_rack_position_stage === 'readyToReceiveServer') {
        if (testData.asset_install_status !== '1') {
          storeError('asset_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== 'allocated') {
          storeError('asset_substatus is not allocated', testData.rack_sys_id);
        }
        if (testData.asset_sys_id === null) {
          storeError('asset_sys_id is null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '1') {
          storeError('rack_u_cabling_installed is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '1') {
          storeError('rack_u_pdu_installed is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '1') {
          storeError('rack_u_tor_installed is not 1', testData.rack_sys_id);
        }
      }
    };
    var checkStageRackBeingConfigured = function (testData) {
      if (testData.rack_u_rack_position_stage === 'rackBeingConfigured') {
        if (testData.asset_install_status !== '1') {
          storeError('asset_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== 'allocated') {
          storeError('asset_substatus is not allocated', testData.rack_sys_id);
        }
        if (testData.asset_sys_id === null) {
          storeError('asset_sys_id is null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed === '1' && testData.rack_u_pdu_installed === '1' && testData.rack_u_tor_installed === '1') {
          storeError('all check boxes are ticked (should be a mix)', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed === '0' && testData.rack_u_pdu_installed === '0' && testData.rack_u_tor_installed === '0') {
          storeError('all check boxes are unticked (should be a mix)', testData.rack_sys_id);
        }
      }
    };
    var checkStageLanded = function (testData) {
      if (testData.rack_u_rack_position_stage === 'landed') {
        if (testData.asset_install_status !== '1') {
          storeError('asset_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== 'allocated') {
          storeError('asset_substatus is not allocated', testData.rack_sys_id);
        }
        if (testData.asset_sys_id === null) {
          storeError('asset_sys_id is null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    var checkStagePendingLand = function (testData) {
      if (testData.rack_u_rack_position_stage === 'pendingLand') {
        if (testData.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    var checkStageMakeup = function (testData) {
      if (testData.rack_u_rack_position_stage === 'makeup') {
        if (testData.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    var checkStageAvailable = function (testData) {
      if (testData.rack_u_rack_position_stage === 'available') {
        if (testData.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('asset_sys_id is not asset_sys_id', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    var checkStageUnusable = function (testData) {
      if (testData.rack_u_rack_position_stage === 'unusable') {
        if (testData.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    var checkEmpty = function (testData) {
      if (testData.rack_u_rack_position_stage === null) {
        storeError('rack_u_rack_position_stage is null', testData.rack_sys_id);
      }
    };
    var testMergeData = function () {
      //
      var testData;
      //
      Object.keys(mergeData).forEach(function (rackSysId) {
        testData = mergeData[rackSysId];
        checkEmpty(testData);
        checkStageUnusable(testData);
        checkStageAvailable(testData);
        checkStageMakeup(testData);
        checkStagePendingLand(testData);
        checkStageLanded(testData);
        checkStageRackBeingConfigured(testData);
        checkStageReadyToRecieveServer(testData);
        checkStateRetired(testData);
      });
    };
    var createMergeData = function () {
      //
      var testAssetInstallStatus = null;
      var testAssetSubstatus = null;
      var testAssetSysId = null;
      //
      Object.keys(rackData).forEach(function (rackSysId) {
        testAssetInstallStatus = null;
        testAssetSubstatus = null;
        testAssetSysId = rackData[rackSysId].asset_sys_id;
        if (testAssetSysId !== null) {
          if (Object.prototype.hasOwnProperty.call(assetData, testAssetSysId)) {
            testAssetInstallStatus = assetData[testAssetSysId].asset_install_status;
            testAssetSubstatus = assetData[testAssetSysId].asset_substatus;
          }
        }
        mergeData[rackSysId] = {
          asset_install_status: testAssetInstallStatus,
          asset_substatus: testAssetSubstatus,
          asset_sys_id: testAssetSysId,
          rack_install_status: rackData[rackSysId].rack_install_status,
          rack_name: rackData[rackSysId].rack_name,
          rack_sys_id: rackSysId,
          rack_u_cabling_installed: rackData[rackSysId].rack_u_cabling_installed,
          rack_u_cmdb_ci_status: rackData[rackSysId].rack_u_cmdb_ci_status,
          rack_u_pdu_installed: rackData[rackSysId].rack_u_pdu_installed,
          rack_u_rack_position_stage: rackData[rackSysId].rack_u_rack_position_stage,
          rack_u_tor_installed: rackData[rackSysId].rack_u_tor_installed,
        };
      });
    };
    var checkString = function (testVariable) {
      if (typeof testVariable === 'string') {
        if (testVariable !== '') {
          return testVariable;
        }
      }
      return null;
    };
    var getAsset = function () {
      //
      var sysId = null;
      //
      var grAsset = new GlideRecord('alm_hardware');
      grAsset.addQuery('sys_id', 'IN', Object.keys(uniqueAssetSysid));
      grAsset.query();
      while (grAsset.next()) {
        sysId = checkString(grAsset.getUniqueValue());
        //
        // store the rack data
        if (sysId !== null) {
          assetData[sysId] = {
            asset_install_status: checkString(grAsset.install_status.getValue()),
            asset_substatus: checkString(grAsset.substatus.getValue()),
          };
        }
      }
    };
    var getRack = function () {
      //
      var sysId = null;
      var testAssetSysId = null;
      //
      var grRack = new GlideRecord('cmdb_ci_rack');
      if (encodedQuery !== '') {
        grRack.addEncodedQuery(encodedQuery);
      }
      grRack.query();
      while (grRack.next()) {
        sysId = checkString(grRack.getUniqueValue());
        testAssetSysId = checkString(grRack.asset.getValue());
        //
        // store the rack data
        if (sysId !== null) {
          rackData[sysId] = {
            asset_sys_id: testAssetSysId,
            rack_install_status: checkString(grRack.install_status.getValue()),
            rack_name: checkString(grRack.name.getValue()),
            rack_u_rack_position_stage: checkString(grRack.u_rack_position_stage.getValue()),
            rack_u_cabling_installed: checkString(grRack.u_cabling_installed.getValue()),
            rack_u_cmdb_ci_status: checkString(grRack.u_cmdb_ci_status.getDisplayValue()),
            rack_u_pdu_installed: checkString(grRack.u_pdu_installed.getValue()),
            rack_u_tor_installed: checkString(grRack.u_tor_installed.getValue()),
          };
        }
        //
        // store the asset sys_ids for the alm_hardware batch query
        if (testAssetSysId !== null) {
          uniqueAssetSysid[testAssetSysId] = true;
        }
      }
    };
    var main = function () {
      getRack();
      getAsset();
      createMergeData();
      testMergeData();
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
  // every single rack ''
  //
  // run the script include
  var shiny = new CheckRackPositionStage();
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
