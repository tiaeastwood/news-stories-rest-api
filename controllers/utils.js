exports.checkOrderQuery = query => {
  return !query || (query === 'asc' || query === 'desc');
};
