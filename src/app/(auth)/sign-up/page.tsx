"use client";
import {authClient} from "../../../lib/auth-client"

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

export default function Basic() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

   const { error } = await authClient.signUp.email({
    name: data.name || data.email.split("@")[0],
    email: data.email,
    password: data.password,
   });

   if (error) {
    alert(error.message || "Something went wrong");
   } else {
    alert("Sign up successful");
   }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8">
    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
       <TextField
                  name="name"
                  validate={(value) => {
                    if (value && value.trim().length < 2) {
                      return "Name must be at least 2 characters";
                    }
      
                    return null;
                  }}
                >
                  <Label>Name</Label>
                  <Input placeholder="John Doe" />
                  <FieldError />
                </TextField>
      <TextField
        name="age"
        validate={(value) => {
          if (value && value.trim().length < 18) {
            return "Age must be at least 18";
          }

          return null;
        }}
      >
        <Label>Age</Label>
        <Input placeholder="Enter your age" />
        <FieldError />
      </TextField>

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

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
    </div>
    </div>
  );
}