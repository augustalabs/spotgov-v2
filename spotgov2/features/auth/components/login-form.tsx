"use client";

import * as z from "zod";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@public/assets/logo.png";

import { loginSchema } from "../schemas";
import { signInWithPassword } from "../actions";

const LoginForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signInWithPassword(values);
    } catch (error: unknown) {
      const err = error as Error;

      toast({
        title: err.name,
        description: err.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-6">
        <CardTitle className="mx-auto">
          <Image alt="SpotGov Logo" src={logo} width={145} />
        </CardTitle>
        <CardDescription>
          Faça login para continuar para o SpotGov.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <CardFooter className="mt-4 p-0">
          <CardDescription>
            Ainda não está registado?
            <Link href="/auth/sign-up" className="pl-1 text-primary">
              Crie uma conta
            </Link>
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
