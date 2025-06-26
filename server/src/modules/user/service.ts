import { userType } from "../../types";
import { validation } from "./validation";
import { repository } from "./repository";
import { createOtp } from "../../utils/otp";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import { jwtSign } from "../../utils/jwt";

export const service = {
  createUser: async (payload: userType.Iuser) => {
    const validatedData = validation.signUpValidationSchema().parse(payload);
    const existingUser = await repository.findByEmail(payload.email);
    if (existingUser) throw new Error("User already existed");
    const hashedPassword = await hashPassword(validatedData.password);
    const newUser = await repository.create({
      ...validatedData,
      password: hashedPassword,
    });
    const otp = createOtp();
    const OTP_EXPIRY_MINUTES = 5;
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    await repository.update(newUser?._id, { otp, otpExpiresAt });
    //send the otp to emai sendMail(otp,email) later
  },
  verifyUser: async (payload: { email: string; input: number }) => {
    const { email, input } = payload;
    const registeredUser = await repository.findByEmail(email);
    const otp = registeredUser?.otp;
    const otpExpiresAt = registeredUser?.otpExpiresAt;
    if (input !== otp) throw new Error("Otp doesn't match, please try again");
    if (!otpExpiresAt || new Date() > new Date(otpExpiresAt))
      throw new Error("Otp is already expired");
    await repository.update(registeredUser?._id, {
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
    const jwtPayload: { role: string; id: string } = {
      role: existingUser?.role ?? "user",
      id: existingUser?._id.toString(),
    };
    const token = jwtSign(jwtPayload);

    return {
      token,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
      gender: existingUser.gender,
    };
  },
};
