import { object, string } from "yup";

export const SendMessageInput = object({
  body: object({
    messageContent: string().required("message content is required"),
    conversationId: string().required("conversationId is required"),
  }),
});
