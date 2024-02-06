import { object, string } from "yup";

export const CreateReportInput = object({
  body: object({
    message: string().required("Provide message"),
  }),
});
