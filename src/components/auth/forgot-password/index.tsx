import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Music, ArrowLeft, Construction } from "lucide-react";

// Password recovery is not implemented yet: there is no reset token model and
// no e-mail provider. This page states that honestly instead of pretending an
// e-mail was sent.
const ForgotPassword = () => {
  return (
    <>
      {/* Back to sign in link */}
      <div className="text-center">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm
          text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar ao login
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
        <h2 className="text-3xl font-bold text-gray-900">Esqueceu a senha?</h2>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Recuperar senha</CardTitle>
          <CardDescription className="text-center">
            Funcionalidade ainda em desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="bg-amber-50 border border-amber-200 p-3 rounded-md
            flex items-center gap-x-2 text-sm text-amber-700"
          >
            <Construction className="w-5 h-5 flex-shrink-0" />
            <p className="break-words ml-1">
              A recuperação de senha por e-mail ainda não está disponível.
            </p>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Lembrou sua senha?{" "}
            <Link
              href="/signin"
              className="font-medium text-primary
              hover:text-primary/80 transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export { ForgotPassword };
