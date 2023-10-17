import { object, string } from "yup";

export const AddArticleValidation = object({
  body: object({
    title: string().required(),
    body: string().required(),
    category: string().required(),
  }),
});

export const EditArticleValidation = object({
  body: object({
    title: string().notRequired(),
    body: string().notRequired(),
    category: string().notRequired(),
  }),
});
