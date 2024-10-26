//
//
//
//
//
//
// code for script include - start
//
// @ts-ignore
const Moomin = Class.create();
Moomin.prototype = {
  // is this needed?
  // initialize: function() {},
  main: (encodedQuery: string) => {
    //
    //
    const badData: Record<string, string> = {};
    const goodData: Record<string, string> = {};
    // nonsense code for testing
    badData['0001'] = encodedQuery;
    goodData['0001'] = encodedQuery;
    // standard return of badData and goodData
    return {
      badData,
      goodData,
    };
    //
    //
  },
  // is this needed?
  // type: 'Test'
};
//
// code for script include - end
//
//
//
//
//
//
const testScriptInclude = () => {
  //
  //
  const snorkMaiden = new Moomin();
  const allData = snorkMaiden.main('nameSTARTSWITHtesting');
  // @ts-ignore
  gs.debug(allData.badData);
  // @ts-ignore
  gs.debug(allData.goodData);
  //
  //
};
testScriptInclude();
