interface GoodData {
  number_field: number;
  string_field: string;
}
interface BadData {
  errors: Record<string, boolean>;
  number_field: number | null;
  string_field: string | null;
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
  main: (encodedQuery: string) => {
    // there is only one function, main()
    // it will always be called this
    // all datastructures will exist in the scope of main()
    // all functions will exist in the scope of main()
    // data will be returned from the scope of main()
    //
    const badData: Record<string, BadData> = {};
    const goodData: Record<string, GoodData> = {};
    //
    const engage = () => {
      //
      const fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      const fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      const fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      const fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      //
      // @ts-ignore
      badData[fakeSysId1] = {
        errors: {
          'string_field issue': true,
          'puny god': true,
        },
        number_field: 5,
        string_field: null,
      };
      badData[fakeSysId2] = {
        errors: {
          'number_field issue': true,
        },
        number_field: null,
        string_field: `foo_${encodedQuery}`,
      };
      goodData[fakeSysId3] = {
        number_field: 4,
        string_field: `foo_${encodedQuery}`,
      };
      goodData[fakeSysId4] = {
        number_field: 0,
        string_field: `blah_${encodedQuery}`,
      };
    };
    engage();
    return {
      badData,
      goodData,
    };
  },
  type: 'Test',
};
//
// code for script include - end
//
const report = (
  badData: Record<string, BadData>,
  goodData: Record<string, GoodData>,
) => {
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
  reportString += '\n\n';
  reportString += `Total good data = ${countGood}\n`;
  reportString += `Total bad data = ${countBad}\n`;
  reportString += `Pass rate = ${percentage}%\n`;
  reportString += '\n\n';
  // @ts-ignore
  gs.print(reportString);
  // @ts-ignore
  gs.debug(goodData);
  // @ts-ignore
  gs.debug(badData);
};
const testCode = () => {
  let badData: Record<string, BadData> = {};
  let goodData: Record<string, GoodData> = {};
  const kaiju = new ThingThatNeedsNaming();
  const results = kaiju.main('nameSTARTSWITHtesting');
  badData = results.badData;
  goodData = results.goodData;
  report(badData, goodData);
};
testCode();
