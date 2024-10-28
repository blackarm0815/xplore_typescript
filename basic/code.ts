interface RawData {
  apples: number | null;
  bananas: number | null;
  carrots: number | null;
  name: string | null;
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
    // all datastructures will exist in the scope of execute()
    // all functions will exist in the scope of execute()
    // data will be returned from the scope of execute()
    //
    const errors: Record<string, Record<string, boolean>> = {};
    const rawData: Record<string, RawData> = {};
    let stats: Stats = {
      total_errors: 0,
      total_rawData: 0,
      pass_rate: 0,
    };
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
    const makeFakeData = () => {
      //
      const fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      const fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      const fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      const fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      //
      rawData[fakeSysId1] = {
        apples: 1,
        bananas: 3,
        carrots: null,
        name: 'blah',
      };
      errors[fakeSysId1] = {};
      errors[fakeSysId1].data_quality_carrots = true;
      rawData[fakeSysId2] = {
        apples: 1,
        bananas: null,
        carrots: 3,
        name: null,
      };
      errors[fakeSysId2] = {};
      errors[fakeSysId2].data_quality_bananas = true;
      errors[fakeSysId2].data_quality_name = true;
      rawData[fakeSysId3] = {
        apples: 1,
        bananas: 2,
        carrots: 3,
        name: 'foo',
      };
      rawData[fakeSysId4] = {
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
      rawData,
      stats,
    };
    //
  },
  type: 'Test',
};
//
// code for script include - end
//
const testing = () => {
  //
  const shiny = new ThingThatNeedsNaming();
  const results = shiny.execute('glideRecordEncodedQueryGoesHere');
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
