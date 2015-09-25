import Q from 'q';

/***
 *
 * Chrome Storage has quota limts - https://developer.chrome.com/extensions/storage#property-sync
 *
 * .local has about 50 times more space than .sync but also doesn't sync Google
 * users won't be able to get those settings on another computer
 *
 * I switched to .local when saving state on Buzzfeed went over the individual quota limit of ~8k
 * There seems not to be a quota limit per item for storing in .local
 *
 */

export const get = (item) => {
  const deferred = Q.defer();

  chrome.storage.local.get(item, (data) => {
    deferred.resolve(data);
  });

  return deferred.promise;
};

export const set = item => {
  const deferred = Q.defer();

  chrome.storage.local.set(item, (data) => {
    deferred.resolve(data);
  });

  return deferred.promise;
};
