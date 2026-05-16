"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// I will just use SVG for Google and Github
// Wait, I can use react-icons if I installed it, but I didn't. I'll use simple text for now or SVGs.

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post("/api/register", data)
        .then(() => signIn("credentials", { ...data, redirect: false }))
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Successfully registered!");
            router.push("/conversations");
          }
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully!");
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div className="bg-white dark:bg-zinc-900 px-4 py-8 shadow-sm sm:rounded-lg sm:px-10 border border-zinc-200 dark:border-zinc-800">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                disabled={isLoading}
                {...register("name", { required: true })}
                className={errors.name ? "border-red-500" : ""}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              disabled={isLoading}
              {...register("email", { required: true })}
              className={errors.email ? "border-red-500" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              {...register("password", { required: true })}
              className={errors.password ? "border-red-500" : ""}
            />
          </div>
          <div>
            <Button disabled={isLoading} className="w-full" type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500 dark:text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => socialAction("github")}
              disabled={isLoading}
            >
              GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => socialAction("google")}
              disabled={isLoading}
            >
              Google
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 dark:text-zinc-400">
          <div>
            {variant === "LOGIN" ? "New to Messenger?" : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer text-blue-500 hover:text-blue-600">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
