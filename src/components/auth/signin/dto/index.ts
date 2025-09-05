interface SignInValidationError {
  email?: string[];
  password?: string[];
  signinUserErrorMessage?: string;
}

interface SignInFormState {
  signinUserError?: SignInValidationError;
  successMessage?: boolean;
}

interface SignInFormContainerProps {
  state: SignInFormState;
  isPending: boolean;
}

export type { SignInFormContainerProps, SignInFormState };
