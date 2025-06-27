import { userType } from "../../types";
import { validation } from "./validation";
import { repository } from "./repository";
import { createOtp } from "../../utils/otp";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import { jwtSign, jwtVerify } from "../../utils/jwt";

export const service = {
  createUser: async (payload: userType.Iuser) => {
    const validatedData = validation.signUpValidationSchema().parse(payload);
    const existingUser = await repository.findByEmail(payload.email);
    const otp = createOtp();
    const OTP_EXPIRY_MINUTES = 5;
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    if (existingUser) throw new Error("User already existed");
    const hashedPassword = await hashPassword(validatedData.password);
    const newUser = await repository.create({
      ...validatedData,
      password: hashedPassword,
      otp,
      otpExpiresAt,
    });

    //send the otp to emai sendMail(otp,email) later
  },
  verifyUser: async (payload: { email: string; input: number }) => {
    const { email, input } = payload;
    const registeredUser = await repository.findByEmail(email);
    const otp = registeredUser?.otp;
    const otpExpiresAt = registeredUser?.otpExpiresAt;
    if (registeredUser.otp === null)
      throw new Error("User is already Verified");
    if (input !== otp) throw new Error("Otp doesn't match, please try again");
    if (!otpExpiresAt || new Date() > otpExpiresAt)
      throw new Error("Otp is already expired");
    await repository.update(registeredUser?._id, {
      otp: null,
      otpUsed: true,
      isVerified: true,
    });
  },

  login: async (payload: { email: string; password: string }) => {
    const { email, password } = payload;

    const existingUser = await repository.findByEmail(email);
    if (!existingUser) throw new Error("Email doesn't exist");

    if (!existingUser.isVerified)
      throw new Error("Your Email is not verified, please verify first");

    const isPasswordValid = await verifyPassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      throw new Error("Password is incorrect, please try again");

    const jwtPayload = {
      role: existingUser.role ?? "user",
      id: existingUser._id.toString(),
    };

    const accessToken = jwtSign(jwtPayload, "access");
    const refreshToken = jwtSign(jwtPayload, "refresh");
    await repository.update(existingUser._id, { refreshToken });
    return {
      accessToken,
      refreshToken,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
      gender: existingUser.gender,
    };
  },

  refreshToken: async (token: string) => {
    const decoded = await jwtVerify(token, "access");
    const user = await repository.findById(decoded.id);
    if (!user || user.refreshToken !== token) throw new Error("Token Mismatch");
    const newAccessToken = jwtSign({ id: user._id, role: user.role }, "access");
    return { newAccessToken };
  },

  logout: async (user: any) => {
    const { _id } = user;
    await repository.update(_id, { refreshToken: null });
  },
};
