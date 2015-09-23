import {domReady} from './modules/utils'; // Replacement for jQuery's ready function

domReady(function() {
  const versionNum = chrome.runtime.getManifest().version;
  const versionDiv = document.getElementById('version-text');

  // Put extension version number into html
  versionDiv.innerHTML = versionNum;

  hbspt.forms.create({
    portalId: '150905',
    target: '.feedback-form',
    formId: '2f33e21f-3324-437c-8bee-8cc266fc8296'
  });
});
