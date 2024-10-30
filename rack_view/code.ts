interface AssetData {
  modelSysId: string | null;
  parent: string | null;
  rackSysId: string;
  rackU: number | null;
  sleds: Record<string, AssetData>;
  slot: number | null;
}
interface GlideRecord {
  addEncodedQuery: any,
  addNotNullQuery: any;
  addQuery: any;
  getDisplayValue: any,
  getUniqueValue: any,
  getValue: any,
  next: any,
  query: any,
}
interface RackData {
  assets: Record<string, AssetData>;
  name: string | null;
  rack_units: number | null;
}
interface ModelData {
  deviceCategory: string | null;
  maxChildren: number | null;
  modelHeight: number | null;
}
interface PatchpanelData {
  modelSysId: string;
  patchName: string | null;
  rackSysId: string;
  rackU: number | null;
}
//
// code for script include - start
//
// @ts-ignore
const Kaiju = Class.create();
Kaiju.prototype = {
  initialize: function() {}, // eslint-disable-line
  execute: (encodedQuery: string) => {
    //
    const assetData: Record<string, AssetData> = {};
    const modelData: Record<string, ModelData> = {};
    const patchpanelData: Record<string, PatchpanelData> = {};
    const rackData: Record<string, RackData> = {};
    const uniqueModelSysId: Record<string, boolean> = {};
    const uniqueRackSysId: Record<string, boolean> = {};
    //
    const checkInteger = (
      testVariable: unknown,
    ) => {
      if (typeof testVariable === 'string') {
        if (!Number.isNaN(parseInt(testVariable, 10))) {
          return parseInt(testVariable, 10);
        }
      }
      return null;
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
    const getModel = () => {
      // @ts-ignore
      let grModel: GlideRecord;
      let tempModelSysId: string | null;
      if (Object.keys(uniqueModelSysId).length > 0) {
        // @ts-ignore
        grModel = new GlideRecord('cmdb_model');// eslint-disable-line
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
    const getPatchpanelData = () => {
      let grPatch: any;
      let modelSysId: string | null;
      let patchpanelSysId: string | null;
      let rackSysId: string | null;
      // @ts-ignore
      grPatch = new GlideRecord('u_patch_panel'); // eslint-disable-line
      grPatch.addQuery('u_rack', 'IN', Object.keys(uniqueRackSysId));
      grPatch.query();
      while (grPatch.next()) {
        modelSysId = checkString(grPatch.getValue('model_id'));
        patchpanelSysId = checkString(grPatch.getUniqueValue());
        rackSysId = checkString(grPatch.getValue('u_rack'));
        if (modelSysId !== null && patchpanelSysId !== null && rackSysId !== null) {
          patchpanelData[patchpanelSysId] = {
            modelSysId,
            patchName: checkString(grPatch.getValue('name')),
            rackSysId,
            rackU: checkInteger(grPatch.getValue('u_rack_u')),
          };
        }
        if (modelSysId !== null) {
          uniqueModelSysId[modelSysId] = true;
        }
      }
    };
    const getAsset = () => {
      let assetSysId: string | null;
      let grAsset: any;
      let modelSysId: string | null;
      let rackSysId: string | null;
      if (Object.keys(uniqueRackSysId).length > 0) {
        // @ts-ignore
        grAsset = new GlideRecord('alm_hardware'); // eslint-disable-line
        grAsset.addQuery('u_rack', 'IN', Object.keys(uniqueRackSysId));
        grAsset.query();
        while (grAsset.next()) {
          assetSysId = checkString(grAsset.getUniqueValue());
          modelSysId = checkString(grAsset.getValue('model'));
          rackSysId = checkString(grAsset.getValue('u_rack'));
          if (assetSysId !== null && rackSysId !== null) {
            assetData[assetSysId] = {
              modelSysId,
              parent: checkString(grAsset.getValue('parent')),
              rackSysId,
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
    const getRackData = () => {
      let grRack: any;
      let rackSysId: string | null;
      let rackName: string | null;
      let rackUnits: number | null;
      // @ts-ignore
      grRack = new GlideRecord('cmdb_ci_rack'); // eslint-disable-line
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
    const main = () => {
      getRackData();
      getAsset();
      getPatchpanelData();
      getModel();
    };
    //
    main();
    //
    return {
      assetData,
      modelData,
      patchpanelData,
      rackData,
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
const showData = (
  assetData: Record<string, AssetData>,
  modelData: Record<string, ModelData>,
  patchpanelData: Record<string, PatchpanelData>,
  rackData: Record<string, RackData>,
) => {
  // @ts-ignore
  gs.debug('<h2>assetData</h2>');
  // @ts-ignore
  gs.debug(assetData);
  // @ts-ignore
  gs.debug('<h2>modelData</h2>');
  // @ts-ignore
  gs.debug(modelData);
  // @ts-ignore
  gs.debug('<h2>patchpanelData</h2>');
  // @ts-ignore
  gs.debug(patchpanelData);
  // @ts-ignore
  gs.debug('<h2>rackData</h2>');
  // @ts-ignore
  gs.debug(rackData);
};
const getData = () => {
  //
  let encodedQuery = '';
  //
  // encoded query for the example racks
  encodedQuery = 'nameSTARTSWITHp3sj01.01^ORnameSTARTSWITHp3sj01.02^ORnameSTARTSWITHp3sj01.03';
  encodedQuery += '^ORnameSTARTSWITHp3sj01.04^ORnameSTARTSWITHp3sj01.05^ORnameSTARTSWITHp3sj01.06';
  encodedQuery += '^ORnameSTARTSWITHp3sj01.07^ORnameSTARTSWITHp3sj01.08^ORnameSTARTSWITHp3sj01.09';
  //
  // run the script include
  const shiny = new Kaiju();
  const results = shiny.execute(encodedQuery);
  //
  // extract the data from the results
  const assetData: Record<string, AssetData> = results.assetData;
  const modelData: Record<string, ModelData> = results.modelData;
  const patchpanelData: Record<string, PatchpanelData> = results.patchpanelData;
  const rackData: Record<string, RackData> = results.rackData;
  // const errors: Record<string, Record<string, boolean>> = results.errors;
  // const mergeData: Record<string, MergeData> = results.mergeData;
  // const stats: Stats = results.stats;
  //
  // show data
  showData(
    assetData,
    modelData,
    patchpanelData,
    rackData,
  );
};
getData();
