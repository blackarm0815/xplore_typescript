interface MergeData {
  apples: number | null;
  bananas: number | null;
  carrots: number | null;
  name: string | null;
}
interface Stats {
  pass_rate: number;
  total_errors: number;
  total_mergeData: number;
}
//
// code for script include - start
//
// @ts-ignore
const ScriptIncludeThing = Class.create();
ScriptIncludeThing.prototype = {
  initialize: function() {}, // eslint-disable-line
  execute: (encodedQuery: string) => {
    //
    // all datastructures will exist in the scope of execute()
    // all functions will exist in the scope of execute()
    // data will be returned from the scope of execute()
    //
    const errors: Record<string, Record<string, boolean>> = {};
    const mergeData: Record<string, MergeData> = {};
    let stats: Stats = {
      total_errors: 0,
      total_mergeData: 0,
      pass_rate: 0,
    };
    //
    const makeStats = () => {
      let passRate = 0;
      let totalErrors = 0;
      let totalMergeData = 0;
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
    const makeFakeData = () => {
      //
      const fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      const fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      const fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      const fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      //
      mergeData[fakeSysId1] = {
        apples: 1,
        bananas: 3,
        carrots: null,
        name: 'blah',
      };
      errors[fakeSysId1] = {};
      errors[fakeSysId1].data_quality_carrots = true;
      mergeData[fakeSysId2] = {
        apples: 1,
        bananas: null,
        carrots: 3,
        name: null,
      };
      errors[fakeSysId2] = {};
      errors[fakeSysId2].data_quality_bananas = true;
      errors[fakeSysId2].data_quality_name = true;
      mergeData[fakeSysId3] = {
        apples: 1,
        bananas: 2,
        carrots: 3,
        name: 'foo',
      };
      mergeData[fakeSysId4] = {
        apples: 3,
        bananas: 2,
        carrots: 1,
        name: encodedQuery,
      };
    };
    const main = () => {
      makeFakeData();
      makeStats();
    };
    //
    main();
    //
    return {
      errors,
      mergeData,
      stats,
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
  errors: Record<string, Record<string, boolean>>,
  mergeData: Record<string, MergeData>,
  stats: Stats,
) => {
  // @ts-ignore
  gs.debug('<h2>stats</h2>');
  // @ts-ignore
  gs.debug(stats);
  // @ts-ignore
  gs.debug('<h2>errors</h2>');
  // @ts-ignore
  gs.debug(errors);
  // @ts-ignore
  gs.debug('<h2>mergeData</h2>');
  // @ts-ignore
  gs.debug(mergeData);
};
const getData = () => {
  //
  const encodedQuery = '';
  //
  // run the script include
  const shiny = new ScriptIncludeThing();
  const results = shiny.execute(encodedQuery);
  //
  // extract the data from the results
  const errors: Record<string, Record<string, boolean>> = results.errors;
  const mergeData: Record<string, MergeData> = results.mergeData;
  const stats: Stats = results.stats;
  //
  // show data
  showData(
    errors,
    mergeData,
    stats,
  );
};
getData();
