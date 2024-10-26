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
  engage: (encodedQuery: string) => {
    // there is only one function, engage()
    // it will always be called this
    // all datastructures will exist in the scope of engage()
    // all functions will exist in the scope of engage()
    // data will be returned from the scope of engage()
    //
    const badData: Record<string, {
      data: {
        number_field: number | null,
        string_field: string | null,
      },
      failures: Record<string, boolean>,
      url: string,
    }> = {};
    const goodData: Record<string, {
      number_field: number,
      string_field: string,
    }> = {};
    //
    const main = () => {
      //
      const fakeSysId1 = 'd317aed433a95210702121c91e5c7aaa';
      const fakeSysId2 = 'd317aed433a95210702121c91e5c7aab';
      const fakeSysId3 = 'd317aed433a95210702121c91e5c7aac';
      const fakeSysId4 = 'd317aed433a95210702121c91e5c7aad';
      let urlStart = '';
      //
      // @ts-ignore
      urlStart = gs.getProperty('glide.servlet.uri');
      badData[fakeSysId1] = {
        failures: {
          'string_field issue': true,
          'puny god': true,
        },
        data: {
          number_field: 5,
          string_field: null,
        },
        url: `${urlStart}alm_hardware.do?sys_id=${fakeSysId1}`,
      };
      badData[fakeSysId2] = {
        failures: {
          'number_field issue': true,
        },
        data: {
          number_field: null,
          string_field: `foo_${encodedQuery}`,
        },
        url: `${urlStart}alm_hardware.do?sys_id=${fakeSysId2}`,
      };
      //
      goodData[fakeSysId3] = {
        number_field: 4,
        string_field: `foo_${encodedQuery}`,
      };
      goodData[fakeSysId4] = {
        number_field: 0,
        string_field: `blah_${encodedQuery}`,
      };
      //
    };
    //
    main();
    //
    return {
      badData,
      goodData,
    };
    //
  },
  type: 'Test',
};
//
// code for script include - end
//
const report = (
  countBad: number,
  countGood: number,
) => {
  //
  let percentage = 0;
  let reportString = '';
  let total = 0;
  //
  total = countBad + countGood;
  percentage = (countGood / total) * 100;
  //
  reportString += '\n\n';
  reportString += `Total good data = ${countGood}\n`;
  reportString += `Total bad data = ${countBad}\n`;
  reportString += `Pass rate = ${percentage}%\n`;
  reportString += '\n\n';
  // @ts-ignore
  gs.print(reportString);
};
const testCode = () => {
  //
  let countBad = 0;
  let countGood = 0;

  let badData: Record<string, {
    data: {
      number_field: number | null;
      string_field: string | null;
    },
    failures: Record<string, boolean>,
    url: string,
  }> | null = null;
  let goodData: Record<string, {
    number_field: number;
    string_field: string;
  }> | null = null;
  //
  const kaiju = new ThingThatNeedsNaming();
  const results = kaiju.engage('nameSTARTSWITHtesting');
  badData = results.badData;
  goodData = results.goodData;
  if (badData !== null && goodData !== null) {
    countBad = Object.keys(badData).length;
    countGood = Object.keys(goodData).length;
    report(countBad, countGood);
  }
  // @ts-ignore
  gs.debug(results.goodData);
  // @ts-ignore
  gs.debug(results.badData);
};
testCode();
