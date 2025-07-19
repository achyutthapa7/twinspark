export const createQuery = <T>(key: T, fn: () => void, options = {}) => ({
  queryKey: [key],
  queryFn: fn,
  ...options,
});
