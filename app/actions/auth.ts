"use server";

import { prisma } from "@/lib/prisma";
import { SignupSchema, LoginSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { setSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    root?: string[];
  };
  message?: string;
};

export async function signup(prevState: unknown, formData: FormData): Promise<AuthState> {
  const data = Object.fromEntries(formData);
  const parsed = SignupSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: { email: ["User already exists"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await setSession({ userId: user.id, email: user.email });
  } catch (err) {
    console.error("Signup Error:", err);
    return { error: { root: ["An unexpected error occurred"] } };
  }
  
  redirect("/dashboard");
}

export async function login(prevState: unknown, formData: FormData): Promise<AuthState> {
  const data = Object.fromEntries(formData);
  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Return generic error for security
      return { error: { root: ["Invalid credentials"] } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: { root: ["Invalid credentials"] } };
    }

    await setSession({ userId: user.id, email: user.email });
  } catch (err) {
    console.error("Login Error:", err);
    return { error: { root: ["An unexpected error occurred"] } };
  }
  
  redirect("/dashboard");
}

export async function logout() {
  await clearSession();
  redirect("/login");
}
