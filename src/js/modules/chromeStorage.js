import Q from 'q';

export const get = (item) => {
  const deferred = Q.defer();

  chrome.storage.sync.get(item, (data) => {
    deferred.resolve(data);
  });

  return deferred.promise;
};

export const set = item => {
  const deferred = Q.defer();

  chrome.storage.sync.set(item, (data) => {
    deferred.resolve(data);
  });

  return deferred.promise;
};
