interface FinalData {
  assetInstallStatus: string | null;
  assetSubstatus: string | null;
  installStatus: string | null;
  name: string | null;
  uCablingInstalled: string | null;
  uCmdbCiStatus: string | null;
  uPduInstalled: string | null;
  uRackPositionStage: string | null;
  uTorInstalled: string | null;
}
//
//
// global variables
//
const assetData: Record<string, {
  installStatus: string | null,
  substatus: string | null,
}> = {};
const finalData: Record<string, FinalData> = {};
const rackData: Record<string, {
  asset: string | null,
  installStatus: string | null,
  name: string | null,
  uCablingInstalled: string | null,
  uCmdbCiStatus: string | null,
  uPduInstalled: string | null,
  uRackPositionStage: string | null,
  uTorInstalled: string | null,
}> = {};
const uniqueAssetSysid: Record<string, boolean> = {};
//
//
// functions
//
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
const createFinalData = () => {
//
  let testAssetInstallStatus: string | null = null;
  let testAssetSubstatus: string | null = null;
  let testAssetSysId: string | null = null;
  //
  Object.keys(rackData).forEach((rackSysId) => {
    //
    // find asset install_status and substatus
    testAssetInstallStatus = null;
    testAssetSubstatus = null;
    testAssetSysId = rackData[rackSysId].asset;
    // was there an asset
    if (testAssetSysId !== null) {
      // was asset data found
      if (Object.prototype.hasOwnProperty.call(assetData, testAssetSysId)) {
        testAssetInstallStatus = assetData[testAssetSysId].installStatus;
        testAssetSubstatus = assetData[testAssetSysId].substatus;
      }
    }
    finalData[rackSysId] = {
      assetInstallStatus: testAssetInstallStatus,
      assetSubstatus: testAssetSubstatus,
      installStatus: rackData[rackSysId].installStatus,
      name: rackData[rackSysId].name,
      uCablingInstalled: rackData[rackSysId].uCablingInstalled,
      uCmdbCiStatus: rackData[rackSysId].uCmdbCiStatus,
      uPduInstalled: rackData[rackSysId].uPduInstalled,
      uRackPositionStage: rackData[rackSysId].uRackPositionStage,
      uTorInstalled: rackData[rackSysId].uTorInstalled,
    };
  });
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
        installStatus: checkString(grAsset.install_status.getValue()),
        substatus: checkString(grAsset.substatus.getValue()),
      };
    }
  }
};
const getRack = () => {
  //
  let sysId: string | null = null;
  let testAssetSysId: string | null = null;
  let testRacks = '';
  //
  testRacks = 'name=P3SJ01.01^ORname=P3SJ01.02^ORname=P3SJ01.03^ORname=P3SJ01.04^ORname=P3SJ01.05';
  testRacks += '^ORname=P3SJ01.06^ORname=P3SJ01.07^ORname=P3SJ01.08^ORname=P3SJ01.09^ORname=P3SJ01.10'
  //
  // @ts-ignore
  const grRack = new GlideRecord('cmdb_ci_rack');
  grRack.addEncodedQuery(testRacks);
  grRack.query();
  while (grRack.next()) {
    sysId = checkString(grRack.getUniqueValue());
    testAssetSysId = checkString(grRack.asset.getValue());
    //
    // store the rack data
    if (sysId !== null) {
      rackData[sysId] = {
        asset: testAssetSysId,
        installStatus: checkString(grRack.install_status.getValue()),
        name: checkString(grRack.name.getValue()),
        uRackPositionStage: checkString(grRack.u_rack_position_stage.getValue()),
        uCablingInstalled: checkString(grRack.u_cabling_installed.getValue()),
        uCmdbCiStatus: checkString(grRack.u_cmdb_ci_status.getDisplayValue()),
        uPduInstalled: checkString(grRack.u_pdu_installed.getValue()),
        uTorInstalled: checkString(grRack.u_tor_installed.getValue()),
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
  createFinalData();
};
//
main();
// @ts-ignore
gs.print(finalData);
