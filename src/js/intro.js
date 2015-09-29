import {domReady} from './modules/utils'; // Replacement for jQuery's ready function
import {REAL_FORM_ID, TEST_FORM_ID} from './modules/constants';
import prod from './modules/productionCheck';

domReady(function() {
  const versionNum = chrome.runtime.getManifest().version;
  const versionDiv = document.getElementById('version-text');
  const formId = prod() ? REAL_FORM_ID : TEST_FORM_ID;

  // Put extension version number into html
  versionDiv.innerHTML = versionNum;

  hbspt.forms.create({
    portalId: '150905',
    target: '.feedback-form',
    css: '',
    formId: formId
  });
});
