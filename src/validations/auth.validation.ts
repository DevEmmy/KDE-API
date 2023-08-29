import { object, string, number } from "yup";

export const SignupInput = object({
  body: object({
    firstName: string().required("FirstName is required"),
    lastName: string().required("Lastname is required"),
    phoneNumber1: number().required("phoneNumber1 is required"),
    email: string()
      .required("Email is required")
      .email("Provide a valid email"),
    password: string()
      .required("Password is required")
      .min(8, "Password must not be less than 8 characters"),
    confirmPassword: string()
      .required("confirmPassword is required")
      .min(8, "Confirm password must not be less than 8 charcters"),
  }),
});

export const LoginInput = object({
  body: object({
    email: string()
      .required("Email is required")
      .email("Provide a valid email"),
    password: string()
      .required("Password is required")
      .min(8, "Password must not be less than 8 characters"),
  }),
});

export const VerifyEmailInput = object({
  body: object({
    token: string().required("Provide token"),
  }),
});

export const RequestPasswordResetInput = object({
  body: object({
    email: string().required("Provide email").email("Provide a valid email"),
  }),
});

export const ResetPasswordInput = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(8, "Password must not be less than 8 characters"),
    confirmPassword: string()
      .required("confirmPassword is required")
      .min(8, "Confirm password must not be less than 8 charcters"),
    code: string().required("Provide code"),
  }),
});
