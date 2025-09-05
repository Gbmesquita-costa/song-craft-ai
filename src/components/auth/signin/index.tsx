"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import {
  Music,
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Send,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
import { SignInFormContainerProps, SignInFormState } from "./dto";

import { ErrorForm } from "../error-form";
import { handleSigninUser } from "@/actions/signin-user";

const SignInContainer = ({ state, isPending }: SignInFormContainerProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  useEffect(() => {
    if (state?.successMessage) {
      setFormValues({
        email: "",
        password: "",
      });
    }
  }, [state?.successMessage]);

  return (
    <div className="space-y-4">
      {/* Google Sign In */}
      <Button className="w-full h-11" variant="outline" disabled={isPending}>
        {false ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        {false ? "Conectando..." : "Continuar com Google"}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            ou continue com email
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          {state?.signinUserError?.email ? (
            <span className="text-red-500 text-sm block mt-1">
              {state.signinUserError.email[0]}
            </span>
          ) : (
            "Email"
          )}
        </Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 
            transform -translate-y-1/2 h-4 w-4 
            text-gray-400"
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formValues.email}
            onChange={handleInputChange("email")}
            disabled={isPending}
            className={`pl-10 ${
              state?.signinUserError?.email ? "border-red-500" : ""
            }`}
          />
        </div>
      </div>

      <div className="space-y-2 pb-3 flex flex-col">
        <Label htmlFor="password">
          {state?.signinUserError?.password ? (
            <span className="text-red-500 text-sm block mt-1">
              {state.signinUserError.password[0]}
            </span>
          ) : (
            "Senha"
          )}
        </Label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform 
            -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            value={formValues.password}
            onChange={handleInputChange("password")}
            disabled={isPending}
            className={`pl-10 pr-10 ${
              state?.signinUserError?.password ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform cursor-pointer
            -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-primary/80
          hover:text-primary transition-colors"
        >
          Esqueci minha senha
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r 
        from-purple-600 to-blue-600 transition duration-200
        hover:from-purple-700 hover:to-blue-700"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        {isPending ? "Entrando..." : "Entrar"}
      </Button>

      <ErrorForm message={state?.signinUserError?.signinUserErrorMessage} />
    </div>
  );
};

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  // Default value for state
  const defaultState: SignInFormState = {};
  const [state, formAction, isPending] = useActionState(handleSigninUser, null);

  return (
    <>
      {/* Back to home link */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm 
          text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar ao início
        </Link>
      </div>

      {/* Header */}
      <div className="text-center">
        <div
          className="mx-auto h-12 w-12 bg-gradient-to-r 
          from-purple-500 to-pink-500 rounded-xl 
          flex items-center justify-center mb-4"
        >
          <Music className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Entrar no SongCraft AI
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Acesse sua conta e continue aprendendo música
        </p>
      </div>

      {/* Sign in card */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className="text-center">
            Entre com sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Form */}
          <form action={formAction}>
            <SignInContainer
              state={state ?? defaultState}
              isPending={isPending}
            />
          </form>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary 
                hover:text-primary/80 transition-colors"
              >
                Criar conta grátis
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { SignIn };
