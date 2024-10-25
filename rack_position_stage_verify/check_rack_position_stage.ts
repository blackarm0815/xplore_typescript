interface FinalData {
  assetInstallStatus: string | null;
  assetSubstatus: string | null;
  assetSysId: string | null;
  installStatus: string | null;
  name: string | null;
  uCablingInstalled: string | null;
  uCmdbCiStatus: string | null;
  uPduInstalled: string | null;
  uRackPositionStage: string | null;
  uTorInstalled: string | null;
}
//
// global variables
//
const assetData: Record<string, {
  installStatus: string | null,
  substatus: string | null,
}> = {};
const finalData: Record<string, FinalData> = {};
const badData: Record<string, {
  data: FinalData,
  failures: Array<string>,
}> = {};
const goodData: Record<string, FinalData> = {};
const rackData: Record<string, {
  assetSysId: string | null,
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
const checkStateRetired = (
  kaiju: FinalData,
) => {
  //
  const failures: Array<string> = [];
  let valid = true;
  //
  if (kaiju.assetInstallStatus !== null || kaiju.assetSubstatus !== null || kaiju.assetSysId !== null) {
    valid = false;
    failures.push('Has Asset');
  }
  if (kaiju.installStatus !== '7') {
    valid = false;
    failures.push('Install status is not retired');
  }
  if (kaiju.uCablingInstalled === '1') {
    valid = false;
    failures.push('Cabling installed is ticked');
  }
  if (kaiju.uCmdbCiStatus !== 'Retired') {
    valid = false;
    failures.push('Cmdb Ci Status is not retired');
  }
  if (kaiju.uPduInstalled === '1') {
    valid = false;
    failures.push('Pdu Installed is ticked');
  }
  if (kaiju.uTorInstalled === '1') {
    valid = false;
    failures.push('Tor Installed is ticked');
  }
  return {
    valid,
    failures,
  };
};

const checkStageReadyToRecieveServer = (
  kaiju: FinalData,
) => {
  //
  const failures: Array<string> = [];
  let valid = true;
  //
  if (kaiju.assetInstallStatus !== '1') {
    valid = false;
    failures.push('Asset Install Status is not Live');
  }
  if (kaiju.assetSubstatus !== 'allocated') {
    valid = false;
    failures.push('Asset Substatus is not allocated');
  }
  if (kaiju.assetSysId === null) {
    valid = false;
    failures.push('Asset missing');
  }
  if (kaiju.installStatus !== '1') {
    valid = false;
    failures.push('Install status is not Live');
  }
  if (kaiju.uCablingInstalled === '0') {
    valid = false;
    failures.push('Cabling installed is not ticked');
  }
  if (kaiju.uCmdbCiStatus !== 'Live') {
    valid = false;
    failures.push('Cmdb Ci Status is not Live');
  }
  if (kaiju.uPduInstalled === '0') {
    valid = false;
    failures.push('Pdu Installed is not ticked');
  }
  if (kaiju.uTorInstalled === '0') {
    valid = false;
    failures.push('Tor Installed is not ticked');
  }
  return {
    valid,
    failures,
  };
};

// const checkStageRackBeingConfigured = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === '1') {
//     if (kaiju.assetSubstatus === 'allocated') {
//       if (kaiju.assetSysId !== null) {
//         if (kaiju.installStatus === '1') {
//           if (kaiju.uCmdbCiStatus === 'Live') {
//       //       some of them are ticked
//             if (kaiju.uCablingInstalled === '1' || kaiju.uPduInstalled === '1' || kaiju.uTorInstalled === '1') {
//         //       some of them are unticked
//               if (kaiju.uCablingInstalled === '0' || kaiju.uPduInstalled === '0' || kaiju.uTorInstalled === '0') {
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

// const checkStageLanded = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === '1') {
//     if (kaiju.assetSubstatus === 'allocated') {
//       if (kaiju.assetSysId !== null) {
//         if (kaiju.installStatus === '1') {
//           if (kaiju.uCablingInstalled === '0') {
//             if (kaiju.uCmdbCiStatus === 'Live') {
//               if (kaiju.uPduInstalled === '0') {
//                 if (kaiju.uTorInstalled === '0') {
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

// const checkStagePendingLand = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//     if (kaiju.assetSubstatus === null) {
//       if (kaiju.assetSysId === null) {
//         if (kaiju.installStatus === '1') {
//           if (kaiju.uCablingInstalled === '0') {
//             if (kaiju.uCmdbCiStatus === 'Live') {
//               if (kaiju.uPduInstalled === '0') {
//                 if (kaiju.uTorInstalled === '0') {
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
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//     if (kaiju.assetSubstatus === null) {
//       if (kaiju.assetSysId === null) {
//         if (kaiju.installStatus === '1') {
//           if (kaiju.uCablingInstalled === '0') {
//             if (kaiju.uCmdbCiStatus === 'Live') {
//               if (kaiju.uPduInstalled === '0') {
//                 if (kaiju.uTorInstalled === '0') {
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
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//     if (kaiju.assetSubstatus === null) {
//       if (kaiju.assetSysId === null) {
//         if (kaiju.installStatus === '1') {
//           if (kaiju.uCablingInstalled === '0') {
//             if (kaiju.uCmdbCiStatus === 'Live') {
//               if (kaiju.uPduInstalled === '0') {
//                 if (kaiju.uTorInstalled === '0') {
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
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//     if (kaiju.assetSubstatus === null) {
//       if (kaiju.assetSysId === null) {
//         if (kaiju.installStatus === '1') {
//           if (kaiju.uCablingInstalled === '0') {
//             if (kaiju.uCmdbCiStatus === 'Live') {
//               if (kaiju.uPduInstalled === '0') {
//                 if (kaiju.uTorInstalled === '0') {
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

const testValid = (
  kaiju: FinalData,
) => {
  // if (kaiju.uRackPositionStage === 'unusable') {
  //   return checkStageUnusable(kaiju);
  // }
  // if (kaiju.uRackPositionStage === 'available') {
  //   return checkStageAvailable(kaiju);
  // }
  // if (kaiju.uRackPositionStage === 'makeup') {
  //   return checkStageMakeup(kaiju);
  // }
  // if (kaiju.uRackPositionStage === 'pendingLand') {
  //   return checkStagePendingLand(kaiju);
  // }
  // if (kaiju.uRackPositionStage === 'landed') {
  //   return checkStageLanded(kaiju);
  // }
  // if (kaiju.uRackPositionStage === 'rackBeingConfigured') {
  //   return checkStageRackBeingConfigured(kaiju);
  // }
  if (kaiju.uRackPositionStage === 'readyToReceiveServer') {
    return checkStageReadyToRecieveServer(kaiju);
  }
  if (kaiju.uRackPositionStage === 'retired') {
    return checkStateRetired(kaiju);
  }
  return {
    valid: false,
    failures: ['Rack Position Stage is missing or unrecognized'],
  };
};

const sortData = () => {
  //
  let kaiju: FinalData | null = null;
  let testResult: {
    failures: Array<string>,
    valid: boolean,
  };
  //
  //
  Object.keys(finalData).forEach((rackSysId) => {
    //
    // get the chunk of data being sorted
    kaiju = finalData[rackSysId];
    //
    // run it through the tests
    testResult = testValid(kaiju);
    //
    // sort into good data or bad data
    if (testResult.valid) {
      //
      // good data gets the original data
      goodData[rackSysId] = kaiju;
    } else {
      //
      // bad data gets the original data plus the reasons it failed
      badData[rackSysId] = {
        data: kaiju,
        failures: testResult.failures,
      };
    }
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
    testAssetSysId = rackData[rackSysId].assetSysId;
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
      assetSysId: testAssetSysId,
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
const getRack = (
  encodedQuery: string,
) => {
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
        assetSysId: testAssetSysId,
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
const report = () => {
  //
  let countBad = 0;
  let countGood = 0;
  let percentage = 0;
  let reportString = '';
  let total = 0;
  //
  countBad = Object.keys(badData).length;
  countGood = Object.keys(goodData).length;
  total = countBad + countGood;
  percentage = (countGood / total) * 100;
  //
  reportString += '\n\n\n\n';
  reportString += `Total good data = ${countGood}\n`;
  reportString += `Total bad data = ${countBad}\n`;
  reportString += `Pass rate = ${percentage}%\n`;
  reportString += '\n\n\n\n';
  // @ts-ignore
  gs.print(reportString);
  // @ts-ignore
  gs.print('\n\n\n\n');
  // @ts-ignore
  gs.print('Bad data');
  // @ts-ignore
  gs.print(badData);
  // @ts-ignore
  gs.print('\n\n\n\n');
  // @ts-ignore
  gs.print('Good data');
  // @ts-ignore
  gs.print(goodData);
  // @ts-ignore
  gs.print('\n\n\n\n');
};
//
main();
//
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //


// @ts-ignore
const networkAdapterVerifier = Class.create();
networkAdapterVerifier.prototype = {
  main(
    encodedQuery: string,
  ) {
    getRack(encodedQuery);
    getAsset();
    createFinalData();
    sortData();
    report();
  }
};