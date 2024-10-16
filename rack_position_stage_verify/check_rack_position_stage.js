"use strict";
//
// global variables
//
var assetData = {};
var finalData = {};
var problemRacks = {};
var rackData = {};
var uniqueAssetSysid = {};
//
//
var checkStateRetired = function (kaiju) {
    if (kaiju.assetInstallStatus === null) {
        if (kaiju.assetSubstatus === null) {
            if (kaiju.assetSysId === null) {
                if (kaiju.installStatus === '7') {
                    if (kaiju.uCablingInstalled === '0') {
                        if (kaiju.uCmdbCiStatus === 'Retired') {
                            if (kaiju.uPduInstalled === '0') {
                                if (kaiju.uTorInstalled === '0') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStageReadyToRecieveServer = function (kaiju) {
    if (kaiju.assetInstallStatus === '1') {
        if (kaiju.assetSubstatus === 'allocated') {
            if (kaiju.assetSysId !== null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCmdbCiStatus === 'Live') {
                        if (kaiju.uCablingInstalled === '1' && kaiju.uPduInstalled === '1' && kaiju.uTorInstalled === '0') {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStageRackBeingConfigured = function (kaiju) {
    if (kaiju.assetInstallStatus === '1') {
        if (kaiju.assetSubstatus === 'allocated') {
            if (kaiju.assetSysId !== null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCmdbCiStatus === 'Live') {
                        if (kaiju.uCablingInstalled === '1' || kaiju.uPduInstalled === '1' || kaiju.uTorInstalled === '1') {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStageLanded = function (kaiju) {
    if (kaiju.assetInstallStatus === '1') {
        if (kaiju.assetSubstatus === 'allocated') {
            if (kaiju.assetSysId !== null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCablingInstalled === '0') {
                        if (kaiju.uCmdbCiStatus === 'Live') {
                            if (kaiju.uPduInstalled === '0') {
                                if (kaiju.uTorInstalled === '0') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStagePendingLand = function (kaiju) {
    if (kaiju.assetInstallStatus === null) {
        if (kaiju.assetSubstatus === null) {
            if (kaiju.assetSysId === null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCablingInstalled === '0') {
                        if (kaiju.uCmdbCiStatus === 'Live') {
                            if (kaiju.uPduInstalled === '0') {
                                if (kaiju.uTorInstalled === '0') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStageMakeup = function (kaiju) {
    if (kaiju.assetInstallStatus === null) {
        if (kaiju.assetSubstatus === null) {
            if (kaiju.assetSysId === null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCablingInstalled === '0') {
                        if (kaiju.uCmdbCiStatus === 'Live') {
                            if (kaiju.uPduInstalled === '0') {
                                if (kaiju.uTorInstalled === '0') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStageUnavailable = function (kaiju) {
    if (kaiju.assetInstallStatus === null) {
        if (kaiju.assetSubstatus === null) {
            if (kaiju.assetSysId === null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCablingInstalled === '0') {
                        if (kaiju.uCmdbCiStatus === 'Live') {
                            if (kaiju.uPduInstalled === '0') {
                                if (kaiju.uTorInstalled === '0') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};
var checkStageUnusable = function (kaiju) {
    if (kaiju.assetInstallStatus === null) {
        if (kaiju.assetSubstatus === null) {
            if (kaiju.assetSysId === null) {
                if (kaiju.installStatus === '1') {
                    if (kaiju.uCablingInstalled === '0') {
                        if (kaiju.uCmdbCiStatus === 'Live') {
                            if (kaiju.uPduInstalled === '0') {
                                if (kaiju.uTorInstalled === '0') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
};
var testValid = function (kaiju) {
    if (kaiju.uRackPositionStage === 'unusable') {
        return checkStageUnusable(kaiju);
    }
    if (kaiju.uRackPositionStage === 'unavailabe') {
        return checkStageUnavailable(kaiju);
    }
    if (kaiju.uRackPositionStage === 'makeup') {
        return checkStageMakeup(kaiju);
    }
    if (kaiju.uRackPositionStage === 'pendingLand') {
        return checkStagePendingLand(kaiju);
    }
    if (kaiju.uRackPositionStage === 'landed') {
        return checkStageLanded(kaiju);
    }
    if (kaiju.uRackPositionStage === 'rackBeingConfigured') {
        return checkStageRackBeingConfigured(kaiju);
    }
    if (kaiju.uRackPositionStage === 'readyToRecieveServer') {
        return checkStageReadyToRecieveServer(kaiju);
    }
    if (kaiju.uRackPositionStage === 'retired') {
        return checkStateRetired(kaiju);
    }
    return false;
};
var findBadStages = function () {
    //
    var kaiju = null;
    //
    //
    Object.keys(finalData).forEach(function (rackSysId) {
        kaiju = finalData[rackSysId];
        if (!testValid(kaiju)) {
            problemRacks[rackSysId] = kaiju;
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
var main = function () {
    //
    var encodedQuery = '';
    //
    // https://godaddydev.service-now.com/now/nav/ui/classic/params/target/cmdb_ci_rack_list.do%3Fsysparm_query%3Dname%253DP3SJ01.01%255EORname%253DP3SJ01.02%255EORname%253DP3SJ01.03%255EORname%253DP3SJ01.04%255EORname%253DP3SJ01.05%255EORname%253DP3SJ01.06%255EORname%253DP3SJ01.07%255EORname%253DP3SJ01.08%255EORname%253DP3SJ01.09
    //
    encodedQuery = 'name=P3SJ01.01^ORname=P3SJ01.02^ORname=P3SJ01.03^ORname=P3SJ01.04^ORname=P3SJ01.05';
    encodedQuery += '^ORname=P3SJ01.06^ORname=P3SJ01.07^ORname=P3SJ01.08^ORname=P3SJ01.09^ORname=P3SJ01.10';
    //
    getRack(encodedQuery);
    getAsset();
    createFinalData();
    findBadStages();
    //
    gs.print(problemRacks);
};
//
main();
