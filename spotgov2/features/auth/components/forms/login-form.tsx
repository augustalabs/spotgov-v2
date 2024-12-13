"use client";

import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signInWithPassword } from "../../actions";
import CardForm from "./card-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import GoogleButton from "../google-button";
import AuthSeparator from "../separator";
import { loginSchema } from "../../schemas";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const params = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const token = params.get("token") as string;
      await signInWithPassword(values, token);

      toast.success("Login efetuado com sucesso!");
    } catch {
      toast.error(
        "Não foi possível efetuar o login. Por favor tente mais tarde.",
      );
    }
  };

  return (
    <CardForm
      description="Faça login para continuar para o SpotGov."
      footerText="Ainda não está registado?"
      footerLinkLabel="Crie uma conta"
      footerLinkHref="/auth/registar"
    >
      <GoogleButton label="Iniciar sessão com Google" />
      <AuthSeparator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                    />
                    <div
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardForm>
  );
};

export default LoginForm;
