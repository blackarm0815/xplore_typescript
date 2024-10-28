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
const ThingThatNeedsNaming = Class.create();
ThingThatNeedsNaming.prototype = {
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
    const storeError = (
      errorMessage: string,
      rackSysId: string,
    ) => {
      if (!Object.prototype.hasOwnProperty.call(errors, rackSysId)) {
        errors[rackSysId] = {};
      }
      errors[rackSysId][errorMessage] = true;
    };
    // const checkStageRackBeingConfigured = (
    //   rawDataChunk: RawData,
    // ) => {
    //   if (rawDataChunk.asset_install_status === '1') {
    //     if (rawDataChunk.asset_substatus === 'allocated') {
    //       if (rawDataChunk.asset_sys_id !== null) {
    //         if (rawDataChunk.rack_install_status === '1') {
    //           if (rawDataChunk.rack_u_cmdb_ci_status === 'Live') {
    //       //       some of them are ticked
    //             if (rawDataChunk.rack_u_cabling_installed === '1' || rawDataChunk.rack_u_pdu_installed === '1' || rawDataChunk.rack_u_tor_installed === '1') {
    //         //       some of them are unticked
    //               if (rawDataChunk.rack_u_cabling_installed === '0' || rawDataChunk.rack_u_pdu_installed === '0' || rawDataChunk.rack_u_tor_installed === '0') {
    //                 return true;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false;
    // };
    // const checkStagePendingLand = (
    //   rawDataChunk: RawData,
    // ) => {
    //   if (rawDataChunk.asset_install_status === null) {
    //     if (rawDataChunk.asset_substatus === null) {
    //       if (rawDataChunk.asset_sys_id === null) {
    //         if (rawDataChunk.rack_install_status === '1') {
    //           if (rawDataChunk.rack_u_cabling_installed === '0') {
    //             if (rawDataChunk.rack_u_cmdb_ci_status === 'Live') {
    //               if (rawDataChunk.rack_u_pdu_installed === '0') {
    //                 if (rawDataChunk.rack_u_tor_installed === '0') {
    //                   return true;
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false;
    // };
    // const checkStageMakeup = (
    //   rawDataChunk: RawData,
    // ) => {
    //   if (rawDataChunk.asset_install_status === null) {
    //     if (rawDataChunk.asset_substatus === null) {
    //       if (rawDataChunk.asset_sys_id === null) {
    //         if (rawDataChunk.rack_install_status === '1') {
    //           if (rawDataChunk.rack_u_cabling_installed === '0') {
    //             if (rawDataChunk.rack_u_cmdb_ci_status === 'Live') {
    //               if (rawDataChunk.rack_u_pdu_installed === '0') {
    //                 if (rawDataChunk.rack_u_tor_installed === '0') {
    //                   return true;
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false;
    // };
    // const checkStageAvailable = (
    //   rawDataChunk: RawData,
    // ) => {
    //   if (rawDataChunk.asset_install_status === null) {
    //     if (rawDataChunk.asset_substatus === null) {
    //       if (rawDataChunk.asset_sys_id === null) {
    //         if (rawDataChunk.rack_install_status === '1') {
    //           if (rawDataChunk.rack_u_cabling_installed === '0') {
    //             if (rawDataChunk.rack_u_cmdb_ci_status === 'Live') {
    //               if (rawDataChunk.rack_u_pdu_installed === '0') {
    //                 if (rawDataChunk.rack_u_tor_installed === '0') {
    //                   return true;
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false;
    // };
    // const checkStageUnusable = (
    //   rawDataChunk: RawData,
    // ) => {
    //   if (rawDataChunk.asset_install_status === null) {
    //     if (rawDataChunk.asset_substatus === null) {
    //       if (rawDataChunk.asset_sys_id === null) {
    //         if (rawDataChunk.rack_install_status === '1') {
    //           if (rawDataChunk.rack_u_cabling_installed === '0') {
    //             if (rawDataChunk.rack_u_cmdb_ci_status === 'Live') {
    //               if (rawDataChunk.rack_u_pdu_installed === '0') {
    //                 if (rawDataChunk.rack_u_tor_installed === '0') {
    //                   return true;
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return false;
    // };
    const checkStateRetired = (
      rawDataChunk: RawData,
    ) => {
      if (rawDataChunk.rack_u_rack_position_stage === 'retired') {
        if (rawDataChunk.asset_install_status !== null || rawDataChunk.asset_substatus !== null || rawDataChunk.asset_sys_id !== null) {
          storeError('Retired - Has Asset', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_install_status !== '7') {
          storeError('Retired - Install status is not retired', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_cabling_installed === '1') {
          storeError('Retired - Cabling installed is ticked', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_cmdb_ci_status !== 'Retired') {
          storeError('Retired - Cmdb Ci Status is not retired', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_pdu_installed === '1') {
          storeError('Retired - Pdu Installed is ticked', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_tor_installed === '1') {
          storeError('Retired - Tor Installed is ticked', rawDataChunk.rack_sys_id);
        }
      }
    };
    const checkStageReadyToRecieveServer = (
      rawDataChunk: RawData,
    ) => {
      if (rawDataChunk.rack_u_rack_position_stage === 'readyToReceiveServer') {
        if (rawDataChunk.asset_install_status !== '1') {
          storeError('Ready To Recieve Server - Asset Install Status is not Live', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.asset_substatus !== 'allocated') {
          storeError('Ready To Recieve Server - Asset Substatus is not allocated', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.asset_sys_id === null) {
          storeError('Ready To Recieve Server - Asset missing', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_install_status !== '1') {
          storeError('Ready To Recieve Server - Install status is not Live', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_cabling_installed === '0') {
          storeError('Ready To Recieve Server - Cabling installed is not ticked', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Ready To Recieve Server - Cmdb Ci Status is not Live', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_pdu_installed === '0') {
          storeError('Ready To Recieve Server - Pdu Installed is not ticked', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_tor_installed === '0') {
          storeError('Ready To Recieve Server - Tor Installed is not ticked', rawDataChunk.rack_sys_id);
        }
      }
    };
    const checkStageLanded = (
      rawDataChunk: RawData,
    ) => {
      if (rawDataChunk.rack_u_rack_position_stage === 'landed') {
        if (rawDataChunk.asset_install_status !== '1') {
          storeError('Landed - asset_install_status is not 1', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.asset_substatus !== 'allocated') {
          storeError('Landed - asset_substatus is not allocated', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.asset_sys_id === null) {
          storeError('Landed - asset missing', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_install_status !== '1') {
          storeError('Landed - rack_install_status is not 1', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_cabling_installed !== '0') {
          storeError('Landed - rack_u_cabling_installed is not 0', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_cmdb_ci_status !== 'Live') {
          storeError('Landed - rack_u_cmdb_ci_status is not Live', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_pdu_installed !== '0') {
          storeError('Landed - rack_u_pdu_installed is not 0', rawDataChunk.rack_sys_id);
        }
        if (rawDataChunk.rack_u_tor_installed !== '0') {
          storeError('Landed - rack_u_tor_installed is not 0', rawDataChunk.rack_sys_id);
        }
      }
    };
    const checkEmpty = (
      rawDataChunk: RawData,
    ) => {
      if (rawDataChunk.rack_u_rack_position_stage === null) {
        storeError('Empty - rack position stage is missing', rawDataChunk.rack_sys_id);
      }
    };
    const testRawData = () => {
      Object.keys(rawData).forEach((rackSysId) => {
        checkStageLanded(rawData[rackSysId]);
        checkEmpty(rawData[rackSysId]);
        checkStageReadyToRecieveServer(rawData[rackSysId]);
        checkStateRetired(rawData[rackSysId]);
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
    const createRawData = () => {
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
        testAssetSysId = rackData[rackSysId].asset_sys_id;
        // was there an asset
        if (testAssetSysId !== null) {
          // was asset data found
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
      grRack.addEncodedQuery(encodedQuery);
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
  // https://godaddydev.service-now.com/now/nav/ui/classic/params/target/cmdb_ci_rack_list.do%3Fsysparm_query%3DnameSTARTSWITHp3sj01.01%255EORnameSTARTSWITHp3sj01.02%255EORnameSTARTSWITHp3sj01.03%255EORnameSTARTSWITHp3sj01.04%255EORnameSTARTSWITHp3sj01.05%255EORnameSTARTSWITHp3sj01.06%255EORnameSTARTSWITHp3sj01.07%255EORnameSTARTSWITHp3sj01.08%255EORnameSTARTSWITHp3sj01.09%26sysparm_first_row%3D1%26sysparm_view%3D
  //
  const shiny = new ThingThatNeedsNaming();
  const results = shiny.execute('nameSTARTSWITHp3sj01.01^ORnameSTARTSWITHp3sj01.02^ORnameSTARTSWITHp3sj01.03^ORnameSTARTSWITHp3sj01.04^ORnameSTARTSWITHp3sj01.05^ORnameSTARTSWITHp3sj01.06^ORnameSTARTSWITHp3sj01.07^ORnameSTARTSWITHp3sj01.08^ORnameSTARTSWITHp3sj01.09');
  //
  // @ts-ignore
  gs.debug('\n\n***********\n** stats **\n***********\n');
  // @ts-ignore
  gs.debug(results.stats);
  // @ts-ignore
  gs.debug('\n\n************\n** errors **\n************\n');
  // @ts-ignore
  gs.debug(results.errors);
  // @ts-ignore
  gs.debug('\n\n*************\n** rawData **\n*************\n');
  // @ts-ignore
  gs.debug(results.rawData);
};
testing();
