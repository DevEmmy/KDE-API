import { object, string } from "yup";

export const SubscribeToNewsletterInput = object({
  body: object({
    email: string()
      .required("Email is required")
      .email("Provide a valid email"),
  }),
});

export const UnSubscribeFromNewsletterInput = object({
  params: object({
    email: string()
      .required("Email is required")
      .email("Provide a valid email"),
  }),
});
