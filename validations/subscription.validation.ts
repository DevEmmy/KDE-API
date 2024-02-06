import { object, string } from "yup";
import { SubscriptionType } from "../interfaces/model/subscription.interface";

export const subscribeInput = object({
  body: object({
    type: string()
      .required("Type is required")
      .oneOf(
        Object.values(SubscriptionType),
        "Subscription type must be free | basic | plus or premium"
      ),
  }),
});
