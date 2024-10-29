interface AssetData {
  asset_install_status: string | null;
  asset_substatus: string | null;
}
interface RackData {
  asset_sys_id: string | null;
  rack_install_status: string | null;
  rack_name: string | null;
  rack_u_cabling_installed: string | null;
  rack_u_cmdb_ci_status: string | null;
  rack_u_pdu_installed: string | null;
  rack_u_rack_position_stage: string | null;
  rack_u_tor_installed: string | null;
}
interface RawData {
  asset_install_status: string | null;
  asset_substatus: string | null;
  asset_sys_id: string | null;
  rack_install_status: string | null;
  rack_name: string | null;
  rack_sys_id: string;
  rack_u_cabling_installed: string | null;
  rack_u_cmdb_ci_status: string | null;
  rack_u_pdu_installed: string | null;
  rack_u_rack_position_stage: string | null;
  rack_u_tor_installed: string | null;
}
interface Stats {
  pass_rate: number;
  total_errors: number;
  total_rawData: number;
}
//
// code for script include - start
//
// @ts-ignore
const ScriptIncludeThing = Class.create();
ScriptIncludeThing.prototype = {
  // initialize: function() {},
  execute: (encodedQuery: string) => {
    //
    const assetData: Record<string, AssetData> = {};
    const errors: Record<string, Record<string, boolean>> = {};
    const rawData: Record<string, RawData> = {};
    const rackData: Record<string, RackData> = {};
    let stats: Stats = {
      total_errors: 0,
      total_rawData: 0,
      pass_rate: 0,
    };
    const uniqueAssetSysid: Record<string, boolean> = {};
    //
    //
    const makeStats = () => {
      let passRate = 0;
      let totalErrors = 0;
      let totalRawData = 0;
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
    const storeError = (
      errorMessage: string,
      rackSysId: string,
    ) => {
      if (!Object.prototype.hasOwnProperty.call(errors, rackSysId)) {
        errors[rackSysId] = {};
      }
      errors[rackSysId][errorMessage] = true;
    };
    const checkStateRetired = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'retired') {
        if (testData.asset_install_status !== null) {
          storeError('Retired - asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('Retired - asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('Retired - asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '7') {
          storeError('Retired - rack_install_status is not 7', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('Retired - rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Retired') {
          storeError('Retired - rack_u_cmdb_ci_status is not Retired', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('Retired - rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('Retired - rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    const checkStageReadyToRecieveServer = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'readyToReceiveServer') {
        if (testData.asset_install_status !== '1') {
          storeError('Ready To Recieve Server - asset_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== 'allocated') {
          storeError('Ready To Recieve Server - asset_substatus is not allocated', testData.rack_sys_id);
        }
        if (testData.asset_sys_id === null) {
          storeError('Ready To Recieve Server - asset_sys_id is null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('Ready To Recieve Server - rack_install_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '1') {
          storeError('Ready To Recieve Server - rack_u_cabling_installed is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Ready To Recieve Server - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '1') {
          storeError('Ready To Recieve Server - rack_u_pdu_installed is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '1') {
          storeError('Ready To Recieve Server - rack_u_tor_installed is not 1', testData.rack_sys_id);
        }
      }
    };
    const checkStageRackBeingConfigured = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'rackBeingConfigured') {
        if (testData.asset_install_status !== '1') {
          storeError('Rack Being Configured - asset_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== 'allocated') {
          storeError('Rack Being Configured - asset_substatus is not allocated', testData.rack_sys_id);
        }
        if (testData.asset_sys_id === null) {
          storeError('Rack Being Configured - asset_sys_id is null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('Rack Being Configured - rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Rack Being Configured - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed === '1' && testData.rack_u_pdu_installed === '1' && testData.rack_u_tor_installed === '1') {
          storeError('Rack Being Configured - all check boxes are ticked (should be a mix)', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed === '0' && testData.rack_u_pdu_installed === '0' && testData.rack_u_tor_installed === '0') {
          storeError('Rack Being Configured - all check boxes are unticked (should be a mix)', testData.rack_sys_id);
        }
      }
    };
    const checkStageLanded = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'landed') {
        if (testData.asset_install_status !== '1') {
          storeError('Landed - asset_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== 'allocated') {
          storeError('Landed - asset_substatus is not allocated', testData.rack_sys_id);
        }
        if (testData.asset_sys_id === null) {
          storeError('Landed - asset_sys_id is null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('Landed - rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('Landed - rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Landed - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('Landed - rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('Landed - rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    const checkStagePendingLand = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'pendingLand') {
        if (testData.asset_install_status !== null) {
          storeError('PendingLand - asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('PendingLand - asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('PendingLand - asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('PendingLand - rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('PendingLand - rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('PendingLand - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('PendingLand - rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('PendingLand - rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    const checkStageMakeup = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'makeup') {
        if (testData.asset_install_status !== null) {
          storeError('Makeup - asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('Makeup - asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('Makeup - asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('Makeup - rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('Makeup - rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Makeup - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('Makeup - rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('Makeup - rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    const checkStageAvailable = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'available') {
        if (testData.asset_install_status !== null) {
          storeError('Available - asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('Available - asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('Available - asset_sys_id is not asset_sys_id', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('Available - rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('Available - rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Available - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('Available - rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('Available - rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    const checkStageUnusable = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === 'unusable') {
        if (testData.asset_install_status !== null) {
          storeError('Unusable - asset_install_status is not null', testData.rack_sys_id);
        }
        if (testData.asset_substatus !== null) {
          storeError('Unusable - asset_substatus is not null', testData.rack_sys_id);
        }
        if (testData.asset_sys_id !== null) {
          storeError('Unusable - asset_sys_id is not null', testData.rack_sys_id);
        }
        if (testData.rack_install_status !== '1') {
          storeError('Unusable - rack_install_status is not 1', testData.rack_sys_id);
        }
        if (testData.rack_u_cabling_installed !== '0') {
          storeError('Unusable - rack_u_cabling_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Unusable - rack_u_cmdb_ci_status is not Live', testData.rack_sys_id);
        }
        if (testData.rack_u_pdu_installed !== '0') {
          storeError('Unusable - rack_u_pdu_installed is not 0', testData.rack_sys_id);
        }
        if (testData.rack_u_tor_installed !== '0') {
          storeError('Unusable - rack_u_tor_installed is not 0', testData.rack_sys_id);
        }
      }
    };
    const checkEmpty = (
      testData: RawData,
    ) => {
      if (testData.rack_u_rack_position_stage === null) {
        storeError('Empty - rack position stage is missing', testData.rack_sys_id);
      }
    };
    const testRawData = () => {
      //
      let testData: RawData;
      //
      Object.keys(rawData).forEach((rackSysId) => {
        testData = rawData[rackSysId];
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
    const createRawData = () => {
      //
      let testAssetInstallStatus: string | null = null;
      let testAssetSubstatus: string | null = null;
      let testAssetSysId: string | null = null;
      //
      Object.keys(rackData).forEach((rackSysId) => {
        //
        // try and find relevent asset data
        testAssetSysId = rackData[rackSysId].asset_sys_id;
        if (testAssetSysId !== null) {
          if (Object.prototype.hasOwnProperty.call(assetData, testAssetSysId)) {
            testAssetInstallStatus = assetData[testAssetSysId].asset_install_status;
            testAssetSubstatus = assetData[testAssetSysId].asset_substatus;
          }
        }
        rawData[rackSysId] = {
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
    const checkString = (
      testVariable: unknown,
    ) => {
      if (typeof testVariable === 'string') {
        if (testVariable !== '') {
          return testVariable;
        }
      }
      return null;
    };
    const getAsset = () => {
      //
      let sysId: string | null = null;
      //
      // @ts-ignore
      const grAsset = new GlideRecord('alm_hardware');
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
    const getRack = () => {
      //
      let sysId: string | null = null;
      let testAssetSysId: string | null = null;
      //
      // @ts-ignore
      const grRack = new GlideRecord('cmdb_ci_rack');
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
    const main = () => {
      getRack();
      getAsset();
      createRawData();
      testRawData();
      makeStats();
    };
    //
    main();
    //
    return {
      errors,
      rawData,
      stats,
    };
  },
  type: 'Test',
};
//
// code for script include - end
//
const testing = () => {
  //
  let testQuery = '';
  //
  testQuery = 'nameSTARTSWITHp3sj01.02^ORnameSTARTSWITHp3sj01.03^ORnameSTARTSWITHp3sj01.04^ORnameSTARTSWITHp3sj01.05';
  testQuery += '^ORnameSTARTSWITHp3sj01.06^ORnameSTARTSWITHp3sj01.07^ORnameSTARTSWITHp3sj01.08^ORnameSTARTSWITHp3sj01.09';
  //
  const shiny = new ScriptIncludeThing();
  const results = shiny.execute(testQuery);
  //
  // @ts-ignore
  gs.debug('<h2>stats</h2>');
  // @ts-ignore
  gs.debug(results.stats);
  // @ts-ignore
  gs.debug('<h2>errors</h2>');
  // @ts-ignore
  gs.debug(results.errors);
  // @ts-ignore
  gs.debug('<h2>rawData</h2>');
  // @ts-ignore
  gs.debug(results.rawData);
};
testing();
