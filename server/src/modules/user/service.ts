import { userType } from "../../types";
import { validation } from "./validation";
import { user } from "./model";
import { repository } from "./repository";
import { Response } from "express";
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
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await repository.update(newUser.id, { otp, otpExpiresAt });
    //send the otp to emai sendMail(otp,email) later
  },
  verifyUser: async (payload: { email: string; input: number }) => {
    const { email, input } = payload;
    const registeredUser = await repository.findByEmail(email);
    const otp = registeredUser.otp;
    const otpExpiresAt = registeredUser.otpExpiresAt;
    if (input !== otp) throw new Error("Otp doesn't match, please try again");
    if (Date.now() > otpExpiresAt) throw new Error("Otp is alredy expired");
    await repository.update(registeredUser.id, { otpUsed: true });
  },

  login: async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    const existingUser = await repository.findByEmail(email);
    if (!existingUser) throw new Error("Email doesn't exist");
    const isPasswordValid = await verifyPassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      throw new Error("Password is incorrect, please try again");
    const jwtPayload: { role: string; id: string } = {
      role: existingUser.role,
      id: existingUser._id,
    };
    const token = jwtSign(jwtPayload);

    return { token, existingUser };
  },
};
