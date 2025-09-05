interface ForgotPasswordValidationError {
  email?: string[];
  forgotPasswordErrorMessage?: string;
}

interface ForgotPasswordFormState {
  forgotPasswordError?: ForgotPasswordValidationError;
  successMessage?: string;
}

interface ForgotPasswordFormContainerProps {
  state: ForgotPasswordFormState;
  isPending: boolean;
}

export type { ForgotPasswordFormContainerProps, ForgotPasswordFormState };
