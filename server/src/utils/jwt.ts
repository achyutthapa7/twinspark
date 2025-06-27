import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

interface IPayload extends JwtPayload {
  role: string;
  id: string;
}

type TokenType = "access" | "refresh";

const jwtSign = (payload: IPayload, type: TokenType = "access"): string => {
  try {
    const secret =
      type === "access" ? env.JWT_SECRET_ACCESS : env.JWT_SECRET_REFRESH;
    const expiresIn = type === "access" ? "15m" : "7d";

    const token = jwt.sign(payload, secret as string, { expiresIn });
    return token;
  } catch (error) {
    console.error(`JWT ${type} Sign Error:`, error);
    throw new Error(`Token (${type}) signing failed`);
  }
};

const jwtVerify = (token: string, type: TokenType = "access"): IPayload => {
  try {
    const secret =
      type === "access" ? env.JWT_SECRET_ACCESS : env.JWT_SECRET_REFRESH;

    const decoded = jwt.verify(token, secret as string) as IPayload;
    return decoded;
  } catch (error) {
    console.error(`JWT ${type} Verify Error:`, error);
    throw new Error("Invalid or expired token");
  }
};

export { jwtSign, jwtVerify, IPayload };
