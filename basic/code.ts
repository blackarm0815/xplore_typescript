interface RawData {
  apples: number | null;
  bananas: number | null;
  carrots: number | null;
  name: string | null;
}
//
// code for script include - start
//
// @ts-ignore
const ThingThatNeedsNaming = Class.create();
ThingThatNeedsNaming.prototype = {
  //
  // this might need to be uncommented if this code is run in an actual script include
  // initialize: function() {},
  //
  execute: (encodedQuery: string) => {
    //
    // all datastructures will exist in the scope of execute()
    // all functions will exist in the scope of execute()
    // data will be returned from the scope of execute()
    //
    const errors: Record<string, Record<string, boolean>> = {};
    const rawData: Record<string, RawData> = {};
    //
    const main = () => {
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
    //
    main();
    //
    return {
      rawData,
      errors,
    };
    //
  },
  type: 'Test',
};
//
// code for script include - end
//
const report = (
  errors: Record<string, Record<string, boolean>>,
  rawData: Record<string, RawData>,
) => {
  //
  let countBad = 0;
  let percentage = 0;
  let reportString = '';
  let total = 0;
  //
  countBad = Object.keys(errors).length;
  total = Object.keys(rawData).length;
  percentage = ((total - countBad) / total) * 100;
  reportString = '\n\n***********\n** stats **\n***********\n\n';
  reportString += `Total errors = ${countBad}\n`;
  reportString += `Total rawData = ${total}\n`;
  reportString += `Pass rate = ${percentage}%\n`;
  reportString += '\n\n';
  // @ts-ignore
  gs.print(reportString);
  // @ts-ignore
  gs.debug('\n\n************\n** errors **\n************\n');
  // @ts-ignore
  gs.debug(errors);
  // @ts-ignore
  gs.debug('\n\n*************\n** rawData **\n*************\n');
  // @ts-ignore
  gs.debug(rawData);
};
const testCode = () => {
  //
  let rawData: Record<string, RawData> = {};
  let errors: Record<string, Record<string, boolean>> = {};
  //
  //
  //
  const kaiju = new ThingThatNeedsNaming();
  const results = kaiju.execute('glide record encoded query goes here');
  //
  //
  //
  errors = results.errors;
  rawData = results.rawData;
  report(errors, rawData);
};
testCode();
