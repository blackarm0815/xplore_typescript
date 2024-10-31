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
interface MergeData {
  data: {
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
  };
  error_log: Record<string, boolean>;
}
interface Stats {
  pass_rate: number;
  total_errors: number;
  total_mergeData: number;
}
// @ts-ignore
const CheckRackPositionStage = Class.create();
CheckRackPositionStage.prototype = {
  initialize: function() {}, // eslint-disable-line
  execute: (encodedQuery: string) => {
    //
    const assetData: Record<string, AssetData> = {};
    const mergeData: Record<string, MergeData> = {};
    const rackData: Record<string, RackData> = {};
    let stats: Stats = {
      total_errors: 0,
      total_mergeData: 0,
      pass_rate: 0,
    };
    const uniqueAssetSysid: Record<string, boolean> = {};
    //
    //
    const makeStats = () => {
      let passRate = 0;
      let totalErrors = 0;
      let totalMergeData = 0;
      //
      totalMergeData = Object.keys(mergeData).length;
      Object.keys(mergeData).forEach((rackSysId) => {
        if (Object.keys(mergeData[rackSysId].error_log).length !== 0) {
          totalErrors += 1;
        }
      });
      if (totalMergeData !== 0) {
        passRate = ((totalMergeData - totalErrors) / totalMergeData) * 100;
      }
      stats = {
        total_errors: totalErrors,
        total_mergeData: totalMergeData,
        pass_rate: passRate,
      };
    };
    const storeError = (
      errorMessage: string,
      rackSysId: string,
    ) => {
      mergeData[rackSysId].error_log[errorMessage] = true;
    };
    const checkStateRetired = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'retired') {
        if (testData.data.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '7') {
          storeError('rack_install_status is not 7', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Retired') {
          storeError('rack_u_cmdb_ci_status is not Retired', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.data.rack_sys_id);
        }
      }
    };
    const checkStageReadyToRecieveServer = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'readyToReceiveServer') {
        if (testData.data.asset_install_status !== '1') {
          storeError('asset_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== 'allocated') {
          storeError('asset_substatus is not allocated', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id === null) {
          storeError('asset_sys_id is null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '1') {
          storeError('rack_u_cabling_installed is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '1') {
          storeError('rack_u_pdu_installed is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '1') {
          storeError('rack_u_tor_installed is not 1', testData.data.rack_sys_id);
        }
      }
    };
    const checkStageRackBeingConfigured = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'rackBeingConfigured') {
        if (testData.data.asset_install_status !== '1') {
          storeError('asset_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== 'allocated') {
          storeError('asset_substatus is not allocated', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id === null) {
          storeError('asset_sys_id is null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed === '1' && testData.data.rack_u_pdu_installed === '1' && testData.data.rack_u_tor_installed === '1') {
          storeError('all check boxes are ticked (should be a mix)', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed === '0' && testData.data.rack_u_pdu_installed === '0' && testData.data.rack_u_tor_installed === '0') {
          storeError('all check boxes are unticked (should be a mix)', testData.data.rack_sys_id);
        }
      }
    };
    const checkStageLanded = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'landed') {
        if (testData.data.asset_install_status !== '1') {
          storeError('asset_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== 'allocated') {
          storeError('asset_substatus is not allocated', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id === null) {
          storeError('asset_sys_id is null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.data.rack_sys_id);
        }
      }
    };
    const checkStagePendingLand = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'pendingLand') {
        if (testData.data.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.data.rack_sys_id);
        }
      }
    };
    const checkStageMakeup = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'makeup') {
        if (testData.data.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.data.rack_sys_id);
        }
      }
    };
    const checkStageAvailable = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'available') {
        if (testData.data.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id !== null) {
          storeError('asset_sys_id is not asset_sys_id', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.data.rack_sys_id);
        }
      }
    };
    const checkStageUnusable = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === 'unusable') {
        if (testData.data.asset_install_status !== null) {
          storeError('asset_install_status is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_substatus !== null) {
          storeError('asset_substatus is not null', testData.data.rack_sys_id);
        }
        if (testData.data.asset_sys_id !== null) {
          storeError('asset_sys_id is not null', testData.data.rack_sys_id);
        }
        if (testData.data.rack_install_status !== '1') {
          storeError('rack_install_status is not 1', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cabling_installed !== '0') {
          storeError('rack_u_cabling_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_cmdb_ci_status !== 'Live') {
          storeError('rack_u_cmdb_ci_status is not Live', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_pdu_installed !== '0') {
          storeError('rack_u_pdu_installed is not 0', testData.data.rack_sys_id);
        }
        if (testData.data.rack_u_tor_installed !== '0') {
          storeError('rack_u_tor_installed is not 0', testData.data.rack_sys_id);
        }
      }
    };
    const checkEmpty = (
      testData: MergeData,
    ) => {
      if (testData.data.rack_u_rack_position_stage === null) {
        storeError('rack_u_rack_position_stage is null', testData.data.rack_sys_id);
      }
    };
    const testMergeData = () => {
      //
      let testData: MergeData;
      //
      Object.keys(mergeData).forEach((rackSysId) => {
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
    const createMergeData = () => {
      //
      let testAssetInstallStatus: string | null = null;
      let testAssetSubstatus: string | null = null;
      let testAssetSysId: string | null = null;
      //
      Object.keys(rackData).forEach((rackSysId) => {
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
          data: {
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
          },
          error_log: {},
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
      createMergeData();
      testMergeData();
      makeStats();
    };
    //
    main();
    //
    return {
      mergeData,
      stats,
    };
  },
  type: 'Test',
};
const everything = () => {
  const shiny = new CheckRackPositionStage();
  const results = shiny.execute('');
  // @ts-ignore
  gs.debug('<h2>stats</h2>');
  // @ts-ignore
  gs.debug(results.stats);
  // @ts-ignore
  gs.debug('<h2>mergeData</h2>');
  // @ts-ignore
  gs.debug(results.mergeData);
};
everything();
