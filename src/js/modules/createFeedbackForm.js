import {REAL_FORM_ID, TEST_FORM_ID} from './constants';
import prod from './productionCheck';

export default () => {
  const formId = prod() ? REAL_FORM_ID : TEST_FORM_ID;

  if (document.getElementsByClassName('hs-form').length === 0) {
    hbspt.forms.create({
      target: '#feedback-form',
      portalId: '150905',
      formId: formId
    });
  }
};
