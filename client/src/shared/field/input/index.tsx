"use client";
import React, { FC, ChangeEvent, useState } from "react";
import { Field } from "formik";
import { StyleFormWrapper, StyleLabel } from "../style";
import { StyleInput } from "./style";
interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
}

const Input: FC<InputProps> = ({
  name,
  type = "text",
  placeholder = "",
  label,
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form }: any) => {
        const hasError = meta.touched && meta.error;

        return (
          <StyleFormWrapper>
            {label && (
              <StyleLabel
                htmlFor={name}
                style={{ display: "block", fontWeight: 500 }}
              >
                {label}
              </StyleLabel>
            )}

            <StyleInput
              {...field}
              type={type}
              placeholder={placeholder}
              id={name}
              onBlur={(e) => {
                field.onBlur(e);
              }}
              style={{
                padding: "8px 12px",
                width: "100%",
                borderRadius: "4px",
                border: hasError ? "1px solid red" : "1px solid #ccc",
              }}
            />

            {hasError && (
              <div
                style={{ color: "red", marginTop: "4px", fontSize: "0.875rem" }}
              >
                {meta.error}
              </div>
            )}
          </StyleFormWrapper>
        );
      }}
    </Field>
  );
};

export default Input;
