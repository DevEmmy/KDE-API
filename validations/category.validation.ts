import { object, string } from "yup";

export const CreateCategoryInput = object({
  body: object({
    title: string().required("Provide title"),
  }),
});

export const EditCategoryInput = object({
  body: object({
    title: string().required("Provide title"),
  }),
  params: object({
    id: string().required("Provide category id"),
  }),
});

export const DeleteCategoryInput = object({
  params: object({
    id: string().required("Provide category id"),
  }),
});
