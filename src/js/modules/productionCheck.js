import {PROD_EXTENSION_ID} from './constants';

export default () => {
  return chrome.runtime.id === PROD_EXTENSION_ID;
};
