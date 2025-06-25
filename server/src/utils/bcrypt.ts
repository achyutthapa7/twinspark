import bcrypt, { genSalt } from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {}
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const passwordValid = await bcrypt.compare(password, hashedPassword);
    return password;
  } catch (error) {}
};
