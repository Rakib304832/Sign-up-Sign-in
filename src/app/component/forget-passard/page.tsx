"use client";
import { Form } from "@heroui/react/form";
import { authClient } from "../../../lib/auth-client";

import React from "react";
import Link from "next/dist/client/link";
import { Button } from "@heroui/react/button";
import { TextField } from "@heroui/react/textfield";
import { FieldError } from "@heroui/react/field-error";
import { Description } from "@heroui/react/description";
import { Input } from "@heroui/react/input";
import { Label } from "@heroui/react/label";

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const userData = Object.fromEntries(formData.entries());
  const resData = await authClient.requestPasswordReset({
    email: userData.email as string,
    redirectTo: "http://localhost:3000/reset-password",
  });
  window.alert("Password reset email sent successfully");
};

const forgetPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <Button type="submit">Submit</Button>
          
          
        </Form>
      </div>
    </div>
  );
};

export default forgetPassword;