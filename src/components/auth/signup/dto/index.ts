interface SignUpValidationError {
  email?: string[];
  name?: string[];
  password?: string[];
  confirmPassword?: string[];
  signUpUserErrorMessage?: string;
}

interface SignUpFormState {
  signupUserError?: SignUpValidationError;
  successMessage?: string;
}

interface SignUpFormContainerProps {
  state: SignUpFormState;
  isPending: boolean;
}

export type { SignUpFormContainerProps, SignUpFormState };
