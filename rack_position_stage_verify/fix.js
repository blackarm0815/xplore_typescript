var gr;
var assetSysId = '';

// p3sj01.02 unusable
gr = new GlideRecord('cmdb_ci_rack');
gr.get('b817db4edb168bc010b6f1561d961914');
gr.asset = '';
gr.install_status = "1";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "0";
gr.uTorInstalled = "0"
gr.update();

// p3sj01.03 available
gr = new GlideRecord('cmdb_ci_rack');
gr.get('f4738c21dbb1c7442b56541adc96196a');
gr.asset = '';
gr.install_status = "1";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "0";
gr.uTorInstalled = "0"
gr.update();

// p3sj01.04 makeup
gr = new GlideRecord('cmdb_ci_rack');
gr.get('b1c34461dbb1c7442b56541adc96198f');
gr.asset = '';
gr.install_status = "1";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "0";
gr.uTorInstalled = "0"
gr.update();

// p3sj01.05 pendingLand
gr = new GlideRecord('cmdb_ci_rack');
gr.get('efd3cc61dbb1c7442b56541adc961978');
gr.asset = '';
gr.install_status = "1";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "0";
gr.uTorInstalled = "0"
gr.update();

// p3sj01.06 landed
gr = new GlideRecord('cmdb_ci_rack');
gr.get('bdba2b74db271788259e5898dc9619a4');
assetSysId = gr.asset.getValue();
gr.install_status = "1";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "0";
gr.uTorInstalled = "0"
gr.update();

gr = new GlideRecord('alm_hardware');
gr.get(assetSysId);
gr.install_status = '1';
gr.substatus = 'allocated';
gr.update();

// p3sj01.07 rackBeingConfigured
gr = new GlideRecord('cmdb_ci_rack');
gr.get('3abaa3f4db271788259e5898dc9619ab');
assetSysId = gr.asset.getValue();
gr.install_status = "1";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "0";
gr.uTorInstalled = "1"
gr.update();

gr = new GlideRecord('alm_hardware');
gr.get(assetSysId);
gr.install_status = '1';
gr.substatus = 'allocated';
gr.update();

// p3sj01.08 readyToReceiveServer
gr = new GlideRecord('cmdb_ci_rack');
gr.get('3bba63f4db271788259e5898dc961971');
assetSysId = gr.asset.getValue();
gr.install_status = "1";
gr.uCablingInstalled = "1";
gr.uCmdbCiStatus = "Live";
gr.uPduInstalled = "1";
gr.uTorInstalled = "1"
gr.update();

gr = new GlideRecord('alm_hardware');
gr.get(assetSysId);
gr.install_status = '1';
gr.substatus = 'allocated';
gr.update();

// p3sj01.09 retired
gr = new GlideRecord('cmdb_ci_rack');
gr.get('30cae3f4db271788259e5898dc961926');
gr.asset = '';
gr.install_status = "7";
gr.uCablingInstalled = "0";
gr.uCmdbCiStatus = "Retired";
gr.uPduInstalled = "0";
gr.uTorInstalled = "0"
gr.update();
