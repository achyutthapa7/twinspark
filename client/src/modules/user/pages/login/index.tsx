"use client";
import Input from "@/shared/field/input";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../hooks/useUser";
import { useRouter } from "next/navigation";
import { validation } from "../../validations";
import Button from "@/shared/button";

const LoginPage = () => {
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login, isAuthenticated, logout, isLoading, user } = useAuth();
  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated]);

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    await login({ email, password });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validation.login}
        enableReinitialize
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

          <Button type="submit" title="Login" isLoading />
          <Button type="reset" title="Reset" />
        </Form>
      </Formik>

      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default LoginPage;
