export const getMatchPerecentage = (a: string[], b: string[]) => {
  const interest1 = new Set(a);
  const interest2 = new Set(b);
  const allInterests = [...interest1, ...interest2];
  const commonInterests = [...interest1].filter((interest) =>
    [...interest2].includes(interest)
  );

  return (commonInterests.length / allInterests.length) * 100;
};
