"use client";

import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signUpSchema } from "../../schemas";
import CardForm from "./card-form";
import { signUpWithPassword } from "../../api";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import GoogleButton from "../google-button";
import AuthSeparator from "../separator";
import { toast } from "sonner";
import { LOGIN_ROUTE } from "@/routes";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const params = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const token = params.get("token") as string;
      await signUpWithPassword(values, token);

      toast.success("Conta criada com sucesso!");
    } catch (error: unknown) {
      toast.error(
        "Não foi possível efetuar o registo. Por favor tente mais tarde.",
      );
    }
  };

  return (
    <CardForm
      description="Junte-se ao futuro da contratação pública."
      footerText="Já tem uma conta?"
      footerLinkLabel="Faça login"
      footerLinkHref={LOGIN_ROUTE}
    >
      <GoogleButton label="Criar conta com Google" />
      <AuthSeparator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nome Completo <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Nome completo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Confirmação de Password{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPasswordConfirmation ? "text" : "password"}
                      placeholder="******"
                    />
                    <div
                      onClick={() => setShowPasswordConfirmation((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    >
                      {showPasswordConfirmation ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader className="animate-spin" /> : "Registar"}
          </Button>
        </form>
      </Form>
    </CardForm>
  );
};

export default SignUpForm;
