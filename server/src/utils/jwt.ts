import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

interface IPayload extends JwtPayload {
  role: string;
  id: string;
}

const jwtSign = (payload: IPayload): string => {
  try {
    const token = jwt.sign(payload, env.JWT_SECRET as string, {
      expiresIn: "15m",
    });
    return token;
  } catch (error) {
    console.error("JWT Sign Error:", error);
    throw new Error("Token signing failed");
  }
};

const jwtVerify = (token: string): IPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as IPayload;
    return decoded;
  } catch (error) {
    console.error("JWT Verify Error:", error);
    throw new Error("Invalid or expired token");
  }
};

export { jwtSign, jwtVerify, IPayload };
