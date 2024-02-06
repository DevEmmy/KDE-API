import { SubscriptionType } from "../model/subscription.interface";

export interface SubscribeDTO {
  userId: string;
  type: SubscriptionType;
}
