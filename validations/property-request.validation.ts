import { object, string } from "yup";

export const CreatePropertyRequestInput = object({
  body: object({
    name: string().required("Name is required"),
    email: string().email("Enter valid email").required("Email is required"),
    request: string().required("Request is required"),
  }),
});
