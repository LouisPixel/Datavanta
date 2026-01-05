"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth/auth";
import { prisma } from "./db";
import { APIError } from "better-auth/api";

interface State {
  errorMessage?: string | null;
}

export async function signIn(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
  };

  const { email, password } = rawFormData;

  // Validate input
  if (!email || !password) {
    return { errorMessage: "Email and password are required." };
  }

  try {
    console.log("Attempting to sign in user:", email);
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    console.log("Sign in successful");
    redirect("/dashboard");
  } catch (error) {
    console.error("Sign in error:", error);
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errorMessage: "Invalid email or password." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email format." };
        default:
          return { errorMessage: `Sign in failed: ${error.message || "Unknown error"}` };
      }
    }
    // Handle non-APIError exceptions
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { errorMessage: `Sign in failed: ${errorMessage}` };
  }
}

export async function signUp(prevState: State, formData: FormData) {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
    firstName: formData.get("firstname") as string,
    lastName: formData.get("lastname") as string,
  };

  const { email, password, firstName, lastName } = rawFormData;

  // Validate input
  if (!email || !password) {
    return { errorMessage: "Email and password are required." };
  }

  if (!firstName || !lastName) {
    return { errorMessage: "First name and last name are required." };
  }

  try {
    console.log("Attempting to sign up user:", email);
    const result = await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
      },
    });
    console.log("Sign up successful");
    redirect("/dashboard");
  } catch (error) {
    console.error("Sign up error:", error);
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User already exists with this email." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email format or password too weak." };
        default:
          return { errorMessage: `Sign up failed: ${error.message || "Unknown error"}` };
      }
    }
    // Handle non-APIError exceptions
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { errorMessage: `Sign up failed: ${errorMessage}` };
  }
}

export async function searchAccount(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return !!user;
}