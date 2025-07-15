"use client";
import Input from "@/shared/field/input";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAuth } from "../../hooks/useUser";
import { useRedux } from "@/hooks/useRedux";
import { RootState } from "@/lib/store/store";

const LoginPage = () => {
  const { login, isAuthenticated, logout, isLoading, user } = useAuth();
  console.log(isAuthenticated);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          const { email, password } = values;
          await login({ email, password });
        }}
        validationSchema={yup.object({
          email: yup.string().email("Invalid email").required("Required"),
          password: yup.string().required("Required"),
        })}
      >
        <Form>
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />

          <button type="submit">{isLoading ? "loading" : "submit"}</button>
        </Form>
      </Formik>

      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default LoginPage;
