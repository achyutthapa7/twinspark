"use client";
import Input from "@/shared/field/input";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

const LoginPage = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
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

        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default LoginPage;
