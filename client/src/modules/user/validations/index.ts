import * as yup from "yup";
export const validation = {
  login: () =>
    yup.object({
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup.string().required("Required"),
    }),
};
