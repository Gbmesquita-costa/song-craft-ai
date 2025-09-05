// "use client";

// import Link from "next/link";

// import { useActionState, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { Music, ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";

// import {
//   ForgotPasswordFormContainerProps,
//   ForgotPasswordFormState,
// } from "./dto";
// import { handleForgotPassword } from "@/actions/forgot-password";

// import { ErrorForm } from "../error-form";
// import { SuccessForm } from "../success-form";

// const ForgotPasswordContainer = ({
//   state,
//   isPending,
// }: ForgotPasswordFormContainerProps) => {
//   const [formValues, setFormValues] = useState({
//     email: "",
//   });

//   const handleInputChange =
//     (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
//       setFormValues((prev) => ({
//         ...prev,
//         [field]: e.target.value,
//       }));
//     };

//   useEffect(() => {
//     if (state?.successMessage) {
//       setFormValues({
//         email: "",
//       });
//     }
//   }, [state?.successMessage]);

//   return (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="email">
//           {state?.forgotPasswordError?.email ? (
//             <span className="text-red-500 text-sm block mt-1">
//               {state.forgotPasswordError.email[0]}
//             </span>
//           ) : (
//             "Email"
//           )}
//         </Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="seu@email.com"
//           value={formValues.email}
//           onChange={handleInputChange("email")}
//           required
//           disabled={isPending}
//           className={`${
//             state?.forgotPasswordError?.email ? "border-red-500" : ""
//           }`}
//         />
//       </div>

//       <Button
//         type="submit"
//         className="w-full bg-gradient-to-r
//         from-purple-600 to-blue-600 transition duration-200
//         hover:from-purple-700 hover:to-blue-700"
//         disabled={isPending}
//       >
//         {isPending ? (
//           <div className="flex items-center">
//             <Loader2 className="animate-spin h-4 w-4 mr-2" />
//             Enviando...
//           </div>
//         ) : (
//           <>
//             <Mail className="w-4 h-4 mr-2" />
//             Enviar link de recuperação
//           </>
//         )}
//       </Button>

//       <ErrorForm
//         message={state?.forgotPasswordError?.forgotPasswordErrorMessage}
//       />
//       <SuccessForm message={state?.successMessage} />
//     </div>
//   );
// };

// const ForgotPassword = () => {
//   // Default value for state
//   const defaultState: ForgotPasswordFormState = {};
//   const [state, formAction, isPending] = useActionState(
//     handleForgotPassword,
//     null
//   );

//   return (
//     <>
//       {/* Back to signin */}
//       <div className="text-center">
//         <Link
//           href="/signin"
//           className="inline-flex items-center text-sm
//           text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 mr-1" />
//           Voltar ao login
//         </Link>
//       </div>

//       {/* Header */}
//       <div className="text-center">
//         <div
//           className="mx-auto h-12 w-12 bg-gradient-to-r
//           from-purple-500 to-pink-500 rounded-xl
//           flex items-center justify-center mb-4"
//         >
//           <Music className="h-8 w-8 text-white" />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           Esqueceu sua senha?
//         </h2>
//         <p className="mt-2 text-sm text-gray-600">
//           Não se preocupe, vamos ajudar você a recuperar o acesso
//         </p>
//       </div>

//       {/* Form */}
//       <Card>
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl text-center">
//             Recuperar senha
//           </CardTitle>
//           <CardDescription className="text-center">
//             Digite seu email para receber um link de recuperação
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form action={formAction} className="space-y-4">
//             <ForgotPasswordContainer
//               state={state ?? defaultState}
//               isPending={isPending}
//             />
//           </form>
//         </CardContent>

//         {/* Additional help */}
//         <div className="text-center space-y-4">
//           <p className="text-sm text-gray-600">
//             Lembrou sua senha?{" "}
//             <Link
//               href="/signin"
//               className="font-medium text-primary
//               hover:text-primary/80 transition-colors"
//             >
//               Fazer login
//             </Link>
//           </p>
//         </div>
//       </Card>

//       <div className="border-t pt-4 text-center">
//         <p className="text-xs text-gray-500">
//           Ainda com problemas?{" "}
//           <a
//             href="mailto:support@songcraft.ai"
//             className="text-primary
//             hover:text-primary/80
//             transition-colors"
//           >
//             Entre em contato conosco
//           </a>
//         </p>
//       </div>
//     </>
//   );
// };

// export { ForgotPassword };
