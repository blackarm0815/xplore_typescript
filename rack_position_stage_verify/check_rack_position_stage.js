"use strict";
//
// global variables
//
var assetData = {};
var finalData = {};
var badData = {};
var goodData = {};
var rackData = {};
var uniqueAssetSysid = {};
//
//
var checkStateRetired = function (kaiju) {
  //
  var failures = [];
  var valid = true;
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
    valid: valid,
    failures: failures,
  };
};
var checkStageReadyToRecieveServer = function (kaiju) {
  //
  var failures = [];
  var valid = true;
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
    valid: valid,
    failures: failures,
  };
};
// const checkStageRackBeingConfigured = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === '1') {
//   if (kaiju.assetSubstatus === 'allocated') {
//     if (kaiju.assetSysId !== null) {
//     if (kaiju.installStatus === '1') {
//       if (kaiju.uCmdbCiStatus === 'Live') {
//     //     some of them are ticked
//       if (kaiju.uCablingInstalled === '1' || kaiju.uPduInstalled === '1' || kaiju.uTorInstalled === '1') {
//     //     some of them are unticked
//         if (kaiju.uCablingInstalled === '0' || kaiju.uPduInstalled === '0' || kaiju.uTorInstalled === '0') {
//         return true;
//         }
//       }
//       }
//     }
//     }
//   }
//   }
//   return false;
// };
// const checkStageLanded = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === '1') {
//   if (kaiju.assetSubstatus === 'allocated') {
//     if (kaiju.assetSysId !== null) {
//     if (kaiju.installStatus === '1') {
//       if (kaiju.uCablingInstalled === '0') {
//       if (kaiju.uCmdbCiStatus === 'Live') {
//         if (kaiju.uPduInstalled === '0') {
//         if (kaiju.uTorInstalled === '0') {
//           return true;
//         }
//         }
//       }
//       }
//     }
//     }
//   }
//   }
//   return false;
// };
// const checkStagePendingLand = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//   if (kaiju.assetSubstatus === null) {
//     if (kaiju.assetSysId === null) {
//     if (kaiju.installStatus === '1') {
//       if (kaiju.uCablingInstalled === '0') {
//       if (kaiju.uCmdbCiStatus === 'Live') {
//         if (kaiju.uPduInstalled === '0') {
//         if (kaiju.uTorInstalled === '0') {
//           return true;
//         }
//         }
//       }
//       }
//     }
//     }
//   }
//   }
//   return false;
// };
// const checkStageMakeup = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//   if (kaiju.assetSubstatus === null) {
//     if (kaiju.assetSysId === null) {
//     if (kaiju.installStatus === '1') {
//       if (kaiju.uCablingInstalled === '0') {
//       if (kaiju.uCmdbCiStatus === 'Live') {
//         if (kaiju.uPduInstalled === '0') {
//         if (kaiju.uTorInstalled === '0') {
//           return true;
//         }
//         }
//       }
//       }
//     }
//     }
//   }
//   }
//   return false;
// };
// const checkStageAvailable = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//   if (kaiju.assetSubstatus === null) {
//     if (kaiju.assetSysId === null) {
//     if (kaiju.installStatus === '1') {
//       if (kaiju.uCablingInstalled === '0') {
//       if (kaiju.uCmdbCiStatus === 'Live') {
//         if (kaiju.uPduInstalled === '0') {
//         if (kaiju.uTorInstalled === '0') {
//           return true;
//         }
//         }
//       }
//       }
//     }
//     }
//   }
//   }
//   return false;
// };
// const checkStageUnusable = (
//   kaiju: FinalData,
// ) => {
//   if (kaiju.assetInstallStatus === null) {
//   if (kaiju.assetSubstatus === null) {
//     if (kaiju.assetSysId === null) {
//     if (kaiju.installStatus === '1') {
//       if (kaiju.uCablingInstalled === '0') {
//       if (kaiju.uCmdbCiStatus === 'Live') {
//         if (kaiju.uPduInstalled === '0') {
//         if (kaiju.uTorInstalled === '0') {
//           return true;
//         }
//         }
//       }
//       }
//     }
//     }
//   }
//   }
//   return false;
// };
var testValid = function (kaiju) {
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
var sortData = function () {
  //
  var kaiju = null;
  var testResult;
  //
  //
  Object.keys(finalData).forEach(function (rackSysId) {
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
    }
    else {
      //
      // bad data gets the original data plus the reasons it failed
      badData[rackSysId] = {
        data: kaiju,
        failures: testResult.failures,
      };
    }
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
var createFinalData = function () {
  //
  var testAssetInstallStatus = null;
  var testAssetSubstatus = null;
  var testAssetSysId = null;
  //
  Object.keys(rackData).forEach(function (rackSysId) {
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
        installStatus: checkString(grAsset.install_status.getValue()),
        substatus: checkString(grAsset.substatus.getValue()),
      };
    }
  }
};
var getRack = function (encodedQuery) {
  //
  var sysId = null;
  var testAssetSysId = null;
  //
  var grRack = new GlideRecord('cmdb_ci_rack');
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
var report = function () {
  //
  var countBad = 0;
  var countGood = 0;
  var percentage = 0;
  var reportString = '';
  var total = 0;
  //
  countBad = Object.keys(badData).length;
  countGood = Object.keys(goodData).length;
  total = countBad + countGood;
  percentage = (countGood / total) * 100;
  //
  reportString += '\n\n\n\n';
  reportString += "Total good data = ".concat(countGood, "\n");
  reportString += "Total bad data = ".concat(countBad, "\n");
  reportString += "Pass rate = ".concat(percentage, "%\n");
  reportString += '\n\n\n\n';
  gs.print(reportString);
  gs.print('\n\n\n\n');
  gs.print('Bad data');
  gs.print(badData);
  gs.print('\n\n\n\n');
  gs.print('Good data');
  gs.print(goodData);
  gs.print('\n\n\n\n');
};
var main = function () {
  //
  var encodedQuery = '';
  //
  // room view
  // https://godaddydev.service-now.com/sp?id=room_view&sys_id=1ca188a9db71c7442b56541adc961915
  //
  // cmdb_ci_rack list
  // https://godaddydev.service-now.com/now/nav/ui/classic/params/target/cmdb_ci_rack_list.do%3Fsysparm_query%3Dname%253DP3SJ01.01%255EORname%253DP3SJ01.02%255EORname%253DP3SJ01.03%255EORname%253DP3SJ01.04%255EORname%253DP3SJ01.05%255EORname%253DP3SJ01.06%255EORname%253DP3SJ01.07%255EORname%253DP3SJ01.08%255EORname%253DP3SJ01.09
  //
  // encodedQuery = 'name=P3SJ01.02^ORname=P3SJ01.03^ORname=P3SJ01.04^ORname=P3SJ01.05';
  // encodedQuery += '^ORname=P3SJ01.06^ORname=P3SJ01.07^ORname=P3SJ01.08^ORname=P3SJ01.09';
  encodedQuery = 'nameSTARTSWITHa2sa';
  //
  getRack(encodedQuery);
  getAsset();
  createFinalData();
  sortData();
  report();
};
//
main();
