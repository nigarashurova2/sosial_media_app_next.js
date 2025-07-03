import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import loginImage from "@/assets/login-image.jpg";
import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="bg-card flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to bugbook</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Dont have an account? Sign Up
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          priority
          alt="login"
          width={100}
          height={100}
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
