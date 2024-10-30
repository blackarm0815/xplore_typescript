"use strict";
//
// code for script include - start
//
var Kaiju = Class.create();
Kaiju.prototype = {
  initialize: function () { },
  execute: function (encodedQuery) {
    //
    var assetData = {};
    var modelData = {};
    var patchpanelData = {};
    var rackData = {};
    var uniqueModelSysId = {};
    var uniqueRackSysId = {};
    //
    var checkInteger = function (testVariable) {
      if (typeof testVariable === 'string') {
        if (!Number.isNaN(parseInt(testVariable, 10))) {
          return parseInt(testVariable, 10);
        }
      }
      return null;
    };
    var checkString = function (testVariable) {
      if (typeof testVariable === 'string') {
        if (testVariable !== '') {
          return testVariable;
        }
      }
      return null;
    };
    var getModel = function () {
      var grModel;
      var tempModelSysId;
      if (Object.keys(uniqueModelSysId).length > 0) {
        grModel = new GlideRecord('cmdb_model');
        grModel.addQuery('sys_id', 'IN', Object.keys(uniqueModelSysId));
        grModel.query();
        while (grModel.next()) {
          tempModelSysId = checkString(grModel.getUniqueValue());
          if (tempModelSysId !== null) {
            modelData[tempModelSysId] = {
              deviceCategory: checkString(grModel.getDisplayValue('u_device_category')),
              maxChildren: checkInteger(grModel.getValue('u_max_children')),
              modelHeight: checkInteger(grModel.getValue('rack_units')),
            };
          }
        }
      }
    };
    var getPatchpanelData = function () {
      var grPatch;
      var modelSysId;
      var patchpanelSysId;
      var rackSysId;
      grPatch = new GlideRecord('u_patch_panel');
      grPatch.addQuery('u_rack', 'IN', Object.keys(uniqueRackSysId));
      grPatch.query();
      while (grPatch.next()) {
        modelSysId = checkString(grPatch.getValue('model_id'));
        patchpanelSysId = checkString(grPatch.getUniqueValue());
        rackSysId = checkString(grPatch.getValue('u_rack'));
        if (modelSysId !== null && patchpanelSysId !== null && rackSysId !== null) {
          patchpanelData[patchpanelSysId] = {
            modelSysId: modelSysId,
            patchName: checkString(grPatch.getValue('name')),
            rackSysId: rackSysId,
            rackU: checkInteger(grPatch.getValue('u_rack_u')),
          };
        }
        if (modelSysId !== null) {
          uniqueModelSysId[modelSysId] = true;
        }
      }
    };
    var getAsset = function () {
      var assetSysId;
      var grAsset;
      var modelSysId;
      var rackSysId;
      if (Object.keys(uniqueRackSysId).length > 0) {
        grAsset = new GlideRecord('alm_hardware');
        grAsset.addQuery('u_rack', 'IN', Object.keys(uniqueRackSysId));
        grAsset.query();
        while (grAsset.next()) {
          assetSysId = checkString(grAsset.getUniqueValue());
          modelSysId = checkString(grAsset.getValue('model'));
          rackSysId = checkString(grAsset.getValue('u_rack'));
          if (assetSysId !== null && rackSysId !== null) {
            assetData[assetSysId] = {
              modelSysId: modelSysId,
              parent: checkString(grAsset.getValue('parent')),
              rackSysId: rackSysId,
              rackU: checkInteger(grAsset.getValue('u_rack_u')),
              sleds: {},
              slot: checkInteger(grAsset.getValue('u_slot')),
            };
            if (modelSysId !== null) {
              uniqueModelSysId[modelSysId] = true;
            }
          }
        }
      }
    };
    var getRackData = function () {
      var grRack;
      var rackSysId;
      var rackName;
      var rackUnits;
      grRack = new GlideRecord('cmdb_ci_rack');
      grRack.addEncodedQuery(encodedQuery);
      grRack.query();
      while (grRack.next()) {
        rackName = checkString(grRack.getValue('name'));
        rackSysId = checkString(grRack.getUniqueValue());
        rackUnits = checkInteger(grRack.getValue('rack_units'));
        if (rackName !== null && rackSysId !== null && rackUnits !== null) {
          rackData[rackSysId] = {
            assets: {},
            name: rackName,
            rack_units: rackUnits,
          };
          uniqueRackSysId[rackSysId] = true;
        }
      }
    };
    var main = function () {
      getRackData();
      getAsset();
      getPatchpanelData();
      getModel();
    };
    //
    main();
    //
    return {
      assetData: assetData,
      modelData: modelData,
      patchpanelData: patchpanelData,
      rackData: rackData,
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
var showData = function (assetData, modelData, patchpanelData, rackData) {
  gs.debug('<h2>assetData</h2>');
  gs.debug(assetData);
  gs.debug('<h2>modelData</h2>');
  gs.debug(modelData);
  gs.debug('<h2>patchpanelData</h2>');
  gs.debug(patchpanelData);
  gs.debug('<h2>rackData</h2>');
  gs.debug(rackData);
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
  // run the script include
  var shiny = new Kaiju();
  var results = shiny.execute(encodedQuery);
  //
  // extract the data from the results
  var assetData = results.assetData;
  var modelData = results.modelData;
  var patchpanelData = results.patchpanelData;
  var rackData = results.rackData;
  // const errors: Record<string, Record<string, boolean>> = results.errors;
  // const mergeData: Record<string, MergeData> = results.mergeData;
  // const stats: Stats = results.stats;
  //
  // show data
  showData(assetData, modelData, patchpanelData, rackData);
};
getData();
