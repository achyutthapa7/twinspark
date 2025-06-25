import { z } from "zod";

const validation = {
  signUpValidationSchema: () =>
    z.object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),

      email: z.string().email("Invalid email address"),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),

      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'other'",
        }),
      }),
    }),
};
export { validation };
