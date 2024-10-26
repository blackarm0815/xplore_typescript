// code for script include
// @ts-ignore
const Moomin = Class.create();
Moomin.prototype = {
  // is this needed?
  // initialize: function() {},
  everything: (encodedQuery: string) => {
    const badData: Record<string, string> = {};
    const goodData: Record<string, string> = {};
    badData[encodedQuery] = 'dogwater';
    goodData[encodedQuery] = 'sparkles';
    return {
      badData,
      goodData,
    };
  },
  // is this needed?
  // type: 'Test'
};
//
//
//
//
// code for testing in xplore
const main = () => {
  const snorkMaiden = new Moomin();
  const allData = snorkMaiden.everything('nameSTARTSWITHtesting');
  // @ts-ignore
  gs.debug(allData.badData);
  // @ts-ignore
  gs.debug(allData.goodData);
};
main();
