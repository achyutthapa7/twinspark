export const createOtp = () => {
  return Math.floor(Math.random() * 89999 + 10000);
};
