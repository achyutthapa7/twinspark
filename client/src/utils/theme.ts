const colors = {
  text: "#333333",
  accent: "#ffcd67",
};
const sizes = {};

export const createTheme = () => {
  const theme = {
    colors: colors,
    sizes: sizes,
  };

  return theme;
};

const theme = createTheme();
export default theme;
