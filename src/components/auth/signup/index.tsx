"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";

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
  User,
  CheckCircle,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { SignUpFormContainerProps, SignUpFormState } from "./dto";

import { handleSignUpUser } from "@/actions/signup-user";

import { ErrorForm } from "../error-form";
import { SuccessForm } from "../success-form";

const SignUpContainer = ({ state, isPending }: SignUpFormContainerProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [state?.successMessage]);

  return (
    <div className="space-y-4">
      {/* Google Sign Up */}
      <Button className="w-full h-11" variant="outline" disabled={isPending}>
        {false ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        {false ? "Criando conta..." : "Criar conta com Google"}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">ou crie com email</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          {state?.signupUserError?.name ? (
            <span className="text-red-500 text-sm block mt-1">
              {state.signupUserError.name[0]}
            </span>
          ) : (
            "Nome completo"
          )}
        </Label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 transform 
            -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome completo"
            className={`pl-10 ${
              state?.signupUserError?.name ? "border-red-500" : ""
            }`}
            disabled={isPending}
            value={formValues.name}
            onChange={handleInputChange("name")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          {state?.signupUserError?.email ? (
            <span className="text-red-500 text-sm block mt-1">
              {state.signupUserError.email[0]}
            </span>
          ) : (
            "E-mail"
          )}
        </Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform 
            -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            className={`pl-10 ${
              state?.signupUserError?.email ? "border-red-500" : ""
            }`}
            disabled={isPending}
            value={formValues.email}
            onChange={handleInputChange("email")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {state?.signupUserError?.password ? (
            <span className="text-red-500 text-sm block mt-1">
              {state.signupUserError.password[0]}
            </span>
          ) : (
            "Senha"
          )}
        </Label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 
            transform -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            className={`pl-10 pr-10 ${
              state?.signupUserError?.password ? "border-red-500" : ""
            }`}
            disabled={isPending}
            value={formValues.password}
            onChange={handleInputChange("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform cursor-pointer
            -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isPending}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          {state?.signupUserError?.confirmPassword ? (
            <span className="text-red-500 text-sm block mt-1">
              {state.signupUserError.confirmPassword[0]}
            </span>
          ) : (
            "Confirmar senha"
          )}
        </Label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform 
            -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Digite a senha novamente"
            className={`pl-10 pr-10 ${
              state?.signupUserError?.confirmPassword ? "border-red-500" : ""
            }`}
            disabled={isPending}
            value={formValues.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform cursor-pointer
            -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isPending}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
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
          <CheckCircle className="mr-2 h-4 w-4" />
        )}
        {isPending ? "Criando conta..." : "Criar conta gratuita"}
      </Button>

      <ErrorForm message={state?.signupUserError?.signUpUserErrorMessage} />
      <SuccessForm message={state?.successMessage} />
    </div>
  );
};

const SignUp = () => {
  // Default value for state
  const defaultState: SignUpFormState = {};
  const [state, formAction, isPending] = useActionState(handleSignUpUser, null);

  const previewFeaturesMobile = [
    { icon: "🎵", value: "3 músicas/mês" },
    { icon: "🤖", value: "IA avançada" },
    { icon: "📊", value: "Análise detalhada" },
    { icon: "🎹", value: "Multi-instrumento" },
  ];

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
          Criar conta no SongCraft AI
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Comece sua jornada musical hoje mesmo
        </p>
      </div>

      {/* Sign up card */}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Bem-vindo</CardTitle>
          <CardDescription className="text-center">
            Crie sua conta gratuita em menos de 2 minutos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Form */}
          <form action={formAction}>
            <SignUpContainer
              state={state ?? defaultState}
              isPending={isPending}
            />
          </form>

          {/* Features preview mobile */}
          <div className="lg:hidden bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 text-sm">
              ✨ O que você ganha de graça:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {previewFeaturesMobile.map(({ icon, value }) => (
                <div key={value} className="flex items-center space-x-2">
                  <span>{icon}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/signin"
                className="font-medium text-primary 
                hover:text-primary/80 transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { SignUp };
